// ===============================
// JO BAND - TEAM DATABASE
// ===============================

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
    icon: "fa-video",
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
    name: "DG À CONFIRMER",
    role: "Fondateur",
    tag: "DIRECTION",
    icon: "fa-crown",
    special: false
  },
  {
    name: "CLAUDE",
    role: "Membre du groupe",
    tag: "ARTISTE",
    icon: "fa-microphone",
    special: false
  },
  {
    name: "GÉDÉON",
    role: "Membre du groupe",
    tag: "ARTISTE",
    icon: "fa-masks-theater",
    special: false
  },
  {
    name: "ESTHER",
    role: "Membre du groupe",
    tag: "ARTISTE",
    icon: "fa-star",
    special: false
  },
  {
    name: "JEAN",
    role: "Membre du groupe",
    tag: "ARTISTE",
    icon: "fa-user",
    special: false
  },
  {
    name: "PRISCA",
    role: "Membre du groupe",
    tag: "ARTISTE",
    icon: "fa-user",
    special: false
  },
  {
    name: "MAKAFUI",
    role: "Membre du groupe",
    tag: "ARTISTE",
    icon: "fa-user",
    special: false
  },
  {
    name: "THE GACHA",
    role: "Membre du groupe",
    tag: "ARTISTE",
    icon: "fa-music",
    special: false
  }
];

// ===============================
// AFFICHER L'ÉQUIPE
// ===============================

function renderTeam() {
  const container = document.getElementById("team-container");

  // sécurité
  if (!container) return;

  // évite les doublons
  container.innerHTML = "";

  team.forEach(member => {
    const card = document.createElement("div");

    card.className =
      `member-card ${member.special ? "padesco-special" : ""}`;

    card.innerHTML = `
      <div class="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-orange-500">
        <i class="fa-solid ${member.icon} text-xl"></i>
      </div>

      <h4 class="font-black text-lg mb-2 uppercase tracking-tight">
        ${member.name}
      </h4>

      <p class="text-white/50 text-sm mb-4">
        ${member.role}
      </p>

      <span class="inline-block text-[10px] bg-white/10 px-3 py-2 rounded-full font-bold text-white/70 tracking-wide">
        ${member.tag}
      </span>
    `;

    container.appendChild(card);
  });
}

// ===============================
// LANCEMENT PAGE
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  renderTeam();
});