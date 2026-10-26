const cloudinary = require('cloudinary').v2;
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

function sanitizeId(publicId) {
  return publicId.replace(/\//g, '__');
}

// Cache en mémoire - évite de rappeler Cloudinary à chaque visite publique
let cache = null;
let cacheTime = 0;
const CACHE_DUREE = 5 * 60 * 1000; // 5 minutes

// Le compte Cloudinary est partagé entre plusieurs projets :
// seul le dossier de la galerie JO BAND est lu et modifiable ici.
const GALLERY_FOLDER = 'jo-band-gallery/';

// Récupère toutes les pages d'un type de ressource (100 par page, 5 pages max)
async function fetchAllPages(resourceType) {
  let all = [];
  let cursor;
  for (let page = 0; page < 5; page++) {
    const r = await cloudinary.api.resources({
      resource_type: resourceType,
      type: 'upload',
      prefix: GALLERY_FOLDER,
      max_results: 100,
      ...(cursor ? { next_cursor: cursor } : {})
    });
    all = all.concat(r.resources);
    cursor = r.next_cursor;
    if (!cursor) break;
  }
  return all;
}

async function fetchCloudinaryFiles() {
  const [images, videos, raw] = await Promise.all([
    fetchAllPages('image'),
    fetchAllPages('video'),
    fetchAllPages('raw')
  ]);

  return [
    ...images,
    ...videos,
    ...raw
  ]
  // Sécurité : on ne garde que le dossier de la galerie
  .filter(f => f.public_id.startsWith(GALLERY_FOLDER))
  .map(f => ({
    public_id:     f.public_id,
    secure_url:    f.secure_url,
    format:        f.format,
    resource_type: f.resource_type,
    display_name:  f.display_name || null,
    created_at:    f.created_at   || ''
  }));
}

function detectDefaultCategory(f) {
  if (f.resource_type === 'video' || f.format === 'mp4') return 'video';
  if (f.format === 'pdf' || f.resource_type === 'raw') return 'document';
  return 'photo';
}

async function mergeWithMeta(fichiers, db) {
  const metaSnap = await db.collection('gallery_meta').get();
  const metaMap = {};
  metaSnap.forEach(doc => { metaMap[doc.id] = doc.data(); });

  return fichiers.map(f => {
    const meta = metaMap[sanitizeId(f.public_id)] || {};
    return {
      ...f,
      title:    typeof meta.title === 'string' ? meta.title : '',
      order:    Number.isFinite(meta.order) ? meta.order : 0,
      featured: meta.featured === true,
      hidden:   meta.hidden === true,
      category: meta.category || detectDefaultCategory(f)
    };
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const db = getFirestore(getApp());
  const isAdmin = await verifyAdmin(req);

  if (req.method === 'GET') {
    try {
      if (!isAdmin) {
        const maintenant = Date.now();
        if (cache && (maintenant - cacheTime) < CACHE_DUREE) {
          res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
          return res.status(200).json({ success: true, data: cache, cached: true });
        }
      }

      const fichiers = await fetchCloudinaryFiles();
      const merged = await mergeWithMeta(fichiers, db);

      merged.sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        return new Date(b.created_at) - new Date(a.created_at);
      });

      // Le public ne voit jamais les médias masqués ; l'admin voit tout
      const visibles = isAdmin ? merged : merged.filter(f => !f.hidden);

      if (!isAdmin) {
        cache = visibles;
        cacheTime = Date.now();
        res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
      }

      return res.status(200).json({ success: true, data: visibles });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // Tout ce qui suit (modification/suppression) exige une authentification admin
  if (!isAdmin) {
    return res.status(401).json({ success: false, error: 'Non autorisé.' });
  }

  if (req.method === 'POST') {
    try {
      const items = Array.isArray(req.body && req.body.items) ? req.body.items : [];
      const batch = db.batch();

      items.forEach(item => {
        if (!item.publicId || String(item.publicId).indexOf(GALLERY_FOLDER) !== 0) return;
        const ref = db.collection('gallery_meta').doc(sanitizeId(item.publicId));
        const data = {
          order:    Number.isFinite(Number(item.order)) ? Number(item.order) : 0,
          featured: item.featured === true,
          hidden:   item.hidden === true,
          category: ['photo', 'video', 'document', 'affiche'].includes(item.category) ? item.category : 'photo'
        };
        // Le titre n'est modifié que s'il est envoyé (sinon l'existant est conservé)
        if (typeof item.title === 'string') data.title = item.title.trim().slice(0, 120);
        batch.set(ref, data, { merge: true });
      });

      await batch.commit();
      cache = null; // force le rafraîchissement du cache public

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { publicId, resourceType } = req.body || {};
      if (!publicId) {
        return res.status(400).json({ success: false, error: 'publicId requis.' });
      }

      // Sécurité : jamais de suppression hors du dossier de la galerie
      if (typeof publicId !== 'string' || !publicId.startsWith(GALLERY_FOLDER)) {
        return res.status(403).json({ success: false, error: 'Suppression refusée : média hors galerie JO BAND.' });
      }

      await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType || 'image'
      });
      await db.collection('gallery_meta').doc(sanitizeId(publicId)).delete().catch(() => {});
      cache = null;

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Méthode non autorisée' });
};
