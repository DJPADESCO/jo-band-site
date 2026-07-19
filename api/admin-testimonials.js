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

module.exports = async function handler(req, res) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) {
    return res.status(401).json({ success: false, error: 'Non autorisé.' });
  }

  const db = getFirestore(getApp());

  if (req.method === 'GET') {
    try {
      const status = req.query.status === 'approved' ? true : false;

      const snapshot = await db.collection('testimonials')
        .where('approved', '==', status)
        .limit(30)
        .get();

      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json({ success: true, data: items });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { id, action } = req.body;
      if (!id || !['approve', 'delete'].includes(action)) {
        return res.status(400).json({ success: false, error: 'Paramètres invalides.' });
      }

      if (action === 'approve') {
        await db.collection('testimonials').doc(id).update({ approved: true });
      } else {
        await db.collection('testimonials').doc(id).delete();
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Méthode non autorisée' });
};
