// Base de données des membres JO BAND
const team = [
    {
        name: "DJ PADESCO",
        role: "Comédien, Vidéaste & DJ",
        tag: "POLYVALENT",
        icon: "fa-headphones",
        special: true
    },
    {
        name: "NANA SIKA",
        role: "Comédien & Vidéaste",
        tag: "ARTISTE",
        icon: "fa-video",
        special: false
    },
    {
        name: "AROLE",
        role: "Caméraman",
        tag: "VISUEL",
        icon: "fa-camera",
        special: false
    },
    {
        name: "L&H",
        role: "Caméraman",
        tag: "VISUEL",
        icon: "fa-video-slash",
        special: false
    },
    {
        name: "JOËL",
        role: "Superviseur",
        tag: "STAFF",
        icon: "fa-star",
        special: false
    },
    {
        name: "LE DG",
        role: "Fondateur",
        tag: "DIRECTION",
        icon: "fa-crown",
        special: false
    }
];

// Fonction pour afficher l'équipe
function renderTeam() {
    const container = document.getElementById('team-container');
    
    team.forEach(member => {
        const card = document.createElement('div');
        card.className = `member-card ${member.special ? 'padesco-special' : ''}`;
        
        card.innerHTML = `
            <div class="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-orange-500">
                <i class="fa-solid ${member.icon} text-xl"></i>
            </div>
            <h4 class="font-black text-lg mb-1 tracking-tight uppercase">${member.name}</h4>
            <p class="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">${member.role}</p>
            <span class="text-[8px] bg-white/10 px-3 py-1 rounded-full font-black text-white/60">
                ${member.tag}
            </span>
        `;
        container.appendChild(card);
    });
}

// Lancement au chargement de la page
document.addEventListener('DOMContentLoaded', renderTeam);