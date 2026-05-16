// Liste officielle mise à jour du JO BAND
const members = [
    { name: "DJ PADESCO", id: "padesco", role: "DJ / Humoriste" },
    { name: "JOËL", id: "joel", role: "Management" },
    { name: "LE FONDATEUR", id: "fondateur", role: "Fondateur" },
    { name: "NANA SIKA", id: "nanasika", role: "Comédie & Vidéo" },
    { name: "GÉDÉON", id: "gedeon", role: "Humour" },
    { name: "JEAN", id: "jean", role: "Chant" },
    { name: "THE GACHA", id: "gacha", role: "Chant" },
    { name: "AROLE", id: "arole", role: "Caméraman" },
    { name: "L&H", id: "lh", role: "Caméraman" },
    { name: "DK POPI", id: "dkpopi", role: "Humoriste" }, // Claude est bien devenu DK POPI ici
    { name: "ESTHER", id: "esther", role: "Humoriste" },
    { name: "PRISCA", id: "prisca", role: "Humoriste" },
    { name: "MAKAFUI", id: "makafui", role: "Humoriste" }
];

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GESTION DU SYSTEME D'ONGLETS (NAVIGATION STYLE APPLI)
    const navItems = document.querySelectorAll('.nav-item');
    const tabs = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Désactiver l'ancien onglet actif
            navItems.forEach(nav => nav.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));

            // Activer le nouveau cliqué
            item.classList.add('active');
            const targetTabId = item.getAttribute('data-tab');
            document.getElementById(targetTabId).classList.add('active');

            // Remonter automatiquement en haut de l'écran pour un confort max
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 2. GENERATION DE LA GRILLE DU COLLECTIF (Dans le dossier logo.jpg/)
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

    // 3. LECTEUR AUDIO HISTORIQUE (TEXT-TO-SPEECH)
    const synth = window.speechSynthesis;
    const aboutTextEl = document.getElementById('about-text');
    
    if (aboutTextEl && document.getElementById('btn-play')) {
        const text = aboutTextEl.innerText;
        let msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'fr-FR';

        document.getElementById('btn-play').onclick = () => { synth.cancel(); synth.speak(msg); };
        document.getElementById('btn-pause').onclick = () => { synth.pause(); };
        document.getElementById('btn-stop').onclick = () => { synth.cancel(); };
    }
});
