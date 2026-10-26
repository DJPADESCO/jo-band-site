/* ==========================================================================
   JO BAND — ui-effects.js
   Petits effets d'interface, dans un fichier à part : il ne touche ni à script.js ni à l'API.
   Il ne fait que lire la page et ajouter des classes. En cas d'erreur, le site continue de marcher.
   Retire la ligne <script src="ui-effects.js"> de index.html pour le désactiver complètement.
   ========================================================================== */
(function () {
    'use strict';

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(function () {

        /* 1. Barre de progression de lecture + ombre sur l'en-tête quand on défile */
        try {
            var bar = document.createElement('div');
            bar.id = 'scroll-progress';
            bar.setAttribute('aria-hidden', 'true');
            document.body.appendChild(bar);
            var header = document.querySelector('.main-header');
            var ticking = false;
            var update = function () {
                var h = document.documentElement;
                var max = h.scrollHeight - h.clientHeight;
                bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')';
                if (header) header.classList.toggle('scrolled', window.scrollY > 8);
                ticking = false;
            };
            window.addEventListener('scroll', function () {
                if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
            }, { passive: true });
            update();
        } catch (e) {}

        /* 2. Apparition au défilement pour les navigateurs qui ne savent pas le faire en CSS seul */
        try {
            var cssCapable = window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');
            if (!cssCapable && 'IntersectionObserver' in window) {
                document.documentElement.classList.add('js-reveal');
                var targets = '.promo-card, .testimonials-block, .events-calendar-block, .feature-item-box, .package-card, ' +
                              '.coulisse-card, .benefit-item, .newsletter-block, .tiktok-section, .video-main-card, ' +
                              '.booking-form, .direct-contact-block, .social-channels-block, .sponsor-hero-card';
                var io = new IntersectionObserver(function (entries) {
                    entries.forEach(function (en) {
                        if (en.isIntersecting) { en.target.classList.add('rv-in'); io.unobserve(en.target); }
                    });
                }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
                document.querySelectorAll(targets).forEach(function (el) { el.classList.add('rv'); io.observe(el); });
            }
        } catch (e) {}

        /* 3. Galerie : un clic sur une photo l'ouvre en grand (la fenêtre existe déjà dans index.html) */
        try {
            var lb = document.getElementById('lightbox');
            var lbImg = document.getElementById('lightbox-img');
            if (lb && lbImg) {
                document.addEventListener('click', function (e) {
                    var img = e.target.closest && e.target.closest('.gallery-image');
                    if (!img || !img.src) return;
                    lbImg.src = img.src;
                    lbImg.alt = img.alt || '';
                    lb.style.display = 'flex';
                });
                lb.addEventListener('click', function (e) {
                    if (e.target === lb) lb.style.display = 'none';   // clic sur le fond = fermer
                });
            }
        } catch (e) {}

        /* 4. Touche Échap : ferme la photo, la fiche d'un membre ou le menu, selon ce qui est ouvert */
        try {
            document.addEventListener('keydown', function (e) {
                if (e.key !== 'Escape') return;
                var lb2 = document.getElementById('lightbox');
                if (lb2 && lb2.style.display === 'flex') { lb2.style.display = 'none'; return; }
                var modal = document.getElementById('modal-member');
                if (modal && modal.style.display !== 'none' && modal.style.display !== '') {
                    var c = document.getElementById('modal-close'); if (c) c.click(); return;
                }
                var menu = document.getElementById('burger-menu');
                if (menu && menu.classList.contains('open')) {
                    var bc = document.getElementById('burger-close'); if (bc) bc.click();
                }
            });
        } catch (e) {}

        /* 5. Effet de lumière qui suit la souris sur les cartes (ordinateur seulement) */
        try {
            if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                document.addEventListener('pointermove', function (e) {
                    var card = e.target.closest && e.target.closest('.member-card, .feature-item-box, .package-card, .promo-card');
                    if (!card) return;
                    var r = card.getBoundingClientRect();
                    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
                    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
                    card.classList.add('has-spot');
                }, { passive: true });
            }
        } catch (e) {}

        /* 6. Écran de chargement terminé : on lance les animations d'entrée */
        try {
            var root = document.documentElement;
            var splash = document.getElementById('splash-screen');
            var go = function () { root.classList.add('is-ready'); };
            if (!splash || splash.style.display === 'none') { go(); }
            else {
                var mo = new MutationObserver(function () {
                    if (splash.style.display === 'none' || !splash.isConnected) { mo.disconnect(); go(); }
                });
                mo.observe(splash, { attributes: true, attributeFilter: ['style'] });
            }
        } catch (e) { document.documentElement.classList.add('is-ready'); }

        /* 7. Titre de l'accueil : chaque lettre est animée séparément */
        try {
            var title = document.querySelector('.hero-main-title');
            if (title && !title.classList.contains('split')) {
                var label = title.textContent.replace(/\s+/g, ' ').trim();
                var n = 0;
                var build = function (node) {
                    var frag = document.createDocumentFragment();
                    node.childNodes.forEach(function (child) {
                        if (child.nodeType === 3) {
                            child.textContent.split(/(\s+)/).forEach(function (part) {
                                if (!part) return;
                                if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
                                var w = document.createElement('span'); w.className = 'w';
                                Array.from(part).forEach(function (ch) {
                                    var c = document.createElement('span'); c.className = 'ch'; c.textContent = ch;
                                    c.style.setProperty('--i', n++); w.appendChild(c);
                                });
                                frag.appendChild(w);
                            });
                        } else if (child.nodeType === 1) {
                            var wrap = document.createElement('span'); wrap.className = 'band';
                            wrap.appendChild(build(child)); frag.appendChild(wrap);
                        }
                    });
                    return frag;
                };
                var built = build(title);
                title.textContent = '';
                title.appendChild(built);
                title.setAttribute('aria-label', label);
                title.querySelectorAll('.w').forEach(function (w) { w.setAttribute('aria-hidden', 'true'); });
                title.classList.add('split');
            }
        } catch (e) {}

        /* 8. Navigation : l'indicateur glisse sous l'onglet actif */
        try {
            var nav = document.querySelector('.bottom-nav');
            if (nav) {
                var ind = document.createElement('span');
                ind.className = 'nav-indicator'; ind.setAttribute('aria-hidden', 'true');
                nav.insertBefore(ind, nav.firstChild);
                var place = function () {
                    var a = nav.querySelector('.nav-item.active'); if (!a) return;
                    ind.style.width = a.offsetWidth + 'px'; ind.style.height = a.offsetHeight + 'px';
                    ind.style.transform = 'translate(' + a.offsetLeft + 'px,' + a.offsetTop + 'px)';
                    if (!nav.classList.contains('has-indicator')) nav.classList.add('has-indicator');
                };
                place();
                new MutationObserver(place).observe(nav, { attributes: true, attributeFilter: ['class'], subtree: true });
                window.addEventListener('resize', place);
                if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
                window.addEventListener('load', place);
            }
        } catch (e) {}

        /* 9. Profondeur : le logo suit un peu la souris, les gros boutons sont magnétiques (ordinateur) */
        try {
            if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                var hero = document.querySelector('.hero-section');
                if (hero) {
                    hero.addEventListener('pointermove', function (e) {
                        var r = hero.getBoundingClientRect();
                        hero.style.setProperty('--px', (((e.clientX - r.left) / r.width) - .5).toFixed(3));
                        hero.style.setProperty('--py', (((e.clientY - r.top) / r.height) - .5).toFixed(3));
                    }, { passive: true });
                    hero.addEventListener('pointerleave', function () { hero.style.setProperty('--px', 0); hero.style.setProperty('--py', 0); });
                }
                document.querySelectorAll('.btn-main, .btn-ghost').forEach(function (b) {
                    b.addEventListener('pointermove', function (e) {
                        var r = b.getBoundingClientRect();
                        b.style.translate = ((e.clientX - r.left - r.width / 2) * .18).toFixed(1) + 'px ' + ((e.clientY - r.top - r.height / 2) * .28).toFixed(1) + 'px';
                    });
                    b.addEventListener('pointerleave', function () { b.style.translate = ''; });
                });
            }
        } catch (e) {}
    });
})();
