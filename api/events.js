const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

function getApp() {
  if (getApps().length) return getApps()[0];
  return initializeApp({
    credential: cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const db = getFirestore(getApp());

  // ── Lire les événements à venir (public) ──
  if (req.method === 'GET') {
    try {
      const today = new Date().toISOString().slice(0, 10);

      const snapshot = await db.collection('events')
        .where('date', '>=', today)
        .orderBy('date', 'asc')
        .limit(20)
        .get();

      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
      return res.status(200).json({ success: true, data: items });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // ── Ajouter un nouvel événement (protégé par mot de passe admin) ──
  if (req.method === 'POST') {
    try {
      const {
        adminPassword, title, date, time, location,
        description, price, ticketLink, imageUrl, status
      } = req.body;

      if (adminPassword !== process.env.EVENTS_ADMIN_PASSWORD) {
        return res.status(401).json({ success: false, error: 'Mot de passe incorrect.' });
      }
      if (!title || !date || !location) {
        return res.status(400).json({ success: false, error: 'Titre, date et lieu sont requis.' });
      }

      await db.collection('events').add({
        title:       String(title).slice(0, 100),
        date:        String(date),
        time:        time ? String(time).slice(0, 20) : '',
        location:    String(location).slice(0, 150),
        description: description ? String(description).slice(0, 500) : '',
        price:       price ? String(price).slice(0, 60) : 'Entrée gratuite',
        ticketLink:  ticketLink ? String(ticketLink).slice(0, 300) : '',
        imageUrl:    imageUrl ? String(imageUrl).slice(0, 300) : '',
        status:      ['confirmed', 'soldout', 'cancelled'].includes(status) ? status : 'confirmed',
        createdAt:   new Date().toISOString()
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // ── Supprimer un événement (protégé) ──
  if (req.method === 'DELETE') {
    try {
      const { adminPassword, id } = req.body;
      if (adminPassword !== process.env.EVENTS_ADMIN_PASSWORD) {
        return res.status(401).json({ success: false, error: 'Mot de passe incorrect.' });
      }
      if (!id) {
        return res.status(400).json({ success: false, error: 'ID requis.' });
      }
      await db.collection('events').doc(id).delete();
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Méthode non autorisée' });
};
