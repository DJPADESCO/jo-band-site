// DONNÉES OFFICIELLES DU COLLECTIF JO BAND
const members = [
    { name: "DJ PADESCO", role: "Humoriste / Management / DJ", icon: "fa-headphones" },
    { name: "JOËL", role: "Adjoint / Coordination", icon: "fa-user-check" },
    { name: "LE FONDATEUR", role: "L'Inspiration", icon: "fa-crown" },
    { name: "NANA SIKA", role: "Humoriste & Vidéaste", icon: "fa-video" },
    { name: "JEAN", role: "Humoriste & Chanteur", icon: "fa-microphone" },
    { name: "THE GACHA", role: "Humoriste & Chanteur", icon: "fa-music" },
    { name: "AROLE", role: "Caméraman Pro", icon: "fa-camera" },
    { name: "L&H", role: "Caméraman Pro", icon: "fa-film" },
    { name: "CLAUDE", role: "Humoriste", icon: "fa-face-laugh-squint" },
    { name: "GÉDÉON", role: "Humoriste & Danseur", icon: "fa-bolt" },
    { name: "ESTHER", role: "Humoriste", icon: "fa-face-grin-stars" },
    { name: "PRISCA", role: "Humoriste", icon: "fa-face-smile-wink" },
    { name: "MAKAFUI", role: "Humoriste", icon: "fa-star" }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Génération des membres
    const grid = document.getElementById('team-grid');
    grid.innerHTML = members.map(m => `
        <div class="member-card">
            <i class="fa-solid ${m.icon}"></i>
            <h3>${m.name}</h3>
            <p>${m.role}</p>
        </div>
    `).join('');

    // 2. Gestion du Preloader
    setTimeout(() => {
        const loader = document.getElementById('preloader');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 2000);

    // 3. Lecteur Audio (Histoire)
    const synth = window.speechSynthesis;
    const storyText = document.getElementById('about-text').innerText;
    let speech = new SpeechSynthesisUtterance(storyText);
    speech.lang = 'fr-FR';
    speech.rate = 0.9;

    document.getElementById('btn-play').onclick = () => {
        if(synth.paused) synth.resume();
        else { synth.cancel(); synth.speak(speech); }
    };
    document.getElementById('btn-pause').onclick = () => synth.pause();
    document.getElementById('btn-stop').onclick = () => synth.cancel();

    // 4. Animations au défilement (Reveal)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(r => observer.observe(r));

    // 5. Partage WhatsApp
    document.getElementById('share-btn').onclick = () => {
        const url = window.location.href;
        window.open(`https://api.whatsapp.com/send?text=Découvre le site officiel du JO BAND : ${url}`, '_blank');
    };
});
