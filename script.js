/* ═══════════════════════════════════════════════════════════
   JOBAND — script.js
   Auteur : DJ PADESCO
═══════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    /* ──────────────────────────────────────────────────────
       1. DONNÉES — ÉQUIPE (13 membres, rôles corrects)
    ────────────────────────────────────────────────────── */
    var TEAM = [
        { name: 'À confirmer',  roleFr: 'Fondateur / Directeur Général', roleEn: 'Founder / CEO',            tag: 'DIRECTION',   color: '#d4af37', icon: 'fa-crown'           },
        { name: 'JOËL',         roleFr: 'Adjoint & Superviseur',         roleEn: 'Deputy & Supervisor',      tag: 'MANAGEMENT',  color: '#38bdf8', icon: 'fa-user-tie'        },
        { name: 'DJ PADESCO',   roleFr: 'Comédien, vidéaste & DJ',       roleEn: 'Comedian, Videographer & DJ', tag: 'SHOW / DJ',color: '#d4af37', icon: 'fa-headphones'     },
        { name: 'NANA SIKA',    roleFr: 'Vidéaste & Comédien',           roleEn: 'Videographer & Comedian',  tag: 'VIDÉO',       color: '#a78bfa', icon: 'fa-film'            },
        { name: 'CLAUDE',       roleFr: 'Humoriste & Comédien',          roleEn: 'Comedian & Humorist',      tag: 'HUMOUR',      color: '#fff',    icon: 'fa-face-laugh'      },
        { name: 'GÉDÉON',       roleFr: 'Humoriste & Danseur',           roleEn: 'Comedian & Dancer',        tag: 'HUMOUR',      color: '#fff',    icon: 'fa-person-running'  },
        { name: 'ESTHER',       roleFr: 'Humoriste & Comédienne',        roleEn: 'Comedian & Humorist',      tag: 'HUMOUR',      color: '#fff',    icon: 'fa-masks-theater'   },
        { name: 'PRISCA',       roleFr: 'Humoriste & Comédienne',        roleEn: 'Comedian & Humorist',      tag: 'HUMOUR',      color: '#fff',    icon: 'fa-face-smile'      },
        { name: 'MAKAFUI',      roleFr: 'Humoriste & Comédien',          roleEn: 'Comedian & Humorist',      tag: 'HUMOUR',      color: '#fff',    icon: 'fa-star'            },
        { name: 'JEAN',         roleFr: 'Artiste chanteur',              roleEn: 'Singer & Performer',       tag: 'CHANT',       color: '#34d399', icon: 'fa-microphone-lines'},
        { name: 'THE GACHA',    roleFr: 'Artiste chanteur',              roleEn: 'Singer & Performer',       tag: 'CHANT',       color: '#34d399', icon: 'fa-music'           },
        { name: 'AROLE',        roleFr: 'Caméraman',                     roleEn: 'Cameraman',                tag: 'CAMÉRA',      color: '#34d399', icon: 'fa-video'           },
        { name: 'L&H',          roleFr: 'Caméraman',                     roleEn: 'Cameraman',                tag: 'CAMÉRA',      color: '#34d399', icon: 'fa-video'           },
    ];

    /* ──────────────────────────────────────────────────────
       2. DONNÉES — ÉVÉNEMENTS
    ────────────────────────────────────────────────────── */
    var EVENTS = [
        { titleFr: 'Tournée JO BAND 2026',   titleEn: 'JO BAND Tour 2026',    loc: 'Lomé & Environs', date: 'En préparation / Coming soon' },
        { titleFr: 'Animation Mariage – Été', titleEn: 'Wedding Season',       loc: 'Lomé, Togo',      date: 'Juin – Août 2026' },
        { titleFr: 'Gala de Fin d\'Année',   titleEn: 'Year-End Gala',        loc: 'Lomé, Togo',      date: 'Décembre 2026' },
    ];

    /* ──────────────────────────────────────────────────────
       3. TRADUCTIONS
    ────────────────────────────────────────────────────── */
    var T = {
        fr: {
            'nav-about':      'Histoire',
            'nav-services':   'Prestations',
            'nav-team':       'L\'Équipe',
            'nav-contact':    'Contact',
            'hero-badge':     '⚡ L\'énergie qu\'il faut pour vos événements',
            'hero-subtitle':  'Le collectif d\'artistes qui donne de la joie à vos événements.',
            'btn-book':       '📅 Réserver JO BAND',
            'btn-videos':     '▶ Nos Vidéos',
            'stat-members':   'Membres',
            'stat-humor':     'Humour',
            'stat-avail':     'Disponible',
            'eyebrow-about':  'Notre ADN',
            'about-title':    'Notre Histoire',
            'about-text':     'Né de la passion commune pour le rire et la scène, JO BAND est un collectif d\'artistes togolais unique en son genre. Comédiens, humoristes, danseurs, DJ et vidéastes : nous avons fusionné nos talents pour créer une véritable machine à bonne humeur. Du contenu viral sur vos écrans jusqu\'à l\'animation explosive de vos plus grands événements, JO BAND n\'a qu\'un seul objectif : transformer chaque instant en un souvenir inoubliable.',
            'btn-listen':     'Écouter',
            'eyebrow-services':'Expertise',
            'services-title': 'Nos Prestations',
            'service-1-title':'Comédie & Spectacles',
            'service-1-desc': 'Sketchs hilarants et performances pour galas, anniversaires et événements. Le rire est garanti.',
            'service-2-title':'Animation Mariage',
            'service-2-desc': 'MC pro + DJ Padesco aux platines. Ambiance, rires et émotion pour votre plus beau jour.',
            'service-3-title':'DJ & Animation',
            'service-3-desc': 'DJ Padesco : comédien, animateur ET DJ polyvalent. Concerts, soirées, galas – il assure tout.',
            'service-4-title':'Création Vidéo',
            'service-4-desc': 'Arole & L&H (caméra) + Nana Sika (vidéaste) capturent vos moments et créent du contenu viral.',
            'eyebrow-events': 'Agenda',
            'events-title':   'Prochainement',
            'eyebrow-team':   'La Famille',
            'team-title':     'Les 13 Membres',
            'eyebrow-contact':'Réservation',
            'contact-title':  'Contactez-nous',
            'contact-desc':   'Remplissez le formulaire pour envoyer un message pro sur notre WhatsApp, appelez ou écrivez par email.',
            'form-title':     'Envoyer via WhatsApp',
            'form-name-lbl':  'Votre Nom *',
            'form-type-lbl':  'Type d\'événement *',
            'form-msg-lbl':   'Détails (Date, Lieu…) *',
            'btn-wa-send':    'ENVOYER SUR WHATSAPP',
            'form-secure':    'Formulaire sécurisé – Redirection vers WhatsApp',
            'err-name':       '⚠ Veuillez entrer votre nom.',
            'err-msg':        '⚠ Veuillez décrire votre événement.',
            'modal-title':    'Regarder JO BAND',
            'modal-wa':       'Chaîne WhatsApp',
        },
        en: {
            'nav-about':      'Story',
            'nav-services':   'Services',
            'nav-team':       'Team',
            'nav-contact':    'Contact',
            'hero-badge':     '⚡ The energy your events need',
            'hero-subtitle':  'The artist collective bringing joy to your events.',
            'btn-book':       '📅 Book JO BAND',
            'btn-videos':     '▶ Our Videos',
            'stat-members':   'Members',
            'stat-humor':     'Humor',
            'stat-avail':     'Available',
            'eyebrow-about':  'Our DNA',
            'about-title':    'Our Story',
            'about-text':     'Born from a shared passion for laughter and the stage, JO BAND is a unique Togolese artist collective. Comedians, dancers, DJs, and videographers: we merged our talents to create a powerhouse of good vibes. From viral digital content to explosive live event entertainment, JO BAND has one single goal: turning every moment into an unforgettable memory.',
            'btn-listen':     'Listen',
            'eyebrow-services':'Expertise',
            'services-title': 'Our Services',
            'service-1-title':'Comedy & Shows',
            'service-1-desc': 'Hilarious skits and live performances for galas, birthdays, and events. Laughter guaranteed.',
            'service-2-title':'Wedding Hosting',
            'service-2-desc': 'Pro MC + DJ Padesco at the decks. Atmosphere, laughter and emotion for your big day.',
            'service-3-title':'DJ & Entertainment',
            'service-3-desc': 'DJ Padesco: comedian, host AND DJ. Concerts, parties, galas – he handles it all.',
            'service-4-title':'Video Production',
            'service-4-desc': 'Arole & L&H (camera) + Nana Sika (videographer) capture your moments and create viral content.',
            'eyebrow-events': 'Agenda',
            'events-title':   'Upcoming',
            'eyebrow-team':   'The Family',
            'team-title':     'The 13 Members',
            'eyebrow-contact':'Booking',
            'contact-title':  'Contact Us',
            'contact-desc':   'Fill out the form to send a professional message to our WhatsApp, or call/email us.',
            'form-title':     'Send via WhatsApp',
            'form-name-lbl':  'Your Name *',
            'form-type-lbl':  'Event Type *',
            'form-msg-lbl':   'Details (Date, Venue…) *',
            'btn-wa-send':    'SEND ON WHATSAPP',
            'form-secure':    'Secure form – Redirects to WhatsApp',
            'err-name':       '⚠ Please enter your name.',
            'err-msg':        '⚠ Please describe your event.',
            'modal-title':    'Watch JO BAND',
            'modal-wa':       'WhatsApp Channel',
        }
    };

    var currentLang = 'fr';

    /* ──────────────────────────────────────────────────────
       4. RENDU ÉQUIPE
    ────────────────────────────────────────────────────── */
    function renderTeam(query) {
        query = (query || '').toLowerCase().trim();
        var container = document.getElementById('team-container');
        if (!container) return;

        var list = TEAM.filter(function (m) {
            var roleTxt = currentLang === 'en' ? m.roleEn : m.roleFr;
            return m.name.toLowerCase().includes(query) ||
                   roleTxt.toLowerCase().includes(query) ||
                   m.tag.toLowerCase().includes(query);
        });

        if (list.length === 0) {
            container.innerHTML = '<p class="no-result">Aucun résultat / No result.</p>';
            return;
        }

        container.innerHTML = list.map(function (m) {
            var role = currentLang === 'en' ? m.roleEn : m.roleFr;
            return '<article class="member-card" role="listitem">' +
                '<div class="member-icon" style="color:' + m.color + '">' +
                    '<i class="fa-solid ' + m.icon + '" aria-hidden="true"></i>' +
                '</div>' +
                '<h4>' + m.name + '</h4>' +
                '<p>' + role + '</p>' +
                '<span class="card-tag">' + m.tag + '</span>' +
            '</article>';
        }).join('');
    }

    /* ──────────────────────────────────────────────────────
       5. RENDU ÉVÉNEMENTS
    ────────────────────────────────────────────────────── */
    function renderEvents() {
        var container = document.getElementById('events-container');
        if (!container) return;
        container.innerHTML = EVENTS.map(function (e) {
            var title = currentLang === 'en' ? e.titleEn : e.titleFr;
            return '<div class="event-item">' +
                '<div>' +
                    '<h3>' + title + '</h3>' +
                    '<p><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ' + e.loc + '</p>' +
                '</div>' +
                '<div class="event-date">' + e.date + '</div>' +
            '</div>';
        }).join('');
    }

    /* ──────────────────────────────────────────────────────
       6. SYSTÈME DE LANGUE
    ────────────────────────────────────────────────────── */
    function setLang(lang) {
        currentLang = lang;
        window.speechSynthesis && window.speechSynthesis.cancel();

        document.documentElement.lang = lang;
        var btnFr = document.getElementById('btn-fr');
        var btnEn = document.getElementById('btn-en');
        if (btnFr) { btnFr.classList.toggle('active', lang === 'fr'); btnFr.setAttribute('aria-pressed', lang === 'fr'); }
        if (btnEn) { btnEn.classList.toggle('active', lang === 'en'); btnEn.setAttribute('aria-pressed', lang === 'en'); }

        // Translate all [data-key] elements
        document.querySelectorAll('[data-key]').forEach(function (el) {
            var key = el.getAttribute('data-key');
            if (T[lang][key] !== undefined) el.textContent = T[lang][key];
        });

        // Search placeholder
        var si = document.getElementById('search-input');
        if (si) si.placeholder = lang === 'fr' ? 'Rechercher un membre…' : 'Search a member…';

        renderTeam(si ? si.value : '');
        renderEvents();
    }

    /* ──────────────────────────────────────────────────────
       7. TEXT-TO-SPEECH
    ────────────────────────────────────────────────────── */
    function speakAbout() {
        if (!('speechSynthesis' in window)) {
            alert(currentLang === 'fr'
                ? 'Votre navigateur ne supporte pas la lecture audio.'
                : 'Your browser does not support text-to-speech.');
            return;
        }
        window.speechSynthesis.cancel();
        var text = document.getElementById('about-text');
        if (!text) return;
        var utt = new SpeechSynthesisUtterance(text.textContent);
        utt.lang = currentLang === 'fr' ? 'fr-FR' : 'en-US';
        utt.rate = 0.92;
        window.speechSynthesis.speak(utt);
    }

    /* ──────────────────────────────────────────────────────
       8. WHATSAPP FORM (sécurisé + validation)
    ────────────────────────────────────────────────────── */
    var WA_NUMBER = '22897668021';

    function sanitize(s) {
        return String(s).trim()
            .replace(/[<>"'&]/g, '')
            .substring(0, 500);
    }

    function sendWhatsApp() {
        var nameEl = document.getElementById('waName');
        var typeEl = document.getElementById('waType');
        var msgEl  = document.getElementById('waMsg');
        var errN   = document.getElementById('err-name');
        var errM   = document.getElementById('err-msg');
        var ok = true;

        if (!nameEl.value.trim()) {
            errN.classList.remove('hidden'); if (ok) nameEl.focus(); ok = false;
        } else errN.classList.add('hidden');

        if (!msgEl.value.trim()) {
            errM.classList.remove('hidden'); if (ok) msgEl.focus(); ok = false;
        } else errM.classList.add('hidden');

        if (!ok) return;

        var name    = sanitize(nameEl.value);
        var type    = sanitize(typeEl.options[typeEl.selectedIndex].text);
        var details = sanitize(msgEl.value);

        var msg = encodeURIComponent(
            '*NOUVELLE DEMANDE JO BAND* 🎭\n\n' +
            '*Nom:* ' + name + '\n' +
            '*Événement:* ' + type + '\n' +
            '*Détails:* ' + details + '\n\n' +
            '_Message envoyé depuis le site officiel._'
        );

        window.open('https://wa.me/' + WA_NUMBER + '?text=' + msg, '_blank', 'noopener,noreferrer');
    }

    /* ──────────────────────────────────────────────────────
       9. VIDEO MODAL
    ────────────────────────────────────────────────────── */
    function openModal()  {
        var m = document.getElementById('vid-modal');
        if (!m) return;
        m.classList.add('open');
        m.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-lock');
    }
    function closeModal() {
        var m = document.getElementById('vid-modal');
        if (!m) return;
        m.classList.remove('open');
        m.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-lock');
    }

    /* ──────────────────────────────────────────────────────
       10. MOBILE NAV
    ────────────────────────────────────────────────────── */
    function setupMobileNav() {
        var btn = document.getElementById('burger-btn');
        var nav = document.getElementById('mobile-nav');
        if (!btn || !nav) return;

        btn.addEventListener('click', function () {
            var open = nav.classList.toggle('open');
            btn.classList.toggle('open', open);
            btn.setAttribute('aria-expanded', open);
            nav.setAttribute('aria-hidden', !open);
        });

        nav.querySelectorAll('.mob-link').forEach(function (a) {
            a.addEventListener('click', function () {
                nav.classList.remove('open');
                btn.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
            });
        });
    }

    /* ──────────────────────────────────────────────────────
       11. SCROLL PROGRESS BAR
    ────────────────────────────────────────────────────── */
    function setupProgress() {
        var bar = document.getElementById('progress-bar');
        if (!bar) return;
        window.addEventListener('scroll', function () {
            var total = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
        }, { passive: true });
    }

    /* ──────────────────────────────────────────────────────
       12. HEADER SCROLL EFFECT
    ────────────────────────────────────────────────────── */
    function setupHeaderScroll() {
        var hdr = document.getElementById('main-header');
        if (!hdr) return;
        window.addEventListener('scroll', function () {
            hdr.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });
    }

    /* ──────────────────────────────────────────────────────
       13. SCROLL REVEAL OBSERVER
    ────────────────────────────────────────────────────── */
    function setupReveal() {
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); }
            });
        }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });
        document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
    }

    /* ──────────────────────────────────────────────────────
       14. HERO FLOATING PARTICLES
    ────────────────────────────────────────────────────── */
    function setupParticles() {
        var c = document.getElementById('hero-particles');
        if (!c) return;
        var icons = ['fa-music','fa-star','fa-bolt','fa-masks-theater','fa-headphones','fa-microphone','fa-film','fa-heart'];
        for (var i = 0; i < 12; i++) {
            var el  = document.createElement('div');
            var sz  = (Math.random() * 12 + 8);
            var dur = (Math.random() * 10 + 8).toFixed(1);
            var del = -(Math.random() * 10).toFixed(1);
            var col = Math.random() > 0.5 ? 'rgba(212,175,55,' : 'rgba(56,189,248,';
            el.style.cssText =
                'position:absolute;left:' + (Math.random()*92+2) + '%;top:' + (Math.random()*88+4) + '%;' +
                'font-size:' + sz + 'px;opacity:' + (Math.random()*0.07+0.02).toFixed(3) + ';' +
                'color:' + col + '1);pointer-events:none;' +
                'animation:bounce ' + dur + 's ' + del + 's ease-in-out infinite alternate;';
            el.innerHTML = '<i class="fa-solid ' + icons[i % icons.length] + '"></i>';
            c.appendChild(el);
        }
    }

    /* ──────────────────────────────────────────────────────
       15. FOOTER YEAR
    ────────────────────────────────────────────────────── */
    function setYear() {
        var el = document.getElementById('f-year');
        if (el) el.textContent = new Date().getFullYear();
    }

    /* ──────────────────────────────────────────────────────
       INIT
    ────────────────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        setLang('fr');
        renderTeam();
        renderEvents();
        setupMobileNav();
        setupProgress();
        setupHeaderScroll();
        setupReveal();
        setupParticles();
        