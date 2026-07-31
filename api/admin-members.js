const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

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

async function verifyAdmin(req) {
  const authHeader = req.headers.authorization || '';
  const idToken = authHeader.replace('Bearer ', '');
  if (!idToken) return false;
  try {
    await getAuth(getApp()).verifyIdToken(idToken);
    return true;
  } catch (e) {
    return false;
  }
}

const ALLOWED_SECTIONS = ['contact', 'formules', 'general'];

async function handleSiteContent(req, res, db) {
  const section = req.query.section;

  if (!ALLOWED_SECTIONS.includes(section)) {
    return res.status(400).json({ success: false, error: 'Section invalide.' });
  }

  if (req.method === 'GET') {
    try {
      const doc = await db.collection('site_content').doc(section).get();
      res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
      return res.status(200).json({ success: true, data: doc.exists ? doc.data() : {} });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) {
    return res.status(401).json({ success: false, error: 'Non autorisé.' });
  }

  if (req.method === 'POST') {
    try {
      const data = req.body && typeof req.body === 'object' ? req.body : {};
      await db.collection('site_content').doc(section).set(data, { merge: true });
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Méthode non autorisée' });
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const db = getFirestore(getApp());

  if (req.query.resource === 'content') {
    return handleSiteContent(req, res, db);
  }

  if (req.method === 'GET') {
    const isAdmin = await verifyAdmin(req);
    try {
      let snapshot;
      if (isAdmin) {
        snapshot = await db.collection('members').get();
      } else {
        snapshot = await db.collection('members').where('active', '==', true).get();
      }
      const items = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      if (!isAdmin) {
        res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
      }
      return res.status(200).json({ success: true, data: items });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) {
    return res.status(401).json({ success: false, error: 'Non autorisé.' });
  }

  if (req.method === 'POST') {
    try {
      const { id, name, role, description, imageUrl, order, active } = req.body;

      if (!name || !role) {
        return res.status(400).json({ success: false, error: 'Nom et rôle sont requis.' });
      }

      const memberData = {
        name:        String(name).slice(0, 80),
        role:        String(role).slice(0, 80),
        description: description ? String(description).slice(0, 400) : '',
        imageUrl:    imageUrl ? String(imageUrl).slice(0, 400) : '',
        order:       Number.isFinite(Number(order)) ? Number(order) : 0,
        active:      active !== false
      };

      if (id) {
        await db.collection('members').doc(id).update(memberData);
      } else {
        await db.collection('members').add(memberData);
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ success: false, error: 'ID requis.' });
      }
      await db.collection('members').doc(id).delete();
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Méthode non autorisée' });
};
