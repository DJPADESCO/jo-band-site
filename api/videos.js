const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const folder = 'jo-band-site-web-2026';

    const [images, videos, raw] = await Promise.all([
      cloudinary.api.resources({ resource_type: 'image', type: 'upload', prefix: folder, max_results: 100 }),
      cloudinary.api.resources({ resource_type: 'video', type: 'upload', prefix: folder, max_results: 100 }),
      cloudinary.api.resources({ resource_type: 'raw',   type: 'upload', prefix: folder, max_results: 100 })
    ]);

    const fichiers = [
      ...images.resources,
      ...videos.resources,
      ...raw.resources
    ].map(f => ({
      public_id:     f.public_id,
      secure_url:    f.secure_url,
      format:        f.format,
      resource_type: f.resource_type,
      display_name:  f.display_name || null,
      created_at:    f.created_at   || ''
    }));

    res.status(200).json({ success: true, data: fichiers });

  } catch (err) {
    console.error('Erreur:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};