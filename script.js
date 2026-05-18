'use strict';

var SHEETS_ID  = '1qa-6kDsGtT6uCQ71bcUS9WWzkNAHEz32ReQhuje1Pis';
var SHEETS_URL = 'https://docs.google.com/spreadsheets/d/' + SHEETS_ID + '/gviz/tq?tqx=out:json&sheet=Sheet1';

var members = [
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

var quotes = {
    fr: [
        "L'humour, c'est notre langue officielle. JO BAND transforme chaque soiree en fete.",
        "On ne fait pas que du bruit, on cree des souvenirs inoubliables.",
        "Si votre soiree manque d'ambiance, c'est que JO BAND n'etait pas invite.",
        "Le rire est universel. Notre scene, elle, est pour tout le Togo.",
        "Partout ou ca bouge, JO BAND est deja la.",
        "Un collectif, une vision : rendre chaque moment de votre vie memorable.",
        "Le week-end commence quand JO BAND monte sur scene."
    ],
    en: [
        "Humor is our official language. JO BAND turns every evening into a celebration.",
        "We don't just make noise, we create unforgettable memories.",
        "If your party lacked atmosphere, JO BAND wasn't invited.",
        "Laughter is universal. Our stage is for all of Togo.",
        "Wherever it moves, JO BAND is already there.",
        "One collective, one vision: making every moment of your life memorable.",
        "The weekend starts when JO BAND takes the stage."
    ]
};

var translations = {
    fr: {
        "slogan": "Partout où ça bouge, Jo Band est là.",
        "live-text": "EN LIVE",
        "wa-channel": "Chaîne",
        "about-text": "Le collectif artistique incontournable du Togo. Humour, prestations DJ, chants vibrants et productions vidéo de haute qualité : nous transformons chaque instant en un événement mémorable.",
        "stat-views": "K Vues", "stat-artists": "Artistes", "stat-shows": "Shows",
        "pwa-title": "JO BAND sur votre écran !",
        "pwa-desc": "Installez l'application officielle sur votre téléphone pour ne rien manquer.",
        "pwa-btn": "Installer l'application",
        "quote-title": "La punchline du jour",
        "wa-booking-title": "Réservation Instantanée",
        "wa-booking-desc": "Discutez directement avec notre management sur WhatsApp pour bloquer votre date.",
        "wa-btn": "Je veux ce show pour mon événement",
        "why-us-title": "Pourquoi nous choisir ?",
        "feat1-title": "Collectif Pluridisciplinaire",
        "feat1-desc": "Humoristes, chanteurs, danseurs et techniciens de l'image unis pour une prise en charge complète.",
        "feat2-title": "Duo DJ Exceptionnel",
        "feat2-desc": "Quand DJ PADESCO assure le show humour sur scène, DJ ZÉKA prend la relève aux platines. Ambiance non-stop garantie.",
        "feat3-title": "Mobilité Totale",
        "feat3-desc": "Mariages, concerts, anniversaires et tournages : nous nous déplaçons partout où ça bouge au Togo.",
        "team-title": "Le Collectif", "team-subtitle": "Cliquez sur un profil pour en savoir plus",
        "coulisses-title": "Coulisses & Événements",
        "coulisses-subtitle": "Découvrez l'envers du décor de nos tournages et spectacles.",
        "coulisse1-title": "Session Tournage Sketch",
        "coulisse1-desc": "Dans les coulisses de notre dernière production vidéo humoristique.",
        "coulisse2-title": "Show en Direct - Lomé",
        "coulisse2-desc": "DJ PADESCO et toute l'équipe sur scène devant un public en feu.",
        "videos-title": "Nos Vidéos", "videos-subtitle": "Découvrez nos meilleurs sketchs et exclusivités",
        "video-caption": "Nouvelle vidéo publiée sur YouTube = elle apparaît ici automatiquement.",
        "tiktok-desc": "Retrouvez nos sketchs viraux directement sur notre page TikTok officielle.",
        "tiktok-btn": "Voir tous nos TikToks",
        "packages-title": "Nos Formules Prestations",
        "badge-standard": "Populaire", "pack1-title": "Formule Standard",
        "pack1-desc": "Ambiance explosive pour vos soirées, mariages et anniversaires.",
        "pack1-feat1": "Show Humour sur scène", "pack1-feat2": "Animation DJ PADESCO & DJ ZÉKA",
        "badge-vip": "Grand Standing", "pack2-title": "Formule Premium VIP",
        "pack2-desc": "Le show complet clé en main avec couverture média totale.",
        "pack2-feat1": "Show Humour complet", "pack2-feat2": "Animation DJ Premium non-stop",
        "pack2-feat3": "Captation vidéo par Arole & L&H",
        "contact-title": "Réserver le Show",
        "contact-subtitle": "Planifiez votre événement avec l'équipe du JO BAND",
        "form-name": "Votre Nom complet / Entreprise",
        "form-phone": "Numéro de téléphone (WhatsApp de préférence)",
        "form-event": "Type d'événement", "form-date": "Date prévue de l'événement",
        "form-location": "Ville / Lieu de la prestation", "form-message": "Précisions sur votre projet",
        "form-submit": "Envoyer la demande", "wa-direct-title": "Contact Rapide WhatsApp",
        "follow-us": "Suivez-nous",
        "modal-desc": "Membre incontournable du JO BAND, apportant une énergie unique à chaque événement.",
        "nav-home": "Accueil", "nav-team": "Collectif", "nav-videos": "Vidéos",
        "nav-galerie": "Galerie", "nav-contact": "Contact",
        "share-text": "Partager l'application",
        "gallery-title": "Galerie & Médias",
        "gallery-subtitle": "Photos, vidéos, affiches et documents officiels du JO BAND",
        "gallery-loading": "Chargement de la galerie...",
        "gallery-empty": "Aucun média disponible pour le moment. Ajoutez des contenus dans Google Sheets.",
        "gallery-error": "Impossible de charger la galerie. Vérifiez la connexion.",
        "filter-all": "Tout", "filter-video": "Vidéos", "filter-photo": "Photos",
        "filter-affiche": "Affiches", "filter-document": "Documents"
    },
    en: {
        "slogan": "Wherever it moves, Jo Band is there.",
        "live-text": "LIVE NOW", "wa-channel": "Channel",
        "about-text": "The unmissable artistic collective from Togo. Comedy, DJ performances, vibrant singing and high-quality video production: we turn every moment into an unforgettable event.",
        "stat-views": "K Views", "stat-artists": "Artists", "stat-shows": "Shows",
        "pwa-title": "JO BAND on your screen!",
        "pwa-desc": "Install the official app on your phone so you never miss a thing.",
        "pwa-btn": "Install the app", "quote-title": "Quote of the day",
        "wa-booking-title": "Instant Booking",
        "wa-booking-desc": "Chat directly with our management on WhatsApp to lock in your date.",
        "wa-btn": "I want this show for my event", "why-us-title": "Why choose us?",
        "feat1-title": "Multidisciplinary Collective",
        "feat1-desc": "Comedians, singers, dancers and video technicians united for full event coverage.",
        "feat2-title": "Exceptional DJ Duo",
        "feat2-desc": "When DJ PADESCO runs the comedy show on stage, DJ ZEKA takes over at the decks. Non-stop vibes guaranteed.",
        "feat3-title": "Full Mobility",
        "feat3-desc": "Weddings, concerts, birthdays and shoots: we travel wherever it moves in Togo.",
        "team-title": "The Collective", "team-subtitle": "Click on a profile to learn more",
        "coulisses-title": "Behind the Scenes & Events",
        "coulisses-subtitle": "Discover the backstage of our shoots and shows.",
        "coulisse1-title": "Sketch Filming Session",
        "coulisse1-desc": "Behind the scenes of our latest comedy video production.",
        "coulisse2-title": "Live Show - Lome",
        "coulisse2-desc": "DJ PADESCO and the full crew on stage in front of a fired-up crowd.",
        "videos-title": "Our Videos", "videos-subtitle": "Discover our best sketches and exclusives",
        "video-caption": "New video published on YouTube = it appears here automatically.",
        "tiktok-desc": "Find our viral sketches on our official TikTok page.",
        "tiktok-btn": "See all our TikToks",
        "packages-title": "Our Performance Packages",
        "badge-standard": "Popular", "pack1-title": "Standard Package",
        "pack1-desc": "Explosive atmosphere for your parties, weddings, and birthdays.",
        "pack1-feat1": "Comedy Show on stage", "pack1-feat2": "DJ Set by PADESCO & DJ ZEKA",
        "badge-vip": "Luxury Standing", "pack2-title": "Premium VIP Package",
        "pack2-desc": "The complete turnkey show with full media coverage.",
        "pack2-feat1": "Full Comedy Show", "pack2-feat2": "Premium non-stop DJ Set",
        "pack2-feat3": "Video coverage by Arole & L&H",
        "contact-title": "Book the Show",
        "contact-subtitle": "Plan your event with the JO BAND team",
        "form-name": "Your full name / Company",
        "form-phone": "Phone number (WhatsApp preferred)",
        "form-event": "Type of event", "form-date": "Planned event date",
        "form-location": "City / Venue", "form-message": "Details about your project",
        "form-submit": "Send request", "wa-direct-title": "Quick WhatsApp Contact",
        "follow-us": "Follow us",
        "modal-desc": "An essential member of JO BAND, bringing unique energy to every event.",
        "nav-home": "Home", "nav-team": "Collective", "nav-videos": "Videos",
        "nav-galerie": "Gallery", "nav-contact": "Contact",
        "share-text": "Share the app",
        "gallery-title": "Gallery & Media",
        "gallery-subtitle": "Official photos, videos, posters and documents from JO BAND",
        "gallery-loading": "Loading gallery...",
        "gallery-empty": "No media available yet. Add content in Google Sheets.",
        "gallery-error": "Unable to load gallery. Check connection.",
        "filter-all": "All", "filter-video": "Videos", "filter-photo": "Photos",
        "filter-affiche": "Posters", "filter-document": "Documents"
    }
};

var deferredInstallPrompt = null;
var currentLang = 'fr';
var allMediaItems = [];
var galleryLoaded = false;

function hideSplash() {
    /* fonction désactivée */
}
        

function startCounters() {
    document.querySelectorAll('.stat-number').forEach(function (counter) {
        var target = parseInt(counter.getAttribute('data-target'), 10);
        var step = Math.ceil(target / 50);
        var current = 0;
        function tick() {
            current += step;
            if (current < target) { counter.textContent = current; setTimeout(tick, 25); }
            else { counter.textContent = target + '+'; }
        }
        tick();
    });
}

function setDailyQuote(lang) {
    var el = document.getElementById('daily-quote');
    if (!el) return;
    var list = quotes[lang] || quotes.fr;
    el.textContent = list[new Date().getDay()];
}

function applyLanguage(lang) {
    currentLang = lang;
    var dict = translations[lang];
    if (!dict) return;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (!dict[key]) return;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = dict[key];
        } else {
            el.textContent = dict[key];
        }
    });
    setDailyQuote(lang);
}

function convertDriveLink(url) {
    if (!url) return '';

    var match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);

    /* ... reste du code inchangé ... */

    if (match) {
        return 'https://drive.google.com/uc?export=download&id=' + match[1];
    }

    function convertDriveLink(url) {
    if (!url) return '';
    var match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
        return 'https://drive.google.com/uc?export=download&id=' + match[1];
    }
    return url;
}


function loadMediaFromSheets() {
    if (galleryLoaded) return;
    var container = document.getElementById('galerie-container');
    if (container) {
        container.innerHTML = '<div class="g-loader"></div>';
    }

    fetch(SHEETS_URL)
        .then(function (res) { return res.text(); })
        .then(function (text) {
            var raw = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
            var json = JSON.parse(raw);
            var rows = json.table.rows;
            
            allMediaItems = rows.map(function (r) {
                if (!r.c || r.c.length < 3) return null;
                return {
                    type:  r.c[0] ? String(r.c[0].v).trim().toLowerCase() : 'photo',
                    titre: r.c[1] ? String(r.c[1].v).trim() : '',
                    lien:  r.c[2] ? String(r.c[2].v).trim() : ''
                };
            }).filter(Boolean);

            galleryLoaded = true;
            renderGallery('all');
        })
        .catch(function () {
            galleryLoaded = true;
            renderGallery('all');
        });
}

, 1500);
}

                container.innerHTML = '<p class="gallery-msg error">' + translations[currentLang]['gallery-error'] + '</p>';
            }
        function hideSplash() {
    /* fonction désactivée */
}

function renderGallery(filter) {
    var container = document.getElementById('galerie-container');
    var dict = translations[currentLang];
    if (!container) return;
    
    var items = filter === 'all' ? 
        allMediaItems : 
        allMediaItems.filter(function (i) { return i.type === filter; });
        
    if (items.length === 0) {
        container.innerHTML = '<p class="gallery-msg">' + dict['gallery-empty'] + '</p>';
        return;
    }
    
    container.innerHTML = items.map(function (item) {
        var badge = '<span class="media-badge badge-' + item.type + '">' + item.type + '</span>';
        var title = '<p class="media-title">' + (item.titre || 'JO BAND') + '</p>';
        
        if (item.type === 'video') {
            return '<div class="media-card">' +
                '<div class="media-ratio">' +
                '<video src="' + convertDriveLink(item.lien) + '" controls playsinline preload="metadata"></video>' +
                '</div>' +
                '<div class="media-info">' + badge + title + '</div>' +
                '</div>';
        }
        if (item.type === 'photo' || item.type === 'affiche') {
            return '<div class="media-card">' +
                '<div class="media-ratio"><img src="' + convertDriveLink(item.lien) + '" alt="' + (item.titre || 'JO BAND') + '" loading="lazy"></div>' +
                '<div class="media-info">' + badge + title + '</div>' +
                '</div>';
        }
        if (item.type === 'document') {
            return '<div class="media-card document-card">' +
                '<a href="' + item.lien + '" target="_blank" class="doc-link">' +
                '<i class="fa-solid fa-file-pdf"></i>' + title + 
                '<span>Ouvrir</span></a></div>';
        }
        return '';
    }).join('');
}


function initGalleryFilters() {
    document.querySelectorAll('.gallery-filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.gallery-filter-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            renderGallery(btn.getAttribute('data-filter'));
        });
    });
}

function buildMembersGrid() {
    var grid = document.getElementById('container-membres');
    if (!grid) return;
    grid.innerHTML = members.map(function (m) {
        return '<div class="member-card" data-id="' + m.id + '" data-name="' + m.name + '" data-role="' + m.role + '">' +
            '<img src="images/' + m.id + '.jpg" alt="' + m.name + '" class="member-img" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">' +
            '<div class="member-fallback-bg" style="display:none;"><i class="fa-solid fa-user"></i></div>' +
            '<h3>' + m.name + '</h3><p>' + m.role + '</p></div>';
    }).join('');
    grid.addEventListener('click', function (e) {
        var card = e.target.closest('.member-card');
        if (!card) return;
        openModal(card.dataset.id, card.dataset.name, card.dataset.role);
    });
}

function openModal(id, name, role) {
    var modal = document.getElementById('modal-member');
    var img = document.getElementById('modal-img');
    var fallback = document.getElementById('modal-fallback');
    if (!modal) return;
    img.src = 'images/' + id + '.jpg';
    img.alt = name;
    img.style.display = 'block';
    fallback.style.display = 'none';
    document.getElementById('modal-name').textContent = name;
    document.getElementById('modal-role').textContent = role;
    modal.style.display = 'flex';
}

function closeModal() {
    var modal = document.getElementById('modal-member');
    if (modal) modal.style.display = 'none';
}

function initContactForm() {
    var form = document.getElementById('formspree-contact');
    var status = document.getElementById('form-status-message');
    if (!form || !status) return;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        status.className = 'form-status-box';
        status.textContent = 'Envoi en cours...';
        status.style.display = 'block';
        fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
            .then(function (res) {
                if (res.ok) {
                    status.className = 'form-status-box success';
                    status.textContent = 'Demande envoyée ! L\'équipe vous contactera très vite.';
                    form.reset();
                } else {
                    status.className = 'form-status-box error';
                    status.textContent = 'Erreur. Veuillez utiliser WhatsApp.';
                }
            }).catch(function () {
                status.className = 'form-status-box error';
                status.textContent = 'Problème de connexion. Utilisez WhatsApp.';
            });
    });
}

function initShare() {
    document.querySelectorAll('.share-action-trigger').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (navigator.share) {
                navigator.share({ title: 'JO BAND Officiel', text: 'Découvrez le collectif JO BAND !', url: window.location.href }).catch(function () {});
            } else {
                alert('Copiez le lien de votre navigateur pour partager !');
            }
        });
    });
}

function initTTS() {
    var synth = window.speechSynthesis;
    var aboutEl = document.getElementById('about-text');
    var btnPlay = document.getElementById('btn-play');
    var btnPause = document.getElementById('btn-pause');
    var btnStop = document.getElementById('btn-stop');
    if (!aboutEl || !btnPlay) return;
    btnPlay.addEventListener('click', function () {
        synth.cancel();
        var msg = new SpeechSynthesisUtterance(aboutEl.textContent);
        msg.lang = (currentLang === 'en') ? 'en-US' : 'fr-FR';
        synth.speak(msg);
    });
    btnPause.addEventListener('click', function () { synth.pause(); });
    btnStop.addEventListener('click', function () { synth.cancel(); });
}

function initPWA() {
    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        deferredInstallPrompt = e;
        var banner = document.getElementById('pwa-install-banner');
        if (banner) banner.style.display = 'flex';
    });
    var installBtn = document.getElementById('btn-pwa-install');
    if (installBtn) {
        installBtn.addEventListener('click', function () {
            if (!deferredInstallPrompt) return;
            deferredInstallPrompt.prompt();
            deferredInstallPrompt.userChoice.then(function () {
                deferredInstallPrompt = null;
                var banner = document.getElementById('pwa-install-banner');
                if (banner) banner.style.display = 'none';
            });
        });
    }
    if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {

        navigator.serviceWorker.getRegistrations()
            .then(function (registrations) {
                registrations.forEach(function (registration) {
                    registration.update();
                });
            });

        navigator.serviceWorker.register('/sw.js?v=' + Date.now())
            .catch(function () {});
    });
}

document.addEventListener('DOMContentLoaded', function () {
    hideSplash();

    var navItems = document.querySelectorAll('.nav-item');
    var tabs = document.querySelectorAll('.tab-content');

    navItems.forEach(function (item) {
        item.addEventListener('click', function () {
            navItems.forEach(function (n) { n.classList.remove('active'); });
            tabs.forEach(function (t) { t.classList.remove('active'); });
            item.classList.add('active');
            var targetId = item.getAttribute('data-tab');
            var target = document.getElementById(targetId);
            if (target) target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (targetId === 'tab-galerie' && !galleryLoaded) {
                loadMediaFromSheets();
            }
        });
    });

    startCounters();
    setDailyQuote('fr');
    buildMembersGrid();
    initGalleryFilters();

    var modalClose = document.getElementById('modal-close');
    if (modalClose) modalClose.addEventListener('click', closeModal);
    var modalOverlay = document.getElementById('modal-member');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) { if (e.target === this) closeModal(); });
    }

    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('theme-gold-intense');
            themeToggle.querySelector('i').className = document.body.classList.contains('theme-gold-intense') ? 'fa-solid fa-sun' : 'fa-solid fa-palette';
        });
    }

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.lang-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            applyLanguage(btn.getAttribute('data-lang'));
        });
    });

    initContactForm();
    initShare();
    initTTS();
    initPWA();
});
                                           
