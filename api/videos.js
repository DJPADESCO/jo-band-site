const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cache en mémoire - évite de rappeler Cloudinary à chaque visite
let cache = null;
let cacheTime = 0;
const CACHE_DUREE = 5 * 60 * 1000; // 5 minutes

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Cache navigateur 5 minutes
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

  try {
    const maintenant = Date.now();

    // Retourne le cache si encore valide
    if (cache && (maintenant - cacheTime) < CACHE_DUREE) {
      return res.status(200).json({ success: true, data: cache, cached: true });
    }

    // 1 seul appel au lieu de 3
    const [images, videos, raw] = await Promise.all([
      cloudinary.api.resources({ resource_type: 'image', type: 'upload', max_results: 100 }),
      cloudinary.api.resources({ resource_type: 'video', type: 'upload', max_results: 100 }),
      cloudinary.api.resources({ resource_type: 'raw',   type: 'upload', max_results: 100 })
    ]);

    const fichiers = [
      ...images.resources,
      ...videos.resources,
      ...raw.resources
    ]
    // Exclut les fichiers exemples de Cloudinary
    .filter(f => !f.public_id.startsWith('cld-') && !f.public_id.startsWith('samples/'))
    .map(f => ({
      public_id:     f.public_id,
      secure_url:    f.secure_url,
      format:        f.format,
      resource_type: f.resource_type,
      display_name:  f.display_name || null,
      created_at:    f.created_at   || ''
    }));

    // Sauvegarde en cache
    cache = fichiers;
    cacheTime = maintenant;

    res.status(200).json({ success: true, data: fichiers });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};