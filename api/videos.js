const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const images = await cloudinary.api.resources({
      resource_type: 'image',
      type: 'upload',
      max_results: 10
    });

    res.status(200).json({
      success: true,
      total: images.resources.length,
      fichiers: images.resources.map(f => f.public_id)
    });

  } catch (err) {
    // Sérialise TOUT l'objet erreur
    res.status(500).json({
      success: false,
      error_complet: JSON.parse(JSON.stringify(err)),
      error_keys: Object.keys(err),
      http_code: err.http_code,
      error_string: err.error ? JSON.stringify(err.error) : 'rien'
    });
  }
};
