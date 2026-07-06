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

  // ── Lire les témoignages déjà validés (public) ──
  if (req.method === 'GET') {
    try {
      const snapshot = await db.collection('testimonials')
        .where('approved', '==', true)
        .orderBy('createdAt', 'desc')
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

  // ── Soumettre un nouveau témoignage (en attente de validation) ──
  if (req.method === 'POST') {
    try {
      const { name, message, rating } = req.body;

      if (!name || !message) {
        return res.status(400).json({ success: false, error: 'Nom et message requis.' });
      }

      const cleanName    = String(name).slice(0, 60);
      const cleanMessage = String(message).slice(0, 500);
      const cleanRating  = Math.min(5, Math.max(1, parseInt(rating, 10) || 5));

      await db.collection('testimonials').add({
        name: cleanName,
        message: cleanMessage,
        rating: cleanRating,
        approved: false,
        createdAt: new Date().toISOString()
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Méthode non autorisée' });
};
