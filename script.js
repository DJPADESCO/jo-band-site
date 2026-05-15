// ==========================================
// DONNÉES DU SITE
// ==========================================
const performers = [
    { name: "DJ PADESCO", role: "Comédien, vidéaste & DJ", tag: "MANAGEMENT / SHOW", icon: "fa-headphones" },
    { name: "NANA SIKA", role: "Comédienne & vidéaste", tag: "ARTISTE", icon: "fa-video" },
    { name: "CLAUDE", role: "Humoriste", tag: "HUMOUR", icon: "fa-face-laugh" },
    { name: "GÉDÉON", role: "Humoriste & danseur", tag: "DANSE / HUMOUR", icon: "fa-person-running" },
    { name: "ESTHER", role: "Humoriste", tag: "HUMOUR", icon: "fa-masks-theater" },
    { name: "PRISCA", role: "Humoriste", tag: "HUMOUR", icon: "fa-face-smile" },
    { name: "MAKAFUI", role: "Humoriste", tag: "HUMOUR", icon: "fa-star" },
    { name: "JEAN", role: "Artiste chanteur", tag: "CHANT", icon: "fa-microphone-lines" },
    { name: "THE GACHA", role: "Artiste chanteur", tag: "CHANT", icon: "fa-music" }
];

const upcomingEvents = [
    { title: "Tournée JO BAND 2026", loc: "Lomé & Environs", date: "En préparation" }
];

// ==========================================
// TRADUCTIONS
// ==========================================
const translations = {
    fr: {
        "nav-about": "Histoire", "nav-services": "Prestations", "nav-team": "L'Équipe", "nav-contact": "Contact",
        "hero-title": "JO BAND",
        "hero-subtitle": "Le collectif d'artistes qui donne de la joie à vos événements.",
        "about-title": "Notre Histoire",
        "about-text": "Né de la passion commune pour le rire et la scène, JO BAND est un collectif d'artistes togolais unique en son genre. Comédiens, humoristes, danseurs, DJ et vidéastes : nous avons fusionné nos talents pour créer une véritable machine à bonne humeur. Du contenu viral sur vos écrans jusqu'à l'animation explosive de vos plus grands événements, le JO BAND n'a qu'un seul objectif : transformer chaque instant en un souvenir inoubliable.",
        "btn-listen": "Écouter",
        "services-title": "Nos Prestations",
        "service-1-title": "Mariages", "service-1-desc": "Une animation unique et pleine d'humour pour graver votre plus beau jour.",
        "service-2-title": "Concerts & Parties", "service-2-desc": "Un show explosif sur scène mêlant comédie, danse et musique en direct.",
        "service-3-title": "Animations", "service-3-desc": "Festivals, soirées privées, lancements de marques : nous gérons l'ambiance de A à Z.",
        "team-title": "L'Équipe",
        "events-title": "Prochainement",
        "contact-title": "Contact & Réservation"
    },
    en: {
        "nav-about": "Story", "nav-services": "Services", "nav-team": "Team", "nav-contact": "Contact",
        "hero-title": "JO BAND",
        "hero-subtitle": "The artist collective bringing joy to your events.",
        "about-title": "Our Story",
        "about-text": "Born from a shared passion for laughter and the stage, JO BAND is a unique Togolese artist collective. Comedians, dancers, DJs, and videographers: we merged our talents to create a powerhouse of good vibes. From viral digital content to explosive live event entertainment, JO BAND has one single goal: turning every moment into an unforgettable memory.",
        "btn-listen": "Listen",
        "services-title": "Our Services",
        "service-1-title": "Weddings", "service-1-desc": "A unique and humorous entertainment package to make your special day unforgettable.",
        "service-2-title": "Concerts & Parties", "service-2-desc": "An explosive stage show mixing live comedy, dance, and live music.",
        "service-3-title": "Entertainment", "service-3-desc": "Festivals, private events, brand launches: we manage the atmosphere from A to Z.",
        "team-title": "The Team",
        "events-title": "Upcoming",
        "contact-title": "Contact & Booking"
    }
};

let currentLang = 'fr';

// ==========================================
// FONCTIONS DE RENDU (Affichage)
// ==========================================
function renderEvents() {
    const container = document.getElementById('events-container');
    container.innerHTML = upcomingEvents.map(e => `
        <div class="event-item">
            <div>
                <h3>${e.title}</h3>
                <p><i class="fa-solid fa-location-dot"></i> ${e.loc}</p>
            </div>
            <div class="event-date">${e.date}</div>
        </div>
    `).join('');
}

function renderTeam(search = "") {
    const container = document.getElementById('team-container');
    const filtered = performers.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.role.toLowerCase().includes(search.toLowerCase()));
    
    if (filtered.length === 0) {
        container.innerHTML = `<p style="text-align:center; width:100%;">Aucun résultat trouvé.</p>`;
        return;
    }

    container.innerHTML = filtered.map(p => `
        <div class="member-card">
            <i class="fa-solid ${p.icon}"></i>
            <h4>${p.name}</h4>
            <p>${p.role}</p>
            <span class="card-tag">${p.tag}</span>
        </div>
    `).join('');
}

// ==========================================
// GESTION LANGUE & TEXT-TO-SPEECH
// ==========================================
function setLang(lang) {
    currentLang = lang;
    window.speechSynthesis.cancel(); // Coupe la voix si on change de langue

    document.getElementById('btn-fr').classList.toggle('active', lang === 'fr');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');

    document.querySelectorAll('[data-key]').forEach(el => {
        el.innerText = translations[lang][el.getAttribute('data-key')];
    });

    const searchInput = document.getElementById('search-input');
    searchInput.placeholder = lang === 'fr' ? "Rechercher un membre..." : "Search a member...";
    renderTeam(searchInput.value);
}

function lireTexte() {
    // Vérifie si le navigateur supporte la synthèse vocale
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Arrête la lecture précédente
        const texteALire = document.getElementById('about-text').innerText;
        const synthese = new SpeechSynthesisUtterance(texteALire);
        
        // Définir la langue de la voix
        synthese.lang = currentLang === 'fr' ? 'fr-FR' : 'en-US';
        synthese.rate = 0.95; // Vitesse un peu plus posée
        
        window.speechSynthesis.speak(synthese);
    } else {
        alert(currentLang === 'fr' ? "Votre navigateur ne supporte pas la lecture audio." : "Your browser does not support text-to-speech.");
    }
}

// ==========================================
// INITIALISATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    setLang('fr');
    renderEvents();
    
    // Écouteurs d'événements
    document.getElementById('search-input').addEventListener('input', (e) => renderTeam(e.target.value));
    document.getElementById('btn-fr').onclick = () => setLang('fr');
    document.getElementById('btn-en').onclick = () => setLang('en');
    document.getElementById('btn-speak').onclick = lireTexte;
});
