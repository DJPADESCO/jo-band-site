'use strict';

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

const translations = {
    fr: {
        "live-text":           "EN LIVE",
        "slogan":              "\"Partout où ça bouge, Jo Band est là.\"",
        "wa-channel":          "Chaîne",
        "history-title":       "Notre Histoire",
        "about-text":          "Né de la passion commune pour le rire et la scène, JO BAND est un collectif d'artistes togolais unique. Comédiens, chanteurs, DJ et vidéastes : nous fusionnons nos talents pour créer une machine à bonne humeur.",
        "stat-views":          "K Vues Réseaux",
        "stat-staff":          "Artistes & Staff",
        "stat-shows":          "Shows Réussis",
        "review-title":        "Avis de nos Clients",
        "tab-collectif-title": "Le Collectif",
        "collectif-subtitle":  "Cliquez sur un profil pour en savoir plus",
        "tab-videos-title":    "Le Coin du Rire",
        "videos-subtitle":     "Découvrez nos meilleurs sketchs et exclusivités",
        "yt-feed-title":       "Nos Dernières Vidéos",
        "subscribe-prompt":    "Abonne-toi directement ici :",
        "packages-title":      "Nos Formules Prestations",
        "badge-pop":           "Populaire",
        "pack-standard-title": "Formule Standard",
        "pack-standard-desc":  "Ambiance explosive pour vos soirées, mariages et anniversaires.",
        "feat-1":              "Show Humour sur scène",
        "feat-2":              "Animation DJ par DJ PADESCO",
        "badge-vip":           "Grand Standing",
        "pack-vip-title":      "Formule Premium VIP",
        "pack-vip-desc":       "Le show complet clé en main avec couverture média totale.",
        "feat-3":              "Captation vidéo par Arole & L&H",
        "agenda-title":        "Fil d'actualité Actuel",
        "agenda-desc":         "Actuellement en tournage de la prochaine saison de vidéos humoristiques. Restez connectés ! Le groupe reste disponible pour toutes vos réservations privées ou publiques sur l'année 2026.",
        "tab-contact-title":   "Réserver le Show",
        "contact-subtitle":    "Planifiez votre événement avec l'équipe du JO BAND",
        "btn-submit":          "ENVOYER LA DEMANDE",
        "wa-direct-title":     "Contact Rapide WhatsApp",
        "nav-home":            "Accueil",
        "nav-team":            "Collectif",
        "nav-videos":          "Vidéos",
        "nav-contact":         "Contact",
        "share-site":          "Partager le site"
    },
    en: {
        "live-text":           "LIVE NOW",
        "slogan":              "\"Wherever it moves, Jo Band is there.\"",
        "wa-channel":          "Channel",
        "history-title":       "Our Story",
        "about-text":          "Born from a shared passion for laughter and the stage, JO BAND is a unique Togolese artists collective. Comedians, singers, DJs, and videographers: we merge our talents to create a pure good mood machine.",
        "stat-views":          "Social Views",
        "stat-staff":          "Artists & Staff",
        "stat-shows":          "Successful Shows",
        "review-title":        "Customer Reviews",
        "tab-collectif-title": "The Collective",
        "collectif-subtitle":  "Click on a profile to learn more",
        "tab-videos-title":    "The Comedy Corner",
        "videos-subtitle":     "Discover our best sketches and exclusives",
        "yt-feed-title":       "Our Latest Videos",
        "subscribe-prompt":    "Subscribe right here:",
        "packages-title":      "Our Performance Packages",
        "badge-pop":           "Popular",
        "pack-standard-title": "Standard Package",
        "pack-standard-desc":  "Explosive atmosphere for your parties, weddings, and birthdays.",
        "feat-1":              "Comedy Show on stage",
        "feat-2":              "DJ Performance by DJ PADESCO",
        "badge-vip":           "Luxury Standing",
        "pack-vip-title":      "Premium VIP Package",
        "pack-vip-desc":       "The complete turnkey show with full media coverage.",
        "feat-3":              "Video coverage by Arole & L&H",
        "agenda-title":        "Current News Feed",
        "agenda-desc":         "Currently shooting the next season of comedy videos. Stay connected! The group remains available for all your private or public bookings throughout 2026.",
        "tab-contact-title":   "Book the Show",
        "contact-subtitle":    "Plan your event with the JO BAND crew",
        "btn-submit":          "SEND REQUEST",
        "wa-direct-title":     "Urgent WhatsApp Contact",
        "nav-home":            "Home",
        "nav-team":            "Collective",
        "nav-videos":          "Videos",
        "nav-contact":         "Contact",
        "share-site":          "Share Website"
    }
};

function hideSplash() {
    var splash = document.getElementById('splash-screen');
    if (splash) {
        splash.style.opacity = '0';
        splash.style.transition = 'opacity 0.4s ease';
        setTimeout(function () {
            splash.style.display = 'none';
        }, 400);
    }
}

function startCounterAnimation() {
    var counters = document.querySelectorAll('.stat-number');
    counters.forEach(function (counter) {
        var target = parseInt(counter.getAttribute('data-target'), 10);
        var increment = Math.ceil(target / 50);
        var current = 0;

        var tick = function () {
            current += increment;
            if (current < target) {
                counter.textContent = current;
                setTimeout(tick, 25);
            } else {
                counter.textContent = target + '+';
            }
        };
        tick();
    });
}

function applyLanguage(lang) {
    var dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (dict[key] === undefined) return;

        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = dict[key];
        } else {
            el.textContent = dict[key];
        }
    });

    var aboutEl = document.getElementById('about-text');
    if (aboutEl) {
        aboutEl.setAttribute('data-current-lang', lang);
    }
}

document.addEventListener('DOMContentLoaded', function () {

    hideSplash();

    var navItems = document.querySelectorAll('.nav-item');
    var tabs     = document.querySelectorAll('.tab-content');

    navItems.forEach(function (item) {
        item.addEventListener('click', function () {
            navItems.forEach(function (n) { n.classList.remove('active'); });
            tabs.forEach(function (t) { t.classList.remove('active'); });
            item.classList.add('active');
            var target = document.getElementById(item.getAttribute('data-tab'));
            if (target) target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    startCounterAnimation();

    var grid = document.getElementById('team-grid');
    if (grid) {
        grid.innerHTML = members.map(function (m) {
            return [
                '<div class="member-card" data-id="' + m.id + '" data-name="' + m.name + '" data-role="' + m.role + '">',
                '  <img src="images/' + m.id + '.jpg" alt="' + m.name + '" class="member-img"',
                '    onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">',
                '  <div class="member-fallback-bg" style="display:none;"><i class="fa-solid fa-user"></i></div>',
                '  <h3>' + m.name + '</h3>',
                '  <p>' + m.role + '</p>',
                '</div>'
            ].join('');
        }).join('');

        grid.addEventListener('click', function (e) {
            var card = e.target.closest('.member-card');
            if (!card) return;
            openModal(card.dataset.id, card.dataset.name, card.dataset.role);
        });
    }

    var modal      = document.getElementById('member-modal');
    var closeBtn   = document.getElementById('close-modal');
    var modalImg   = document.getElementById('modal-img');
    var modalFall  = document.getElementById('modal-img-fallback');
    var modalName  = document.getElementById('modal-name');
    var modalRole  = document.getElementById('modal-role');

    function openModal(id, name, role) {
        if (!modal) return;
        modalImg.src = 'images/' + id + '.jpg';
        modalImg.alt = name;
        modalImg.style.display = 'block';
        modalFall.style.display = 'none';
        modalName.textContent = name;
        modalRole.textContent = role;
        modal.style.display = 'flex';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('theme-gold-intense');
            var icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('theme-gold-intense')) {
                icon.className = 'fa-solid fa-sun';
            } else {
                icon.className = 'fa-solid fa-moon';
            }
        });
    }

    var langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            langBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            applyLanguage(btn.getAttribute('data-lang'));
        });
    });

    var shareTriggers = document.querySelectorAll('.share-action-trigger');
    shareTriggers.forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (navigator.share) {
                navigator.share({
                    title: 'JO BAND Officiel',
                    text: 'Découvrez le site officiel du JO BAND ! Humour, DJ et Événements au Togo !',
                    url: window.location.href
                }).catch(function () {});
            } else {
                alert('Copiez le lien de votre navigateur pour partager le site JO BAND !');
            }
        });
    });

    var form       = document.getElementById('contact-form');
    var formStatus = document.getElementById('form-status');
    if (form && formStatus) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            formStatus.style.display = 'block';
            formStatus.className = 'form-status-box';
            formStatus.textContent = 'Envoi en cours...';

            fetch(form.action, {
                method:  form.method,
                body:    new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(function (response) {
                if (response.ok) {
                    formStatus.className = 'form-status-box success';
                    formStatus.textContent = 'Demande envoyée ! L\'équipe vous contactera très vite.';
                    form.reset();
                } else {
                    formStatus.className = 'form-status-box error';
                    formStatus.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer ou utiliser WhatsApp.';
                }
            }).catch(function () {
                formStatus.className = 'form-status-box error';
                formStatus.textContent = 'Problème de connexion. Utilisez WhatsApp en attendant.';
            });
        });
    }

    var synth    = window.speechSynthesis;
    var aboutEl  = document.getElementById('about-text');
    var btnPlay  = document.getElementById('btn-play');
    var btnPause = document.getElementById('btn-pause');
    var btnStop  = document.getElementById('btn-stop');

    if (aboutEl && btnPlay && btnPause && btnStop) {
        btnPlay.addEventListener('click', function () {
            synth.cancel();
            var activeLang = document.querySelector('.lang-btn.active');
            var lang = activeLang ? activeLang.getAttribute('data-lang') : 'fr';
            var msg = new SpeechSynthesisUtterance(aboutEl.textContent);
            msg.lang = lang === 'en' ? 'en-US' : 'fr-FR';
            synth.speak(msg);
        });
        btnPause.addEventListener('click', function () { synth.pause(); });
        btnStop.addEventListener('click',  function () { synth.cancel(); });
    }

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').catch(function () {});
        });
    }
});
 