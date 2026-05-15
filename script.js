// ===============================
// JO BAND - TEAM DATABASE
// ===============================

const performers = [
    { name: "DJ PADESCO", role: "Comédien, vidéaste & DJ", tag: "POLYVALENT", icon: "fa-headphones", special: true },
    { name: "NANA SIKA", role: "Comédienne & vidéaste", tag: "ARTISTE", icon: "fa-video", special: false },
    { name: "CLAUDE", role: "Humoriste", tag: "HUMOUR", icon: "fa-face-laugh", special: false },
    { name: "GÉDÉON", role: "Humoriste & danseur", tag: "DANSE / HUMOUR", icon: "fa-person-running", special: false },
    { name: "ESTHER", role: "Humoriste", tag: "HUMOUR", icon: "fa-masks-theater", special: false },
    { name: "PRISCA", role: "Humoriste", tag: "HUMOUR", icon: "fa-face-smile", special: false },
    { name: "MAKAFUI", role: "Artiste", tag: "ARTISTE", icon: "fa-star", special: false },
    { name: "JEAN", role: "Humoriste & artiste chanteur", tag: "CHANT", icon: "fa-microphone-lines", special: false },
    { name: "THE GACHA", role: "Humoriste & artiste chanteur", tag: "CHANT", icon: "fa-music", special: false }
];

const staff = [
    { name: "JOËL", role: "Superviseur", tag: "STAFF", icon: "fa-user-tie", special: false },
    { name: "DG À CONFIRMER", role: "Fondateur", tag: "DIRECTION", icon: "fa-crown", special: false }
];

const cameraTeam = [
    { name: "AROLE & L&H", role: "Équipe caméra / visuel", tag: "VISUEL", icon: "fa-camera-retro", special: false }
];

// ===============================
// CREER UNE CARTE MEMBRE (Template corrigé)
// ===============================

function createMemberCard(member) {
    const specialClass = member.special ? "padesco-special" : "";
    
    // Utilisation des backticks (`) pour une injection HTML propre
    return `
        <div class="member-card ${specialClass}">
            <div class="card-icon">
                <i class="fa-solid ${member.icon}"></i>
            </div>
            <h4 class="card-name">${member.name}</h4>
            <p class="card-role">${member.role}</p>
            <span class="card-tag">${member.tag}</span>
        </div>
    `;
}

// ===============================
// AFFICHER L'EQUIPE (avec filtrage)
// ===============================

function renderTeam(searchTerm = "") {
    const container = document.getElementById("team-container");
    if (!container) return;

    // Fonction d'aide pour filtrer un tableau selon la recherche
    const filterData = (teamArray) => {
        return teamArray.filter(member => {
            const term = searchTerm.toLowerCase();
            return member.name.toLowerCase().includes(term) || 
                   member.role.toLowerCase().includes(term) || 
                   member.tag.toLowerCase().includes(term);
        });
    };

    const filteredPerformers = filterData(performers);
    const filteredStaff = filterData(staff);
    const filteredCamera = filterData(cameraTeam);

    let htmlOutput = "";

    // On n'affiche la catégorie que si elle contient des membres (utile lors d'une recherche)
    if (filteredPerformers.length > 0) {
        htmlOutput += `
            <div class="team-category">
                <h3 class="team-category-title">Artistes / Humoristes</h3>
                <div class="team-grid">
                    ${filteredPerformers.map(createMemberCard).join("")}
                </div>
            </div>
        `;
    }

    if (filteredStaff.length > 0) {
        htmlOutput += `
            <div class="team-category">
                <h3 class="team-category-title">Direction / Supervision</h3>
                <div class="team-grid">
                    ${filteredStaff.map(createMemberCard).join("")}
                </div>
            </div>
        `;
    }

    if (filteredCamera.length > 0) {
        htmlOutput += `
            <div class="team-category">
                <h3 class="team-category-title">Caméra / Visuel</h3>
                <div class="team-grid">
                    ${filteredCamera.map(createMemberCard).join("")}
                </div>
            </div>
        `;
    }

    // Message si aucun résultat n'est trouvé
    if (htmlOutput === "") {
        htmlOutput = `<p style="text-align:center; color: rgba(255,255,255,0.5);">Aucun membre ne correspond à votre recherche.</p>`;
    }

    container.innerHTML = htmlOutput;
}

// ===============================
// DEMARRAGE ET EVENEMENTS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    // Affichage initial
    renderTeam();

    // Ajout de la fonctionnalité de recherche en temps réel
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            renderTeam(e.target.value);
        });
    }
});
