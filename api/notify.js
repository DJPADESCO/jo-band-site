const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');
const { getFirestore } = require('firebase-admin/firestore');

let app;
function getApp() {
  if (getApps().length) return getApps()[0];
  return initializeApp({
    credential: cert({
  projectId: process.env.FIREBASE_PROJECT_ID_ONE || process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL_ONE || process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: (process.env.FIREBASE_PRIVATE_KEY_ONE || process.env.FIREBASE_PRIVATE_KEY)?.replace(/\\n/g, '\n')
})
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const secret = req.headers['x-notify-secret'];
  if (secret !== process.env.NOTIFY_SECRET) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  const { titre, corps, url } = req.body;

  try {
    const db = getFirestore(getApp());
    const snapshot = await db.collection('subscribers').get();
    const tokens = snapshot.docs.map(d => d.id).filter(Boolean);

    if (!tokens.length) {
      return res.status(200).json({ success: true, envoye: 0 });
    }

    const message = {
      notification: { title: titre || 'JO BAND', body: corps || '' },
      webpush: {
        notification: { icon: 'https://jo-band-site.vercel.app/images/logo.jpg' },
        fcmOptions: { link: url || 'https://jo-band-site.vercel.app' }
      },
      tokens
    };

    const result = await getMessaging(getApp()).sendEachForMulticast(message);
    res.status(200).json({ success: true, envoye: result.successCount });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};