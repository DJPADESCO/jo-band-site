const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // ← DEBUG : voir si les variables sont chargées
  const debug = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? '✅ OK' : '❌ MANQUANT',
    api_key:    process.env.CLOUDINARY_API_KEY    ? '✅ OK' : '❌ MANQUANT',
    api_secret: process.env.CLOUDINARY_API_SECRET ? '✅ OK' : '❌ MANQUANT',
  };

  try {
    const folder = 'jo-band-site-web-2026';
    const images = await cloudinary.api.resources({
      resource_type: 'image', type: 'upload',
      prefix: folder, max_results: 10
    });

    res.status(200).json({ success: true, debug, total: images.resources.length });

  } catch (err) {
    res.status(500).json({ success: false, debug, error: err.message });
  }
};