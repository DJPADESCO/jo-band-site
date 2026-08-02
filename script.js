/* ==========================================================================
   1. CONFIGURATION, CONSTANTES ET VARIABLES GLOBALES
   ========================================================================== */
'use strict';

const SHEETS_ID   = '1qa-6kDsGtT6uCQ71bcUS9WWzkNAHEz32ReQhuje1Pis';
const SHEETS_URL  = `https://docs.google.com/spreadsheets/d/${SHEETS_ID}/gviz/tq?tqx=out:json&sheet=Sheet1`;
const APP_VERSION = '2026.05.18.1';
const SW_VERSION  = '2026.05.18.1';

let deferredInstallPrompt = null;
let currentLang           = 'fr';
let allMediaItems         = [];
let galleryLoaded         = false;

/* ==========================================================================
   2. DONNÉES DU COLLECTIF (MEMBRES & PUNCHLINES)
   ========================================================================== */
let members = [];

const quotes = {
    fr: [
        "L'humour, c'est notre langue officielle. JO BAND transforme chaque soirée en fête.",
        "On ne fait pas que du bruit, on crée des souvenirs inoubliables.",
        "Si votre soirée manque d'ambiance, c'est que JO BAND n'était pas invité.",
        "Le rire est universel. Notre scène, elle, est pour tout le Togo.",
        "Partout où ça bouge, JO BAND est déjà là.",
        "Un collectif, une vision : rendre chaque moment de votre vie mémorable.",
        "Le week-end commence quand JO BAND monte sur scène."
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

/* ==========================================================================
   3. DICTIONNAIRE DE TRADUCTION (FR / EN)
   ========================================================================== */
const translations = {
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

/* ==========================================================================
   4. FONCTIONS DE SÉCURITÉ ET UTILITAIRES
   ========================================================================== */
function sanitize(str) {
    return String(str == null ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/* ==========================================================================
   5. INTERFACE UTILISATEUR & CYCLES DE VIE
   ========================================================================== */
function hideSplash() {
    const splash = document.getElementById('splash-screen');
    if (!splash) return;
    setTimeout(() => {
        splash.style.opacity = '0';
        splash.style.transition = 'opacity 0.4s ease';
        setTimeout(() => { splash.style.display = 'none'; }, 400);
    }, 1200);
}

function startCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        const step = Math.max(1, Math.ceil(target / 50));
        let current = 0;

        const tick = () => {
            current += step;
            if (current < target) {
                counter.textContent = current;
                window.setTimeout(tick, 25);
            } else {
                counter.textContent = target + '+';
            }
        };
        tick();
    });
}

function setDailyQuote(lang) {
    const el = document.getElementById('daily-quote');
    if (!el) return;
    const list = quotes[lang] || quotes.fr;
    el.textContent = list[new Date().getDay()];
}

function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!dict[key]) return;

        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = dict[key];
        } else {
            el.textContent = dict[key];
        }
    });

    setDailyQuote(lang);
}

// ==========================
// CLOUDINARY GALLERY ONLY
// ==========================

function loadGallery() {
    const container = document.getElementById('galerie-container');
    const dict = translations[currentLang] || translations.fr;

    if (!container) return;

    if (galleryLoaded && allMediaItems.length) {
        renderGallery('all');
        return;
    }

    container.innerHTML = `<p class="gallery-msg">${dict['gallery-loading'] || 'Chargement...'}</p>`;

    fetch('/api/videos')
        .then(response => response.json())
        .then(result => {
            if (!result.success || !result.data) throw new Error('Erreur Cloudinary');

            allMediaItems = result.data.map(file => {
                const type = file.category || 'photo';

                const titrePropre =
                    file.display_name ||
                    file.public_id.split('/').pop().replace(/[-_]/g, ' ').toUpperCase();

                return {
                    id:    file.public_id,
                    titre: titrePropre,
                    type:  type,
                    lien:  file.secure_url,
                    image: file.secure_url,
                    date:  file.created_at || ''
                };
            });

            galleryLoaded = true;
            renderGallery('all');
        })
        .catch(error => {
            console.error('Cloudinary Error:', error);
            container.innerHTML = `<p class="gallery-msg error">Impossible de charger la galerie.</p>`;
        });
}

function renderGallery(filter = 'all') {
    const container = document.getElementById('galerie-container');
    if (!container) return;

    let items = filter === 'all'
        ? allMediaItems
        : allMediaItems.filter(item => item.type === filter);

    if (!items.length) {
        container.innerHTML = `<p class="gallery-msg">Aucun média disponible.</p>`;
        return;
    }

    container.innerHTML = items.map(item => {
        const badge = `<span class="media-badge badge-${item.type}">${item.type}</span>`;
        const title = `<h3 class="media-title">${sanitize(item.titre) || 'JO BAND'}</h3>`;

        if (item.type === 'video') {
            return `
                <div class="media-card">
                    <video controls preload="metadata" class="gallery-video" playsinline>
                        <source src="${item.lien}" type="video/mp4">
                    </video>
                    <div class="media-info">${badge}${title}</div>
                </div>`;
        }

        if (item.type === 'document') {
            return `
                <div class="media-card document-card">
                    <a href="${item.lien}" target="_blank" rel="noopener noreferrer" class="doc-link">
                        <i class="fa-solid fa-file-pdf"></i>
                        ${title}
                        <span>Ouvrir</span>
                    </a>
                </div>`;
        }

        return `
            <div class="media-card">
                <img src="${item.image}"
                     alt="${sanitize(item.titre)}"
                     class="gallery-image"
                     loading="lazy"
                     onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                <div class="img-fallback" style="display:none;">
                    <i class="fa-solid fa-image"></i>
                    <span>Image non disponible</span>
                </div>
                <div class="media-info">${badge}${title}</div>
            </div>`;

    }).join('');
}

function initGalleryFilters() {
    document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGallery(btn.getAttribute('data-filter'));
        });
    });
}

/* ==========================================================================
   7. GESTION DU COLLECTIF & MODALES
   ========================================================================== */
function buildMembersGrid() {
    const grid = document.getElementById('container-membres');
    if (!grid) return;

    try {
        fetch('/api/admin-members')
            .then(r => r.json())
            .then(result => {
                if (!result.success || !result.data || !result.data.length) {
                    grid.innerHTML = '<p class="testi-msg">Aucun membre à afficher pour le moment.</p>';
                    return;
                }

                members = result.data;

                grid.innerHTML = members.map(m => {
                    const imgSrc = m.imageUrl || '';
                    const imgTag = imgSrc
                        ? `<img src="${imgSrc}" alt="${sanitize(m.name)}" class="member-img" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">`
                        : `<img src="" alt="${sanitize(m.name)}" class="member-img" style="display:none;">`;
                    return `
                        <div class="member-card" data-id="${m.id}" data-name="${sanitize(m.name)}" data-role="${sanitize(m.role)}" data-image="${imgSrc}">
                            ${imgTag}
                            <div class="member-fallback-bg" style="display:${imgSrc ? 'none' : 'flex'};"><i class="fa-solid fa-user"></i></div>
                            <h3>${sanitize(m.name)}</h3>
                            <p>${sanitize(m.role)}</p>
                        </div>
                    `;
                }).join('');

                grid.addEventListener('click', e => {
                    const card = e.target.closest('.member-card');
                    if (!card) return;
                    openModal(card.dataset.id, card.dataset.name, card.dataset.role, card.dataset.image);
                });
            })
            .catch(() => {
                grid.innerHTML = '<p class="testi-msg">Impossible de charger les membres pour le moment.</p>';
            });
    } catch (e) {
        grid.innerHTML = '<p class="testi-msg">Impossible de charger les membres pour le moment.</p>';
    }
}
                  

function openModal(id, name, role, imageUrl) {
    const modal = document.getElementById('modal-member');
    const img = document.getElementById('modal-img');
    const fallback = document.getElementById('modal-fallback');
    if (!modal || !img || !fallback) return;

    img.src = imageUrl || '';
    img.alt = name;
    img.style.display = 'block';
    fallback.style.display = 'none';

    const modalName = document.getElementById('modal-name');
    const modalRole = document.getElementById('modal-role');
    if (modalName) modalName.textContent = name;
    if (modalRole) modalRole.textContent = role;

    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal-member');
    if (modal) modal.style.display = 'none';
}

/* ── CONTENU CONTACT (numéros WhatsApp + réseaux sociaux) ── */
function loadContactContent() {
    fetch('/api/admin-members?resource=content&section=contact')
        .then(r => r.json())
        .then(result => {
            if (!result.success || !result.data) return;
            const d = result.data;

            function toWaLink(tel) {
                return tel ? 'https://wa.me/' + tel.replace(/[^0-9]/g, '') : '';
            }

            const line1 = document.getElementById('wa-line1');
            if (line1 && d.tel1) {
                line1.href = toWaLink(d.tel1);
                line1.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Ligne 1 (' + sanitize(d.tel1) + ')';
            }
            const line2 = document.getElementById('wa-line2');
            if (line2 && d.tel2) {
                line2.href = toWaLink(d.tel2);
                line2.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Ligne 2 (' + sanitize(d.tel2) + ')';
            }
            const yt = document.getElementById('social-youtube');
            if (yt && d.youtube) yt.href = d.youtube;
            const tk = document.getElementById('social-tiktok');
            if (tk && d.tiktok) tk.href = d.tiktok;
            const waCh = document.getElementById('social-wa-channel');
            if (waCh && d.waChannel) waCh.href = d.waChannel;
        })
        .catch(() => {});
}

/* ── CONTENU FORMULES (FR/EN + prix) ── */
let formulesContentCache = null;

function getCurrentLang() {
    const activeBtn = document.querySelector('.lang-btn.active');
    return activeBtn ? activeBtn.getAttribute('data-lang') : 'fr';
}

function renderFormulesContent(lang) {
    if (!formulesContentCache) return;
    const d = formulesContentCache;

    function applyPackage(key, prefix) {
        const pkg = d[key];
        if (!pkg) return;

        const badgeEl = document.getElementById(prefix + '-badge');
        const titleEl = document.getElementById(prefix + '-title');
        const descEl  = document.getElementById(prefix + '-desc');
        const priceEl = document.getElementById(prefix + '-price');
        const featEl  = document.getElementById(prefix + '-features');

        const badge = lang === 'en' ? pkg.badge_en : pkg.badge_fr;
        const title = lang === 'en' ? pkg.title_en : pkg.title_fr;
        const desc  = lang === 'en' ? pkg.desc_en  : pkg.desc_fr;
        const features = lang === 'en' ? pkg.features_en : pkg.features_fr;

        if (badgeEl && badge) badgeEl.textContent = badge;
        if (titleEl && title) titleEl.textContent = title;
        if (descEl && desc)   descEl.textContent = desc;

        if (priceEl) {
            if (pkg.price) {
                priceEl.textContent = sanitize(pkg.price);
                priceEl.style.display = 'block';
            } else {
                priceEl.style.display = 'none';
            }
        }

        if (featEl && features && features.length) {
            featEl.innerHTML = features.map(f =>
                `<li><i class="fa-solid fa-check text-gold"></i> <span>${sanitize(f)}</span></li>`
            ).join('');
        }
    }

    applyPackage('standard', 'pkg-standard');
    applyPackage('premium', 'pkg-premium');
}

function loadFormulesContent() {
    fetch('/api/admin-members?resource=content&section=formules')
        .then(r => r.json())
        .then(result => {
            if (!result.success || !result.data) return;
            formulesContentCache = result.data;
            renderFormulesContent(getCurrentLang());
        })
        .catch(() => {});
}

/* ── CONTENU GÉNÉRAL (LOGO, FOOTER) ── */
function loadGeneralContent() {
    fetch('/api/admin-members?resource=content&section=general')
        .then(r => r.json())
        .then(result => {
            if (!result.success || !result.data) return;
            const d = result.data;

            if (d.logoUrl) {
                document.querySelectorAll('.header-logo').forEach(img => {
                    img.src = d.logoUrl;
                });
            }

            if (d.colors) {
                const root = document.documentElement.style;
                if (d.colors.gold)      root.setProperty('--gold', d.colors.gold);
                if (d.colors.navy)      root.setProperty('--navy', d.colors.navy);
                if (d.colors.navyLight) root.setProperty('--navy-light', d.colors.navyLight);
                if (d.colors.navyBlue)  root.setProperty('--navy-blue', d.colors.navyBlue);
                if (d.colors.textMain)  root.setProperty('--text-main', d.colors.textMain);
            }

            const footerTitleEl = document.getElementById('footer-newsletter-title');
            if (footerTitleEl && d.footerTitle) footerTitleEl.textContent = d.footerTitle;

            const copyrightEl = document.getElementById('footer-copyright');
            if (copyrightEl && d.copyrightText) copyrightEl.innerHTML = '&copy; ' + sanitize(d.copyrightText);
        })
        .catch(() => {});
}
        .catch(() => {});
    }

/* ==========================================================================
   8. FORMULAIRES & FEDAPAY
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('formspree-contact');
    const status = document.getElementById('form-status-message');
    const submitBtn = form ? form.querySelector('.submit-form-btn') : null;

    if (!form || !status) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        status.className = 'form-status-box';
        status.textContent = 'Envoi en cours...';
        status.style.display = 'block';

        if (submitBtn) submitBtn.disabled = true;

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        })
        .then(res => {
            if (!res.ok) throw new Error('Formspree error');
            status.className = 'form-status-box success';
            status.textContent = "Demande envoyée ! L'équipe vous contactera très vite.";
            form.reset();
        })
        .catch(() => {
            status.className = 'form-status-box error';
            status.textContent = "Erreur d'envoi. Veuillez utiliser WhatsApp.";
        })
        .finally(() => {
            if (submitBtn) submitBtn.disabled = false;
        });
    });
}

function initFedaPayIntegration(closeBurgerCallback) {
    const fedapayBtn = document.getElementById('btn-fedapay');
    if (!fedapayBtn) return;

    const resetButton = () => {
        fedapayBtn.disabled = false;
        fedapayBtn.innerHTML = '<i class="fa-solid fa-heart"></i> Soutenir JO BAND';
    };

    const openFedaPay = () => {
        if (typeof FedaPay === 'undefined') {
            alert('Connexion lente. Veuillez réessayer.');
            resetButton();
            return;
        }

        FedaPay.init({
            public_key: 'pk_sandbox_nlmehOJq-jHX7WsLovvqt8Tr',
            transaction: {
                amount: 500,
                description: 'Soutien au collectif JO BAND'
            },
            customer: {
                email: 'supporter@joband.com'
            }
        }).open();

        resetButton();
    };

    fedapayBtn.addEventListener('click', () => {
        if (typeof closeBurgerCallback === 'function') closeBurgerCallback();

        fedapayBtn.disabled = true;
        fedapayBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Chargement...';

        if (typeof FedaPay !== 'undefined') {
            openFedaPay();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.fedapay.com/checkout.js?v=1.1.7';
        script.onload = openFedaPay;
        script.onerror = () => {
            alert('Impossible de charger FedaPay. Vérifiez votre connexion.');
            resetButton();
        };
        document.head.appendChild(script);
    });
}

/* ==========================================================================
   9. FONCTIONNALITÉS SYSTÈME (TTS, PARTAGE, CACHE & PWA)
   ========================================================================== */
function initShare() {
    document.querySelectorAll('.share-action-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const payload = {
                title: 'JO BAND Officiel',
                text: 'Découvrez le collectif JO BAND !',
                url: window.location.href
            };

            if (navigator.share) {
                navigator.share(payload).catch(() => {});
            } else {
                alert('Copiez le lien de votre navigateur pour partager !');
            }
        });
    });
}

function initTTS() {
    if (!('speechSynthesis' in window)) return;

    const synth = window.speechSynthesis;
    const aboutEl = document.getElementById('about-text');
    const btnPlay = document.getElementById('btn-play');
    const btnPause = document.getElementById('btn-pause');
    const btnStop = document.getElementById('btn-stop');

    if (!aboutEl || !btnPlay || !btnPause || !btnStop) return;

    btnPlay.addEventListener('click', () => {
        synth.cancel();
        const msg = new SpeechSynthesisUtterance(aboutEl.textContent);
        msg.lang = (currentLang === 'en') ? 'en-US' : 'fr-FR';
        synth.speak(msg);
    });

    btnPause.addEventListener('click', () => {
        if (synth.speaking) synth.pause();
    });

    btnStop.addEventListener('click', () => {
        synth.cancel();
    });
}

function clearAppCaches() {
    if (!('caches' in window)) return Promise.resolve();
    return caches.keys().then(keys => {
        return Promise.all(keys.map(key => caches.delete(key)));
    });
}

function initPWA() {
    window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault();
        deferredInstallPrompt = e;

        const banner = document.getElementById('pwa-install-banner');
        if (banner) banner.style.display = 'flex';
    });

    const installBtn = document.getElementById('btn-pwa-install');
    if (installBtn) {
        installBtn.addEventListener('click', () => {
            if (!deferredInstallPrompt) return;

            deferredInstallPrompt.prompt();
            deferredInstallPrompt.userChoice.then(() => {
                deferredInstallPrompt = null;
                const banner = document.getElementById('pwa-install-banner');
                if (banner) banner.style.display = 'none';
            });
        });
    }

    if (localStorage.getItem('jo-band-app-version') !== APP_VERSION) {
        clearAppCaches().finally(() => {
            localStorage.setItem('jo-band-app-version', APP_VERSION);
        });
    }

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.getRegistrations()
                .then(registrations => {
                    registrations.forEach(registration => {
                        if (registration.update) registration.update();
                    });
                })
                .catch(() => {});

            navigator.serviceWorker.register(`/sw.js?v=${SW_VERSION}`).catch(() => {});
        });
    }
}

/* ==========================================================================
   10. INITIALISATION DOM (DÉMARRAGE PRINCIPAL)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
initEventCountdown();
    hideSplash();

    const navItems = document.querySelectorAll('.nav-item');
    const tabs = document.querySelectorAll('.tab-content');
initNotifications();
initAnnonce();
initTikTokRedirect();
   
/* ── COMPTEUR ÉVÉNEMENT ── */
function initEventCountdown() {
    const cardEvent  = document.getElementById('event-countdown-card');
    const cardNoEvent = document.getElementById('no-event-card');
    if (!cardEvent || !cardNoEvent) return;

    fetch('/alice-data.json', { cache: 'no-store' })
        .then(r => r.json())
        .then(data => {
            const ev = data.prochain_event;

            // Pas d'événement ou inactif
            if (!ev || !ev.actif) {
                cardNoEvent.style.display = 'flex';
                return;
            }

            const dateEvent = new Date(ev.date).getTime();
            const maintenant = Date.now();

            // Événement passé
            if (maintenant > dateEvent) {
                cardNoEvent.style.display = 'flex';
                document.querySelector('#no-event-card h3').textContent =
                    'Événement terminé !';
                document.querySelector('#no-event-card p').textContent =
                    'Merci à tous ! Le prochain show arrive bientôt.';
                return;
            }

            // Événement actif → affiche le compteur
            cardEvent.style.display  = 'flex';
            document.getElementById('event-title').textContent = ev.titre || 'Prochain Show';
            document.getElementById('event-lieu').textContent  = ev.lieu  || '';

            function majCompteur() {
                const diff = new Date(ev.date).getTime() - Date.now();
                if (diff <= 0) {
                    clearInterval(timer);
                    cardEvent.style.display   = 'none';
                    cardNoEvent.style.display = 'flex';
                    return;
                }

                const j  = Math.floor(diff / 86400000);
                const h  = Math.floor((diff % 86400000) / 3600000);
                const m  = Math.floor((diff % 3600000)  / 60000);
                const s  = Math.floor((diff % 60000)    / 1000);

                document.getElementById('cnt-jours').textContent    = String(j).padStart(2,'0');
                document.getElementById('cnt-heures').textContent   = String(h).padStart(2,'0');
                document.getElementById('cnt-minutes').textContent  = String(m).padStart(2,'0');
                document.getElementById('cnt-secondes').textContent = String(s).padStart(2,'0');
            }

            majCompteur();
            const timer = setInterval(majCompteur, 1000);
        })
        .catch(() => {
            cardNoEvent.style.display = 'flex';
        });
}

    // Navigation par onglets
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            tabs.forEach(t => t.classList.remove('active'));

            item.classList.add('active');

            const targetId = item.getAttribute('data-tab');
            const target = document.getElementById(targetId);
            if (target) target.classList.add('active');

            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (targetId === 'tab-galerie' && !galleryLoaded) {
    loadGallery();   // ← la nouvelle fonction Cloudinary
}
        });
    });

    // Modules
    startCounters();
    setDailyQuote(currentLang);
    buildMembersGrid();
    loadContactContent();
    loadFormulesContent();
    loadGeneralContent();
    initGalleryFilters();

    // Modale membres
    const modalClose = document.getElementById('modal-close');
    if (modalClose) modalClose.addEventListener('click', closeModal);

    const modalOverlay = document.getElementById('modal-member');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === this) closeModal();
        });
    }

    // Thème (jour/nuit)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('theme-gold-intense');
            const icon = themeToggle.querySelector('i');
            if (!icon) return;
            icon.className = document.body.classList.contains('theme-gold-intense')
                ? 'fa-solid fa-sun'
                : 'fa-solid fa-palette';
        });
    }

    // Langues
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyLanguage(btn.getAttribute('data-lang'));
            renderFormulesContent(btn.getAttribute('data-lang'));
        });
    });

    // Menu Mobile
    const burgerBtn     = document.getElementById('burger-btn');
    const burgerMenu    = document.getElementById('burger-menu');
    const burgerOverlay = document.getElementById('burger-overlay');
    const burgerClose   = document.getElementById('burger-close');

    const openBurger  = () => { burgerMenu.classList.add('open'); burgerOverlay.style.display = 'block'; };
    const closeBurger = () => { burgerMenu.classList.remove('open'); burgerOverlay.style.display = 'none'; };

    if (burgerBtn)     burgerBtn.addEventListener('click', openBurger);
    if (burgerClose)   burgerClose.addEventListener('click', closeBurger);
    if (burgerOverlay) burgerOverlay.addEventListener('click', closeBurger);

    document.querySelectorAll('.burger-nav-item[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');
            navItems.forEach(n => n.classList.remove('active'));
            tabs.forEach(t => t.classList.remove('active'));
            
            const target = document.getElementById(targetId);
            if (target) target.classList.add('active');
            
            closeBurger();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Lightbox Galerie
document.addEventListener('click', e => {
    if (e.target.classList.contains('gallery-photo-thumb')) {
        const lb = document.getElementById('lightbox');
        const lbImg = document.getElementById('lightbox-img');
        if (lb && lbImg) {
            lbImg.src = e.target.src;
            lb.style.display = 'flex';
        }
    }
});

    // Initialisations finales
    initFedaPayIntegration(closeBurger);
    initContactForm();
    initShare();
    initTTS();
    initPWA();
    initTestimonials();
   initEventsCalendar()
/* ── NOTIFICATIONS PUSH ── */
function initNotifications() {
    const VAPID_KEY = 'BEmflxm0W984vE7ZPJ9ADXn2ZfJhUyFVn1pY7lq9d02L1rpgjofPZrcBdaV-s6gARn1_MdnpTM1ZJCrZKWE3p1E';

    firebase.initializeApp({
    apiKey:            'AIzaSyDol8OdWq6YoBY5XMyuPYue25mQnOoIOYE',
    authDomain:        'jo-band-notifications-aea69.firebaseapp.com',
    projectId:         'jo-band-notifications-aea69',
    storageBucket:     'jo-band-notifications-aea69.firebasestorage.app',
    messagingSenderId: '942336247693',
    appId:             '1:942336247693:web:4a0f5915907c911d671fc4'
});

   const messaging = firebase.messaging();

    // Demander permission automatiquement
    Notification.requestPermission().then(permission => {
        if (permission !== 'granted') return;

        messaging.getToken({ vapidKey: VAPID_KEY })
            .then(token => {
                if (!token) return;
                // Envoyer le token au serveur
                fetch('/api/subscribe', {
                    method:  'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify({ token })
                });
            })
            .catch(err => console.error('Token error:', err));
    });

    // Message en avant-plan
    messaging.onMessage(payload => {
        const { title, body } = payload.notification;
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body,
                icon: '/images/logo.jpg'
            });
        }
    });
}

/* ── BANNIÈRE ANNONCE ── */
function initAnnonce() {
    fetch('/alice-data.json', { cache: 'no-store' })
        .then(r => r.json())
        .then(data => {
            const annonce = data.annonce;
            if (!annonce || !annonce.actif) return;

            const banner = document.getElementById('annonce-banner');
            const msg    = document.getElementById('annonce-message');
            const lien   = document.getElementById('annonce-lien');
            const close  = document.getElementById('annonce-close');

            if (!banner || !msg) return;

            msg.textContent      = annonce.message || '';
            lien.href            = annonce.lien    || '#';
            lien.textContent     = annonce.lien_texte || 'Voir';
            lien.style.display   = annonce.lien ? 'inline-block' : 'none';

            if (annonce.couleur === 'rouge') banner.classList.add('rouge');
            if (annonce.couleur === 'vert')  banner.classList.add('vert');

            banner.style.display = 'flex';

            close.addEventListener('click', () => {
                banner.style.display = 'none';
            });
        })
        .catch(() => {});
}

/* ── OUVERTURE FORCEE DANS LE NAVIGATEUR EXTERNE (ANTI-TIKTOK) ── */
function initTikTokRedirect() {
    const ua = navigator.userAgent || navigator.vendor || '';

    const isInAppBrowser = /TikTok|BytedanceWebview|musical_ly|FBAN|FBAV|Instagram|Snapchat|VidMate|Line\/|MicroMessenger/i.test(ua);
    if (!isInAppBrowser) return;

    const isAndroid = /Android/i.test(ua);

    const banner   = document.getElementById('tiktok-banner');
    const btn      = document.getElementById('tiktok-banner-btn');
    const close    = document.getElementById('tiktok-banner-close');
    if (!banner || !btn) return;

    const currentUrl = window.location.href;

    function openExternalAndroid() {
        const cleanUrl  = currentUrl.replace(/^https?:\/\//, '');
        const intentUrl = 'intent://' + cleanUrl +
            '#Intent;scheme=https;launchFlags=0x10000000;end';
        window.location.href = intentUrl;
    }

    function openExternalGeneric() {
        window.open(currentUrl, '_blank');
    }

    banner.style.display = 'flex';

    btn.addEventListener('click', () => {
        if (isAndroid) {
            openExternalAndroid();
        } else {
            openExternalGeneric();
        }
    });

    if (close) {
        close.addEventListener('click', () => {
            banner.style.display = 'none';
        });
    }

    if (isAndroid) {
        setTimeout(openExternalAndroid, 5500);
    }
}

   /* ── TEMOIGNAGES CLIENTS ── */
function initTestimonials() {
    const container   = document.getElementById('testimonials-container');
    const openBtn     = document.getElementById('btn-open-testi-form');
    const formWrapper = document.getElementById('testi-form-wrapper');
    const submitBtn   = document.getElementById('btn-submit-testi');
    const statusBox   = document.getElementById('testi-status-message');
    if (!container || !openBtn) return;

    try {
    fetch('/api/testimonials')
        .then(r => r.json())
        .then(result => {
      if (!result.success || !result.data || !result.data.length) {
                container.innerHTML = '<p class="testi-msg">Soyez le premier à laisser un avis !</p>';
                return;
            }

            const cardsHtml = result.data.map(t => {
                const stars = '⭐'.repeat(Math.min(5, Math.max(1, t.rating || 5)));
                return `
                    <div class="testi-card">
                        <div class="testi-card-stars">${stars}</div>
                        <p class="testi-card-text">${sanitize(t.message)}</p>
                        <p class="testi-card-name">— ${sanitize(t.name)}</p>
                    </div>`;
            }).join('');

            container.innerHTML = `<div class="testi-carousel-track">${cardsHtml}</div>`;

            if (result.data.length > 1) {
                const track = container.querySelector('.testi-carousel-track');
                const cards = track.querySelectorAll('.testi-card');
                let current = 0;
                cards[0].classList.add('testi-active');

                setInterval(() => {
                    cards[current].classList.remove('testi-active');
                    current = (current + 1) % cards.length;
                    cards[current].classList.add('testi-active');
                }, 5000);
            } else {
                container.querySelector('.testi-card').classList.add('testi-active');
            }
        })
        .catch(() => {
            container.innerHTML = '<p class="testi-msg">Impossible de charger les avis pour le moment.</p>';
        });
    } catch (e) {
        container.innerHTML = '<p class="testi-msg">Impossible de charger les avis pour le moment.</p>';
    }

    openBtn.addEventListener('click', () => {
        formWrapper.style.display = formWrapper.style.display === 'none' ? 'block' : 'none';
    });

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const name    = document.getElementById('testi-name').value.trim();
            const rating  = document.getElementById('testi-rating').value;
            const message = document.getElementById('testi-message').value.trim();

            if (!name || !message) {
                statusBox.textContent = 'Merci de remplir votre nom et votre témoignage.';
                statusBox.className = 'form-status-box error';
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi...';

            fetch('/api/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, message, rating })
            })
                .then(r => r.json())
                .then(result => {
                    if (result.success) {
                        statusBox.textContent = 'Merci ! Votre avis sera publié après validation.';
                        statusBox.className = 'form-status-box success';
                        document.getElementById('testi-name').value = '';
                        document.getElementById('testi-message').value = '';
                    } else {
                        statusBox.textContent = "Une erreur s'est produite, réessayez.";
                        statusBox.className = 'form-status-box error';
                    }
                })
                .catch(() => {
                    statusBox.textContent = "Une erreur s'est produite, réessayez.";
                    statusBox.className = 'form-status-box error';
                })
               .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer mon avis';
    }); // Parenthèse de finally d'abord
}); // Accolade et parenthèse du fetch ensuite
    }
        }
   
initYouTubeFeed();
    initNewsletter();
});

/* ── FLUX YOUTUBE DYNAMIQUE (SHORTS + VIDEOS CLASSIQUES) ── */
function initYouTubeFeed() {
    const channelId = 'UCxj3ygXxMVzbKmq4ctSCN5Q';
    const rssUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId;
    const apiUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(rssUrl);

    const container = document.getElementById('yt-video-container');
    const iframe    = document.getElementById('yt-latest-iframe');
    if (!container || !iframe) return;

    fetch(apiUrl)
        .then(r => r.json())
        .then(data => {
            if (!data.items || !data.items.length) return;

            const latestLink = data.items[0].link;
            const isShort = latestLink.includes('/shorts/');

            let videoId = '';
            if (isShort) {
                videoId = latestLink.split('/shorts/')[1].split('?')[0];
            } else if (latestLink.includes('watch?v=')) {
                videoId = latestLink.split('watch?v=')[1].split('&')[0];
            }
            if (!videoId) return;

            iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=0&rel=0';

            if (isShort) {
                container.classList.add('portrait-short');
            } else {
                container.classList.remove('portrait-short');
            }
        })
        .catch(() => {
            // En cas d'échec, l'ancienne playlist reste affichée telle quelle (déjà dans le src par défaut)
           });
}
           
/* ── CALENDRIER D'EVENEMENTS ── */
function initEventsCalendar() {
    const container = document.getElementById('events-container');
    if (!container) return;

    function formatDate(dateStr) {
        const d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    try {
        fetch('/api/events')
        .then(r => r.json())
    .then(result => {
        // 1. On filtre pour enlever les événements annulés
        const activeEvents = result.data.filter(ev => ev.status !== 'cancelled');

        // 2. Si la liste est vide après filtrage, on affiche le message d'absence
        if (activeEvents.length === 0) {
            container.innerHTML = `<p class="testi-msg">Aucun événement prévu pour l'instant. Restez connectés !</p>`;
            return;
        }

        // 3. Sinon, on génère le HTML pour les événements restants
        container.innerHTML = activeEvents.map(ev => {
            const badgeLabel = ev.status === 'soldout' ? 'Complet' : 'Confirmé';
            const img = ev.imageUrl 
                ? `<img src="${ev.imageUrl}" alt="${sanitize(ev.title)}">` 
                : '';
            
            const ticket = ev.ticketLink 
                ? `<a href="${ev.ticketLink}" target="_blank" class="event-ticket-btn">Réserver</a>` 
                : '';
                
            return `
                <div class="event-card">
                    ${img}
                    <div class="event-card-info">
                        <div class="event-card-title">${sanitize(ev.title)} <span class="event-badge ${ev.status}">${badgeLabel}</span></div>
                        <div class="event-card-meta">${formatDate(ev.date)}${ev.time ? ' à ' + ev.time : ''}</div>
                        ${ev.description ? `<div class="event-card-desc">${sanitize(ev.description)}</div>` : ''}
                        ${ticket}
                    </div>
                </div>
            `;
        }).join('');
    })
        .catch(() => {
            container.innerHTML = '<p class="testi-msg">Impossible de charger les événements.</p>';
        });
        } catch (e) {
            container.innerHTML = '<p class="testi-msg">Impossible de charger les événements.</p>';
        }
}
/* ── NEWSLETTER (CASCADE FORMSPREE → WEB3FORMS → WHATSAPP) ── */
function initNewsletter() {
    const form   = document.getElementById('newsletter-form');
    const email  = document.getElementById('newsletter-email');
    const submit = document.getElementById('newsletter-submit');
    const status = document.getElementById('newsletter-status');
    if (!form) return;

    const FORMSPREE_URL   = 'https://formspree.io/f/mjgqdjeo';
    const WEB3FORMS_KEY    = '997522c2-87a5-46d9-86d2-7234af185212';
    const WHATSAPP_NUMBER = '22897668021';

    function showStatus(message, type) {
        status.textContent = message;
        status.className = 'newsletter-status ' + type;
    }

    function tryFormspree(userEmail) {
        return fetch(FORMSPREE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                _subject: 'Nouvelle inscription Newsletter JO BAND'
            })
        }).then(r => {
            if (!r.ok) throw new Error('Formspree failed');
            return true;
        });
    }

    function tryWeb3Forms(userEmail) {
        return fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                email: userEmail,
                subject: 'Nouvelle inscription Newsletter JO BAND (secours)'
            })
        }).then(r => {
            if (!r.ok) throw new Error('Web3Forms failed');
            return true;
        });
    }

    function fallbackWhatsApp(userEmail) {
        const message = encodeURIComponent(
            "Bonjour JO BAND, je souhaite m'inscrire à la newsletter avec l'adresse : " + userEmail
        );
        window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + message, '_blank');
        showStatus('Redirection vers WhatsApp pour finaliser votre inscription...', 'success');
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const userEmail = email.value.trim();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
            showStatus('Merci de saisir une adresse email valide.', 'error');
            return;
        }

        submit.disabled = true;
        submit.textContent = 'Envoi...';
        showStatus('', '');

        // On envoie aussi vers Brevo en parallèle, sans bloquer ni afficher d'erreur si ça échoue
        fetch('/api/brevo-subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail })
        }).catch(() => {});

        try {
        tryFormspree(userEmail)
            .then(() => {
                showStatus('Merci ! Vous êtes bien inscrit(e) à la newsletter.', 'success');
                email.value = '';
            })
            .catch(() => {
                tryWeb3Forms(userEmail)
                    .then(() => {
                        showStatus('Merci ! Vous êtes bien inscrit(e) à la newsletter.', 'success');
                        email.value = '';
                    })
                    .catch(() => {
                        fallbackWhatsApp(userEmail);
                    });
            })
            .finally(() => {
                submit.disabled = false;
                submit.textContent = "S'abonner";
            });
        } catch (e) {
            showStatus('Une erreur est survenue, réessayez plus tard.', 'error');
            submit.disabled = false;
            submit.textContent = "S'abonner";
        }
    });
}
