# JO BAND — site officiel

> Partout où ça bouge, JO BAND est là.

Site et application web (PWA) du collectif artistique **JO BAND**, basé à Lomé, Togo : humour, DJ, chants, animation, événementiel et production vidéo. Les visiteurs peuvent découvrir le collectif, regarder les vidéos, voir les prochains shows, laisser un avis et réserver une prestation.

Site en ligne : https://jo-band-site.vercel.app

---

## Aperçu

| | |
|---|---|
| **Design** | Interface sombre (bleu nuit et or, aux couleurs du logo), typographies *Bricolage Grotesque* et *Manrope*, thème « or intense » activable avec le bouton palette |
| **Adaptatif** | Mobile d'abord. Sur téléphone : barre de navigation flottante en bas. Sur ordinateur (à partir de 960 px) : navigation en haut, accueil en deux colonnes, formulaire de contact à côté des numéros WhatsApp |
| **Animations** | Titre animé lettre par lettre, indicateur de navigation qui glisse, bandeau des prestations, apparition au défilement, photos qui se dévoilent. Elles démarrent à la fin de l'écran de chargement |
| **Langues** | Français et anglais (bouton FR / EN) |
| **PWA** | Installable sur l'écran d'accueil, service worker avec cache versionné |
| **SEO** | Données structurées JSON-LD, Open Graph, Twitter Card, sitemap, robots.txt |
| **Réseaux sociaux** | Bandeau d'aide pour ouvrir le site dans le navigateur quand il est lancé depuis TikTok, Facebook, Instagram, Snapchat, etc. |

## Pages et sections

Le site tient sur une seule page (`index.html`) avec des onglets :

- **Accueil** : présentation, compte à rebours du prochain show, avis clients, calendrier des événements, punchline du jour, réservation WhatsApp, pourquoi nous choisir, réseaux sociaux
- **Collectif** : fiches des membres (fenêtre de détail au clic) et coulisses
- **Vidéos** : lecteur YouTube, dernières vidéos YouTube et TikTok, formules de prestations
- **Galerie** : photos, vidéos, affiches et documents, avec filtres et agrandissement des photos
- **Contact** : formulaire de réservation, lignes WhatsApp directes, réseaux
- **Sponsors & partenaires** : accessible depuis le menu

Pages annexes : `alice.html` (ALICE en plein écran), `privacy_policy.html` et `terms_of_use.html` (pages légales), ainsi que `privacy.html` et `terms.html`.

## Fonctionnalités dynamiques

- **ALICE, l'assistante virtuelle** : réponses instantanées depuis une FAQ locale (`alice-data.json`), puis relais vers des IA de secours (Groq, Gemini, Mistral). Synthèse vocale (Edge TTS) et reconnaissance vocale. Les questions sans réponse locale sont enregistrées pour enrichir la FAQ.
- **Témoignages** : dépôt public, modération manuelle, carrousel automatique.
- **Événements** : gérés depuis la console Firebase, les événements passés disparaissent seuls. Un compte à rebours s'affiche pour le prochain show.
- **Newsletter** : abonnement avec solutions de secours (Formspree, Web3Forms, WhatsApp) et synchronisation Brevo.
- **Vidéos** : flux YouTube et TikTok lus par RSS, détection automatique des Shorts.
- **Galerie** : médias hébergés sur Cloudinary.
- **Notifications push** (Firebase Cloud Messaging) et annonces en bannière.
- **Soutien** : bouton « Soutenir JO BAND » (paiement FedaPay).

## Structure du projet

```
.
├── index.html            Page principale (structure et contenu)
├── style.css             Tout le design : variables de couleur, mise en page, animations
├── ui-effects.js         Effets d'interface (animations du titre, navigation, galerie en grand)
├── script.js             Logique du site : onglets, langues, formulaires, appels à l'API
├── alice.html / .css / .js   Assistante ALICE (bouton flottant et page dédiée)
├── alice-data.json       FAQ locale d'ALICE
├── youtube-gallery.js    Galerie YouTube
├── tiktok-gallery.js     Galerie TikTok
├── sw.js                 Service worker (cache hors ligne)
├── firebase-messaging-sw.js   Notifications push
├── manifest.json         Configuration PWA
├── config-system-v5.*    Panneau d'administration (accès protégé)
├── api/                  Fonctions serverless (Vercel)
├── images/               Logo, photos des membres, image de partage
└── .github/workflows/    Mise à jour automatique de l'annonce à partir des « issues » GitHub
```

### Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Les couleurs, les polices, les espacements | `style.css` (variables au début du fichier, section 1) |
| Les animations | `style.css` (sections 14 et 16) et `ui-effects.js` |
| Les textes de l'accueil et les numéros WhatsApp | `index.html` |
| Les traductions FR / EN | `script.js` (dictionnaire `translations`) |
| Les réponses d'ALICE | `alice-data.json` |
| Les membres, sponsors, formules, avis, vidéos, contacts | Panneau d'administration (pas de code) |
| Les événements | Console Firebase (collection des événements) |

> **Important :** quand tu modifies un fichier mis en cache (`style.css`, `script.js`, `index.html`…), change aussi `APP_VERSION` en haut de `sw.js`. Sinon, les visiteurs qui ont déjà installé le site gardent l'ancienne version.

## API (dossier `api/`)

| Fichier | Rôle |
|---|---|
| `alice.js`, `tts.py` | Assistante ALICE et synthèse vocale |
| `testimonials.js`, `admin-testimonials.js` | Avis clients et modération |
| `events.js` | Calendrier des événements |
| `admin-members.js` | Membres, sponsors, formules et contenu général |
| `videos.js`, `upload-signature.js` | Galerie et envoi de médias (Cloudinary) |
| `subscribe.js`, `brevo-subscribe.js` | Newsletter |
| `notify.js` | Notifications push |
| `verify-totp-v2.js` | Connexion administrateur avec code à usage unique |

## Technologies

- HTML5, CSS3, JavaScript sans framework
- Firebase / Firestore et Firebase Cloud Messaging
- Cloudinary (médias)
- Vercel (hébergement et fonctions serverless)
- Font Awesome, Google Fonts (Bricolage Grotesque, Manrope)
- Node.js (`firebase-admin`, `cloudinary`, `msedge-tts`) et Python (`edge-tts`)

## Installation et déploiement

```bash
npm install          # dépendances des fonctions serverless
```

Le site est déployé sur **Vercel** : chaque envoi (`git push`) sur la branche principale lance une nouvelle version automatiquement.

### Variables d'environnement (Vercel)

À renseigner dans les réglages du projet Vercel. Ne jamais les écrire dans le code ni les envoyer sur GitHub.

| Variable | Utilisation |
|---|---|
| `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Accès à Firebase / Firestore |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Médias de la galerie |
| `GROQ_KEY`, `GEMINI_KEY`, `MISTRAL_KEY` | IA d'ALICE |
| `BREVO_API_KEY` | Synchronisation de la newsletter |
| `ADMIN_TOTP_SECRET`, `EVENTS_ADMIN_PASSWORD` | Accès administrateur |
| `NOTIFY_SECRET` | Protection de l'envoi des notifications |

## Historique des versions

- **Refonte visuelle (octobre 2026)** : nouveau design adaptatif mobile et ordinateur, animations modernes, nouveau fichier `ui-effects.js`, corrections de bugs d'affichage. Le back-end (`api/`) et la logique de `script.js` sont inchangés.
- **Version 1** : première version du site, interface bleu marine et or, onglets mobiles, ALICE, avis, événements, newsletter.

## Développeur

Projet conçu et développé par **DJ PADESCO**, expert en solutions digitales et entertainment.

Fait avec ❤️ pour la culture togolaise.
