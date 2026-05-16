// 👥 BASE DU COLLECTIF AVEC CORRECTION DES TITRES ET RÔLES DU DEBUT À MAINTENANT
const members = [
    { name: "DJ PADESCO", id: "padesco", role: "DJ / Humoriste" },
    { name: "JOËL", id: "joel", role: "Management" },
    { name: "LE FONDATEUR", id: "fondateur", role: "Fondateur" },
    { name: "NANA SIKA", id: "nanasika", role: "Comédien & Vidéaste" },
    { name: "GÉDÉON", id: "gedeon", role: "Humoriste" },
    { name: "JEAN", id: "jean", role: "Artiste Chanteur" },
    { name: "THE GACHA", id: "gacha", role: "Artiste Chanteur" },
    { name: "AROLE", id: "arole", role: "Caméraman" },
    { name: "L&H", id: "lh", role: "Caméraman" },
    { name: "DK POPI", id: "dkpopi", role: "Humoriste" },
    { name: "ESTHER", id: "esther", role: "Humoriste" },
    { name: "PRISCA", id: "prisca", role: "Humoriste" },
    { name: "MAKAFUI", id: "makafui", role: "Humoriste" }
];

// ⚡ FONCTIONNALITÉ 3 : TABLEAU DES BLAGUES (JE VEUX RIRE)
const joBandJokes = [
    "DJ PADESCO a dit : 'Si tu danses sur mon mix et que ton forfait internet finit, c'est que la basse était trop lourde !'",
    "Gédéon : 'Le rire guérit tout, mais n'oublie pas de payer ta place sinon c'est le gérant qui va pleurer !'",
    "DK POPI : 'Partout où ça bouge on est là. Même là où ça ne bouge pas, on arrive pour secouer !'",
    "Nana Sika : 'Un bon sketch se filme avec le cœur... et deux caméras bien chargées par Arole !'"
];

// 🎮 FONCTIONNALITÉ 4 : STRUCTURE DES QUESTIONS DU QUIZ
const quizQuestions = [
    {
        q: "En coulisses juste avant de monter sur scène, tu es plutôt en train de :",
        o: [
            "Vérifier les platines et chauffer le public (Option A)",
            "Répéter tes punchlines et chercher le buzz (Option B)",
            "Nettoyer l'objectif de la caméra pour tout capter (Option C)",
            "Faire des vocalises pour chanter le refrain (Option D)"
        ],
        results: ["DJ PADESCO", "DK POPI / GÉDÉON", "NANA SIKA / AROLE", "JEAN / THE GACHA"]
    },
    {
        q: "Ton style d'ambiance préféré pour faire bouger le Togo c'est :",
        o: [
            "Un mix explosif de DJ survolté",
            "Un stand-up piquant qui fait pleurer de rire",
            "Une vidéo humoristique bien montée sur TikTok",
            "Un concert en live avec une voix en or"
        ],
        results: ["DJ PADESCO", "DK POPI / GÉDÉON", "NANA SIKA / AROLE", "JEAN / THE GACHA"]
    }
];

// 🌐 DICTIONNAIRE DE TRADUCTION POUR LE BOUTON DES LANGUES
const translations = {
    fr: {
        "live-text": "EN LIVE", "slogan": "\"Partout où ça bouge, Jo Band est là.\"", "wa-channel": "Chaîne",
        "history-title": "Notre Histoire", "about-text": "Né de la passion commune pour le rire et la scène, JO BAND est un collectif d'artistes togolais unique. Comédiens, chanteurs, DJ et vidéastes : nous fusionnons nos talents pour créer une machine à bonne humeur.",
        "stat-views": "Vues Réseaux", "stat-staff": "Artistes & Staff", "stat-shows": "Shows Réussis",
        "review-title": "Avis de nos Clients", "tab-collectif-title": "Le Collectif", "tab-videos-title": "Le Coin du Rire",
        "joke-btn-text": "JE VEUX RIRE MAINTENANT !", "yt-feed-title": "Nos Dernières Vidéos", "subscribe-prompt": "Abonne-toi et laisse un max de likes directement ici :",
        "packages-title": "Nos Formules Prestations", "badge-pop": "Populaire", "pack-standard-title": "Formule Standard",
        "pack-standard-desc": "Ambiance explosive pour vos soirées, mariages et anniversaires.", "feat-1": "Show Humour sur scène",
        "feat-2": "Animation DJ par DJ PADESCO", "badge-vip": "Grand Standing", "pack-vip-title": "Formule Premium VIP",
        "pack-vip-desc": "Le show complet clé en main avec couverture média totale.", "feat-3": "Captation vidéo par Arole & L&H",
        "agenda-title": "Fil d'actualité Actuel", "agenda-desc": "Actuellement en tournage de la prochaine saison de vidéos humoristiques. Restez connectés ! Le groupe reste disponible pour toutes vos réservations privées ou publiques sur l'année 2026.",
        "tab-contact-title": "Réserver le Show", "contact-subtitle": "Planifiez votre événement avec l'équipe du JO BAND",
        "btn-submit": "ENVOYER LA DEMANDE", "wa-direct-title": "Contact Rapide WhatsApp", "nav-home": "Accueil",
        "nav-team": "Collectif", "nav-videos": "Vidéos", "nav-contact": "Contact", "share-site": "Partager le site"
    },
    en: {
        "live-text": "LIVE NOW", "slogan": "\"Wherever it moves, Jo Band is there.\"", "wa-channel": "Channel",
        "history-title": "Our Story", "about-text": "Born from a shared passion for laughter and the stage, JO BAND is a unique Togolese artists collective. Comedians, singers, DJs, and videographers: we merge our talents to create a pure good mood machine.",
        "stat-views": "Social Views", "stat-staff": "Artists & Staff", "stat-shows": "Successful Shows",
        "review-title": "Customer Reviews", "tab-collectif-title": "The Collective", "tab-videos-title": "The Comedy Corner",
        "joke-btn-text": "I WANT TO LAUGH NOW !", "yt-feed-title": "Our Latest Videos", "subscribe-prompt": "Subscribe and drop a like right here:",
        "packages-title": "Our Performance Packages", "badge-pop": "Popular", "pack-standard-title": "Standard Package",
        "pack-standard-desc": "Explosive atmosphere for your parties, weddings, and birthdays.", "feat-1": "Comedy Show on stage",
        "feat-2": "DJ Performance by DJ PADESCO", "badge-vip": "Luxury Standing", "pack-vip-title": "Premium VIP Package",
        "pack-vip-desc": "The complete turnkey show with full media coverage.", "feat-3": "Video coverage by Arole & L&H",
        "agenda-title": "Current News Feed", "agenda-desc": "Currently shooting the next season of comedy videos. Stay connected! The group remains available for all your private or public bookings throughout 2026.",
        "tab-contact-title": "Book the Show", "contact-subtitle": "Plan your event with the JO BAND crew",
        "btn-submit": "SEND REQUEST", "wa-direct-title": "Urgent WhatsApp Contact", "nav-home": "Home",
        "nav-team": "Collective", "nav-videos": "Videos", "nav-contact": "Contact", "share-site": "Share Website"
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // 1. GESTION DU SPLASH SCREEN (ÉCRAN DE CHARGEMENT 2 SECONDES)
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if(splash) splash.classList.add('hide');
        // Lancer les compteurs animés à la fin du chargement
        startCounterAnimation();
    }, 2000);

    // 2. SYSTÈME DE NAVIGATION STYLE MOBILE (ONGLETS SANS RECHARGEMENT)
    const navItems = document.querySelectorAll('.nav-item');
    const tabs = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));

            item.classList.add('active');
            const target = item.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 3. AFFICHAGE DYNAMIQUE RIGUREUX DE LA GRILLE DU COLLECTIF (2 PAR 2)
    const grid = document.getElementById('team-grid');
    if (grid) {
        grid.innerHTML = members.map(m => `
            <div class="member-card">
                <img src="logo.jpg/${m.id}.jpg" alt="${m.name}" class="member-img" onerror="this.src='https://via.placeholder.com/150/112240/d4af37?text=JO+BAND'">
                <h3>${m.name}</h3>
                <p>${m.role}</p>
            </div>
        `).join('');
    }

    // 4. ANIMATION DES COMPTEURS DE FORCE (IDÉE 1 DE CLAUDE)
    function startCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 50;
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if(current < target) {
                    counter.innerText = Math.ceil(current);
                    setTimeout(updateCounter, 25);
                } else {
                    counter.innerText = target + (counter.parentElement.firstElementChild.classList.contains('stat-number') && target === 500 || target === 150 ? '+' : '');
                }
            };
            updateCounter();
        });
    }

    // 5. BOUTON INTERACTIF "JE VEUX RIRE" (IDÉE 4 DE CLAUDE)
    const jokeBtn = document.getElementById('joke-btn');
    const jokeDisplay = document.getElementById('joke-display');
    if(jokeBtn && jokeDisplay) {
        jokeBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * joBandJokes.length);
            jokeDisplay.innerText = joBandJokes[randomIndex];
            jokeDisplay.style.display = 'block';
        });
    }

    // 6. LOGIQUE DU MINI-QUIZ INTERACTIF (IDÉE 9 DE CLAUDE)
    let currentQuizIndex = 0;
    let quizScores = { "DJ PADESCO": 0, "DK POPI / GÉDÉON": 0, "NANA SIKA / AROLE": 0, "JEAN / THE GACHA": 0 };

    function loadQuizQuestion() {
        const qArea = document.getElementById('quiz-question-area');
        const oArea = document.getElementById('quiz-options-area');
        if(!qArea || !oArea) return;

        if(currentQuizIndex < quizQuestions.length) {
            let currentQ = quizQuestions[currentQuizIndex];
            qArea.innerHTML = `<p class="quiz-question">${currentQ.q}</p>`;
            oArea.innerHTML = currentQ.o.map((opt, i) => `
                <button class="quiz-opt-btn" data-index="${i}">${opt}</button>
            `).join('');

            document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const optIdx = e.target.getAttribute('data-index');
                    const resTarget = quizQuestions[currentQuizIndex].results[optIdx];
                    quizScores[resTarget]++;
                    currentQuizIndex++;
                    loadQuizQuestion();
                });
            });
        } else {
            // Trouver le score le plus élevé
            let winner = Object.keys(quizScores).reduce((a, b) => quizScores[a] > quizScores[b] ? a : b);
            document.getElementById('quiz-box').classList.add('hide');
            const resArea = document.getElementById('quiz-result-area');
            resArea.innerHTML = `<h4>Résultat : Tu es compatible avec ${winner} !</h4><p>Tu as l'âme artistique du JO BAND ! Partage ton résultat avec tes amis.</p>`;
            resArea.classList.remove('hide');
        }
    }
    loadQuizQuestion();

    // 7. SÉLECTEUR DE THÈME SWITCH (IDÉE 8 DE CLAUDE)
    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('theme-gold-intense');
            const icon = themeToggle.querySelector('i');
            if(document.body.classList.contains('theme-gold-intense')) {
                icon.className = "fa-solid fa-sun";
            } else {
                icon.className = "fa-solid fa-moon";
            }
        });
    }

    // 8. FONCTIONNALITÉ DES BOUTONS DE LANGUES (FR / EN) RÉPARÉE
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const selectedLang = btn.getAttribute('data-lang');

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if(translations[selectedLang][key]) {
                    if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = translations[selectedLang][key];
                    } else {
                        el.innerText = translations[selectedLang][key];
                    }
                }
            });
        });
    });

    // 9. REPARATIONS DES BOUTONS PARTAGER AVEC L'API NATIVE DES TÉLÉPHONES
    const shareTriggers = document.querySelectorAll('.share-action-trigger');
    shareTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'JO BAND Officiel',
                    text: 'Découvrez le site application officiel du JO BAND ! Humour, DJ et Événements au Togo !',
                    url: window.location.href
                }).catch(console.error);
            } else {
                alert("Copie le lien de ton navigateur pour partager l'application JO BAND !");
            }
        });
    });

    // 10. SÉCURISATION DU FORMULAIRE FORMSPREE SANS RECHARGEMENT DE PAGE
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if(form && formStatus) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Bloque le rechargement de la page
            const data = new FormData(form);
            formStatus.className = "form-status-box";
            formStatus.innerText = "Envoi sécurisé en cours...";
            formStatus.classList.remove('hide');

            fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    formStatus.className = "form-status-box success";
                    formStatus.innerText = "✓ Demande envoyée de façon sécurisée ! L'équipe vous contactera.";
                    form.reset();
                } else {
                    formStatus.className = "form-status-box error";
                    formStatus.innerText = "Erreur lors de l'envoi. Veuillez réessayer.";
                }
            }).catch(error => {
                formStatus.className = "form-status-box error";
                formStatus.innerText = "Problème de connexion réseau. Sécurité active.";
            });
        });
    }

    // LECTEUR AUDIO SPEECH SYNTHESIS HISTORIQUE MAINTENU
    const synth = window.speechSynthesis;
    const aboutTextEl = document.getElementById('about-text');
    if (aboutTextEl && document.getElementById('btn-play')) {
        document.getElementById('btn-play').onclick = () => { 
            synth.cancel(); 
            let msg = new SpeechSynthesisUtterance(aboutTextEl.innerText);
            msg.lang = document.querySelector('.lang-btn.active').getAttribute('data-lang') === 'en' ? 'en-US' : 'fr-FR';
            synth.speak(msg); 
        };
        document.getElementById('btn-pause').onclick = () => { synth.pause(); };
        document.getElementById('btn-stop').onclick = () => { synth.cancel(); };
    }
});
