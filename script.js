'use strict';

// Liste officielle des 13 membres du collectif JO BAND
const members = [
    { name: "DJ PADESCO",   id: "padesco",   role: "DJ / Humoriste" },
    { name: "JOEL",         id: "joel",      role: "Management" },
    { name: "LE FONDATEUR", id: "fondateur", role: "Fondateur" },
    { name: "NANA SIKA",    id: "nanasika",  role: "Comedien & Videaste" },
    { name: "GEDEON",       id: "gedeon",    role: "Humoriste" },
    { name: "JEAN",         id: "jean",      role: "Artiste Chanteur" },
    { name: "THE GACHA",    id: "gacha",     role: "Artiste Chanteur" },
    { name: "AROLE",        id: "arole",     role: "Cameraman" },
    { name: "L&H",          id: "lh",        role: "Cameraman" },
    { name: "DK POPI",      id: "dkpopi",    role: "Humoriste" },
    { name: "ESTHER",       id: "esther",    role: "Humoriste" },
    { name: "PRISCA",       id: "prisca",    role: "Humoriste" },
    { name: "MAKAFUI",      id: "makafui",   role: "Humoriste" }
];

// Dictionnaire complet des traductions (Français / Anglais)
const translations = {
    fr: {
        "live-text":           "EN LIVE",
        "slogan":              "Partout où ça bouge, Jo Band est là.",
        "nav-home":            "Accueil",
        "nav-team":            "Collectif",
        "nav-videos":          "Vidéos",
        "nav-contact":         "Contact",
        "quote-title":         "La punchline du jour",
        "wa-booking-title":    "Réservation Instantanée",
        "wa-booking-desc":     "Discutez directement avec notre management sur WhatsApp pour bloquer votre date rapidement.",
        "why-us-title":        "Pourquoi nous choisir ?",
        "team-title":          "Le Collectif",
        "videos-title":        "Nos Vidéos",
        "contact-title":       "Contact & Réservation",
        "form-name":           "Votre Nom complet / Entreprise *",
        "form-phone":          "Numéro de téléphone (WhatsApp de préférence) *",
        "form-message":        "Précisions sur votre projet (Attentes particulières, durée...) *",
        "form-submit":         "Envoyer la demande",
        "follow-us":           "Suivez-nous",
        "share-text":          "Partager l'application"
    },
    en: {
        "live-text":           "LIVE NOW",
        "slogan":              "Everywhere it moves, Jo Band is there.",
        "nav-home":            "Home",
        "nav-team":            "Collective",
        "nav-videos":          "Videos",
        "nav-contact":         "Contact",
        "quote-title":         "Punchline of the day",
        "wa-booking-title":    "Instant Booking",
        "wa-booking-desc":     "Chat directly with our management on WhatsApp to lock in your date quickly.",
        "why-us-title":        "Why Choose Us?",
        "team-title":          "The Collective",
        "videos-title":        "Our Videos",
        "contact-title":       "Contact & Booking",
        "form-name":           "Your Full Name / Company *",
        "form-phone":          "Phone Number (WhatsApp preferred) *",
        "form-message":        "Project Details (Special requests, duration...) *",
        "form-submit":         "Submit Request",
        "follow-us":           "Follow Us",
        "share-text":          "Share the app"
    }
};

// Tableau des 7 expressions/citations du jour (une par jour de la semaine)
const dailyQuotes = [
    "Finissez la semaine en beauté et faites le plein d'énergie avec nos meilleures vidéos.", // Dimanche (index 0)
    "Partout où ça bouge, JO BAND est là. Préparez-vous à vivre un événement inoubliable.",    // Lundi (index 1)
    "L'humour et la musique réunis dans un seul collectif pour sublimer vos plus grands moments.", // Mardi (index 2)
    "Quand DJ PADESCO est sur scène et DJ ZÉKA aux platines, l'ambiance n'a plus de limites.", // Mercredi (index 3)
    "Une équipe de 13 professionnels de l'art et de l'image à votre service.",                // Jeudi (index 4)
    "Donnez de la voix et du mouvement à vos projets avec le collectif JO BAND.",              // Vendredi (index 5)
    "C'est le week-end ! L'ambiance est garantie avec toute l'équipe du JO BAND sur scène."     // Samedi (index 6)
];

// Variable globale pour stocker l'événement d'installation PWA
let deferredPrompt = null;

document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Masquage du Splash Screen
    const splash = document.getElementById('splash-screen');
    if (splash) {
        setTimeout(function () {
            splash.style.opacity = '0';
            setTimeout(function () { splash.style.display = 'none'; }, 400);
        }, 1500);
    }

    // 2. Affichage automatique de la citation du jour (Sécurisé sur 7 jours)
    const quoteEl = document.getElementById('daily-quote');
    if (quoteEl) {
        const todayIndex = new Date().getDay(); // Retourne un chiffre entre 0 (dimanche) et 6 (samedi)
        quoteEl.textContent = dailyQuotes[todayIndex];
    }

    // 3. Gestion de la Navigation par Onglets mobiles (Tabs)
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.tab-content');

    navItems.forEach(function (item) {
        item.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            navItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            this.classList.add('active');
            const targetSection = document.getElementById(targetTab);
            if (targetSection) targetSection.classList.add('active');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 4. Changement dynamique de Thème de couleur
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            document.body.classList.toggle('theme-gold-intense');
        });
    }

    // 5. Gestionnaire de Traduction (FR / EN)
    const langBtns = document.querySelectorAll('.lang-btn');
    function applyTranslations(lang) {
        document.querySelectorAll('[data-i18n]').forEach(function (element) {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    }

    langBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            langBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            applyTranslations(this.getAttribute('data-lang'));
        });
    });

    // 6. Génération dynamique des cartes des Membres du Collectif
    const membersContainer = document.getElementById('container-membres');
    const modal = document.getElementById('modal-member');
    const modalClose = document.getElementById('modal-close');

    if (membersContainer && modal && modalClose) {
        members.forEach(function (m) {
            const card = document.createElement('div');
            card.className = 'member-mini-card';
            card.innerHTML = `
                <div class="avatar-frame">
                    <img src="images/${m.id}.jpg" alt="${m.name}" class="avatar-img" onerror="this.style.display='none'">
                    <i class="fa-solid fa-user" style="position:absolute; z-index:-1;"></i>
                </div>
                <h3>${m.name}</h3>
                <p>${m.role}</p>
            `;

            card.addEventListener('click', function () {
                document.getElementById('modal-name').textContent = m.name;
                document.getElementById('modal-role').textContent = m.role;
                
                const frame = modal.querySelector('.modal-image-frame');
                frame.innerHTML = `
                    <img src="images/${m.id}.jpg" alt="${m.name}" class="avatar-img" onerror="this.style.display='none'">
                    <i class="fa-solid fa-user" style="position:absolute; z-index:-1; top:35%; left:45%; font-size:2rem; color:var(--gold);"></i>
                `;
                modal.style.display = 'flex';
            });

            membersContainer.appendChild(card);
        });

        modalClose.addEventListener('click', function () { modal.style.display = 'none'; });
        modal.addEventListener('click', function (e) { if (e.target === modal) modal.style.display = 'none'; });
    }

    // 7. Intégration de la Playlist YouTube Automatique de JO BAND
    const videosContainer = document.getElementById('container-videos');
    if (videosContainer) {
        const playlistId = 'UUxj3ygXxMVzbKmq4ctSCN5Q'; // Playlist d'envoi officielle
        videosContainer.innerHTML = ''; 

        for (let i = 0; i < 4; i++) {
            const vBox = document.createElement('div');
            vBox.className = 'video-responsive-box';
            vBox.innerHTML = `
                <div class="video-ratio-container">
                    <iframe src="https://www.youtube.com/embed?listType=playlist&list=${playlistId}&index=${i}" allowfullscreen></iframe>
                </div>
                <div class="video-caption-text">Production Officielle JO BAND - Vidéo #${i+1}</div>
            `;
            videosContainer.appendChild(vBox);
        }
    }

    // 8. Gestion du Formulaire de Réservation Formspree Intelligent
    const form = document.getElementById('formspree-contact');
    const formStatus = document.getElementById('form-status-message');

    if (form && formStatus) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            formStatus.className = 'form-status-box';
            formStatus.style.display = 'none';

            const formData = new FormData(form);

            fetch('https://formspree.io/f/xbdwnyer', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(function (response) {
                if (response.ok) {
                    formStatus.className = 'form-status-box success';
                    formStatus.textContent = 'Votre demande de réservation a bien été envoyée au management !';
                    form.reset();
                } else {
                    formStatus.className = 'form-status-box error';
                    formStatus.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer ou cliquer sur le bouton WhatsApp.';
                }
            }).catch(function () {
                formStatus.className = 'form-status-box error';
                formStatus.textContent = 'Problème de connexion. Utilisez WhatsApp pour réserver directement.';
            });
        });
    }

    // 9. API de Partage Web Native (Bouton de partage)
    const shareBtn = document.getElementById('share-bottom');
    if (shareBtn) {
        shareBtn.addEventListener('click', function () {
            if (navigator.share) {
                navigator.share({
                    title: 'JO BAND Officiel',
                    text: 'Découvrez l\'application officielle du collectif JO BAND !',
                    url: window.location.href
                }).catch(function () {});
            } else {
                alert("Copiez ce lien pour partager l'application : " + window.location.href);
            }
        });
    }

    // 10. GESTION DU BOUTON D'INSTALLATION PWA POUR CHROME
    const installBanner = document.getElementById('pwa-install-banner');
    const installBtn = document.getElementById('btn-pwa-install');

    window.addEventListener('beforeinstallprompt', function (e) {
        // Empêche Chrome d'afficher sa mini-bannière par défaut
        e.preventDefault();
        // Garde l'événement de côté pour l'activer plus tard
        deferredPrompt = e;
        // Rend notre bouton doré d'installation visible sur l'onglet Accueil
        if (installBanner) {
            installBanner.style.display = 'flex';
        }
    });

    if (installBtn) {
        installBtn.addEventListener('click', function () {
            if (deferredPrompt) {
                // Déclenche l'affichage de la fenêtre d'installation Chrome
                deferredPrompt.prompt();
                // Attend la réponse de l'utilisateur (Accepté ou Refusé)
                deferredPrompt.userChoice.then(function (choiceResult) {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('L\'utilisateur a installé l\'application');
                    }
                    deferredPrompt = null;
                    if (installBanner) installBanner.style.display = 'none';
                });
            }
        });
    }

    window.addEventListener('appinstalled', function () {
        console.log('Application installée avec succès !');
        if (installBanner) installBanner.style.display = 'none';
        deferredPrompt = null;
    });

    // 11. Enregistrement initial du Service Worker (sw.js)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').catch(function (err) {
                console.log('Service Worker non enregistré : ', err);
            });
        });
    }
});
