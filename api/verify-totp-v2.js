const crypto = require('crypto');
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

function base32Decode(base32) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = '';
    for (const char of base32.toUpperCase().replace(/=+$/, '')) {
        const val = alphabet.indexOf(char);
        if (val === -1) continue;
        bits += val.toString(2).padStart(5, '0');
    }
    const bytes = [];
    for (let i = 0; i + 8 <= bits.length; i += 8) {
        bytes.push(parseInt(bits.substring(i, i + 8), 2));
    }
    return Buffer.from(bytes);
}

function generateTOTP(secret, counter) {
    const key = base32Decode(secret);
    const counterBuffer = Buffer.alloc(8);
    counterBuffer.writeBigUInt64BE(BigInt(counter));

    const hmac = crypto.createHmac('sha1', key).update(counterBuffer).digest();
    const offset = hmac[hmac.length - 1] & 0xf;
    const binary =
        ((hmac[offset] & 0x7f) << 24) |
        ((hmac[offset + 1] & 0xff) << 16) |
        ((hmac[offset + 2] & 0xff) << 8) |
        (hmac[offset + 3] & 0xff);

    return String(binary % 1000000).padStart(6, '0');
}

function sendLoginAlert() {
    try {
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                access_key: '997522c2-87a5-46d9-86d2-7234af185212',
                subject: 'Connexion réussie - Panneau Admin JO BAND',
                message: 'Une connexion admin a été validée le ' + new Date().toISOString()
            })
        }).catch(function () {});
    } catch (e) {}
}

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Méthode non autorisée' });
    }

    try {
        const { token } = req.body;
        const secret = process.env.ADMIN_TOTP_SECRET;

        if (!token || !secret) {
            return res.status(400).json({ success: false, error: 'Code manquant.' });
        }

        const db = getFirestore(getApp());
        const lockRef = db.collection('security').doc('totp_attempts');
        const lockDoc = await lockRef.get();
        const now = Date.now();
        const data = lockDoc.exists ? lockDoc.data() : { count: 0, firstAttempt: now };

        const windowMs = 15 * 60 * 1000;
        if (now - data.firstAttempt > windowMs) {
            data.count = 0;
            data.firstAttempt = now;
        }

        if (data.count >= 5) {
            const remainingMin = Math.ceil((windowMs - (now - data.firstAttempt)) / 60000);
            return res.status(429).json({
                success: false,
                error: 'Trop de tentatives. Réessayez dans ' + remainingMin + ' minute(s).'
            });
        }

        const cleanToken = String(token).replace(/\s/g, '');
        const currentCounter = Math.floor(Date.now() / 1000 / 30);

        let isValid = false;
        for (let i = -1; i <= 1; i++) {
            const expected = generateTOTP(secret, currentCounter + i);
            if (expected === cleanToken) {
                isValid = true;
                break;
            }
        }

        if (isValid) {
            await lockRef.set({ count: 0, firstAttempt: now });
            sendLoginAlert();
            return res.status(200).json({ success: true });
        }

        await lockRef.set({ count: data.count + 1, firstAttempt: data.firstAttempt });
        return res.status(401).json({ success: false, error: 'Code incorrect ou expiré.' });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};
