import { v2 as cloudinary } from 'cloudinary';

cloudinary.config();

export default async function handler(req, res) {
  try {
    const folder = 'jo-band-site-web-2026';

    const [images, videos, raw] = await Promise.all([
      cloudinary.api.resources({
        resource_type: 'image',
        type: 'upload',
        prefix: folder,
        max_results: 100
      }),
      cloudinary.api.resources({
        resource_type: 'video',
        type: 'upload',
        prefix: folder,
        max_results: 100
      }),
      cloudinary.api.resources({
        resource_type: 'raw',
        type: 'upload',
        prefix: folder,
        max_results: 100
      })
    ]);

    const fichiers = [
      ...images.resources,
      ...videos.resources,
      ...raw.resources
    ].map(fichier => ({
      id: fichier.public_id,
      url: fichier.secure_url,
      format: fichier.format,
      type:
        fichier.resource_type === 'video'
          ? 'video'
          : fichier.resource_type === 'raw'
          ? 'document'
          : 'photo'
    }));

    res.status(200).json({ success: true, data: fichiers });
  } catch (erreur) {
    console.error('Erreur Cloudinary:', erreur);
    res.status(500).json({ success: false, error: 'Impossible de lire Cloudinary' });
  }
}