import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  try {
    const folder = 'jo-band-site-web-2026';

    const [images, videos, raw] = await Promise.all([
      cloudinary.api.resources({ resource_type: 'image',  type: 'upload', prefix: folder, max_results: 100 }),
      cloudinary.api.resources({ resource_type: 'video',  type: 'upload', prefix: folder, max_results: 100 }),
      cloudinary.api.resources({ resource_type: 'raw',    type: 'upload', prefix: folder, max_results: 100 })
    ]);

    const fichiers = [
      ...images.resources,
      ...videos.resources,
      ...raw.resources
    ].map(fichier => ({
      public_id:     fichier.public_id,
      secure_url:    fichier.secure_url,   // ✅ nom attendu par script.js
      format:        fichier.format,
      resource_type: fichier.resource_type,
      display_name:  fichier.display_name || null,
      created_at:    fichier.created_at   || ''
    }));

    res.status(200).json({ success: true, data: fichiers });

  } catch (erreur) {
    console.error('Erreur Cloudinary:', erreur);
    res.status(500).json({ success: false, error: erreur.message });
  }
}