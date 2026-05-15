const members = [
    { name: "DJ PADESCO", id: "padesco", role: "DJ / Humoriste" },
    { name: "JOËL", id: "joel", role: "Management" },
    { name: "LE FONDATEUR", id: "fondateur", role: "Fondateur" },
    { name: "NANA SIKA", id: "nanasika", role: "Comédie" },
    { name: "GÉDÉON", id: "gedeon", role: "Humour" },
    { name: "JEAN", id: "jean", role: "Chant" },
    { name: "THE GACHA", id: "gacha", role: "Chant" },
    { name: "AROLE", id: "arole", role: "Vidéo" },
    { name: "L&H", id: "lh", role: "Production" },
    { name: "CLAUDE", id: "claude", role: "Humoriste" },
    { name: "ESTHER", id: "esther", role: "Humoriste" },
    { name: "PRISCA", id: "prisca", role: "Humoriste" },
    { name: "MAKAFUI", id: "makafui", role: "Humoriste" }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('team-grid');
    grid.innerHTML = members.map(m => `
        <div class="member-card">
            <img src="${m.id}.jpg" alt="${m.name}" class="member-img" onerror="this.src='https://via.placeholder.com/150/112240/d4af37?text=JO+BAND'">
            <h3>${m.name}</h3>
            <p>${m.role}</p>
        </div>
    `).join('');

    const synth = window.speechSynthesis;
    const text = document.getElementById('about-text').innerText;
    let msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'fr-FR';

    document.getElementById('btn-play').onclick = () => { synth.cancel(); synth.speak(msg); };
    document.getElementById('btn-stop').onclick = () => synth.cancel();
});
