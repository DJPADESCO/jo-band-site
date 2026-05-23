// api/videos.js
import { v2 as cloudinary } from 'cloudinary';

// Vercel se connecte automatiquement grâce à votre CLOUDINARY_URL
cloudinary.config();

export default async function handler(req, res) {
    // Autorise votre site à lire les données sans blocage de sécurité
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    try {
        // ⚠️ REMPLACEZ PAR LE NOM EXACT DE VOTRE DOSSIER CLOUDINARY
        // Exemple : 'jo-band-site-web-2026' ou 'joband2026'
        const nomDossier = 'jo-band-site-web-2026'; 

        // On demande à Cloudinary de lister TOUS les fichiers du dossier
        const reponse = await cloudinary.api.resources({
            type: 'upload',
            prefix: nomDossier, 
            max_results: 50 // Récupère jusqu'à 50 vidéos/photos d'un coup
        });

        // On trie proprement les données pour le site web
        const fichiers = reponse.resources.map(fichier => ({
            id: fichier.public_id,
            url: fichier.secure_url,
            format: fichier.format,
            type: fichier.resource_type // Détecte si c'est 'video' ou 'image'
        }));

        // On envoie la liste complète au site
        return res.status(200).json({ success: true, data: fichiers });

    } catch (erreur) {
        console.error("Erreur Cloudinary:", erreur);
        return res.status(500).json({ success: false, error: "Impossible de lire le dossier Cloudinary" });
    }
}
