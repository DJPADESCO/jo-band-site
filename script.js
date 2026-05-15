// ===============================
// JO BAND - TEAM DATABASE
// ===============================

const performers = [
  {
    name: "DJ PADESCO",
    role: "Comédien, vidéaste & DJ",
    tag: "POLYVALENT",
    icon: "fa-headphones",
    special: true
  },
  {
    name: "NANA SIKA",
    role: "Comédien & vidéaste",
    tag: "ARTISTE",
    icon: "fa-video",
    special: false
  },
  {
    name: "CLAUDE",
    role: "Humoriste",
    tag: "HUMOUR",
    icon: "fa-face-laugh",
    special: false
  },
  {
    name: "GÉDÉON",
    role: "Humoriste & danseur",
    tag: "DANSE / HUMOUR",
    icon: "fa-person-running",
    special: false
  },
  {
    name: "ESTHER",
    role: "Humoriste",
    tag: "HUMOUR",
    icon: "fa-masks-theater",
    special: false
  },
  {
    name: "PRISCA",
    role: "Humoriste",
    tag: "HUMOUR",
    icon: "fa-face-smile",
    special: false
  },
  {
    name: "MAKAFUI",
    role: "Artiste",
    tag: "ARTISTE",
    icon: "fa-star",
    special: false
  },
  {
    name: "JEAN",
    role: "Humoriste & artiste chanteur",
    tag: "CHANT",
    icon: "fa-microphone-lines",
    special: false
  },
  {
    name: "THE GACHA",
    role: "Humoriste & artiste chanteur",
    tag: "CHANT",
    icon: "fa-music",
    special: false
  }
];

const staff = [
  {
    name: "JOËL",
    role: "Superviseur",
    tag: "STAFF",
    icon: "fa-user-tie",
    special: false
  },
  {
    name: "DG À CONFIRMER",
    role: "Fondateur",
    tag: "DIRECTION",
    icon: "fa-crown",
    special: false
  }
];

const cameraTeam = [
  {
    name: "AROLE & L&H",
    role: "Équipe caméra / visuel",
    tag: "VISUEL",
    icon: "fa-camera-retro",
    special: false
  }
];

// ===============================
// CREER UNE CARTE MEMBRE
// ===============================

function createMemberCard(member) {
  return `
    <div class="member-card ${member.special ? "padesco-special" : ""}">
      <div class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5 text-orange-500">
        <i class="fa-solid ${member.icon} text-xl"></i>
      </div>

      <h4 class="font-black text-lg uppercase tracking-tight mb-2">
        ${member.name}
      </h4>

      <p class="text-white/50 text-sm mb-4">
        ${member.role}
      </p>

      <span class="inline-block px-4 py-2 rounded-full bg-white/10 text-[11px] font-bold text-white/70">
        ${member.tag}
      </span>
    </div>
  `;
}

// ===============================
// AFFICHER L'EQUIPE
// ===============================

function renderTeam() {
  const container = document.getElementById("team-container");
  if (!container) return;

  container.innerHTML = `
    <div class="team-category">
      <h3 class="team-category-title">Artistes / Humoristes</h3>
      <div class="team-grid">
        ${performers.map(createMemberCard).join("")}
      </div>
    </div>

    <div class="team-category">
      <h3 class="team-category-title">Direction / Supervision</h3>
      <div class="team-grid">
        ${staff.map(createMemberCard).join("")}
      </div>
    </div>

    <div class="team-category">
      <h3 class="team-category-title">Caméra / Visuel</h3>
      <div class="team-grid">
        ${cameraTeam.map(createMemberCard).join("")}
      </div>
    </div>
  `;
}

// ===============================
// DEMARRAGE
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  renderTeam();
});