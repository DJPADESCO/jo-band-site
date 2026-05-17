'use strict';

const members = [
  { id: 'padesco', name: 'DJ PADESCO', role: 'DJ / Humoriste / Videaste' },
  { id: 'joel', name: 'JOEL', role: 'Management' },
  { id: 'fondateur', name: 'LE FONDATEUR', role: 'Fondateur' },
  { id: 'nanasika', name: 'NANA SIKA', role: 'Humoriste & Videaste' },
  { id: 'gedeon', name: 'GEDEON', role: 'Humoriste & Danseur' },
  { id: 'jean', name: 'JEAN', role: 'Humoriste / Artiste Chanteur' },
  { id: 'gacha', name: 'THE GACHA', role: 'Humoriste / Artiste Chanteur' },
  { id: 'arole', name: 'AROLE', role: 'Cameraman' },
  { id: 'lh', name: 'L&H', role: 'Cameraman' },
  { id: 'dkpopi', name: 'DK POPI', role: 'Humoriste' },
  { id: 'esther', name: 'ESTHER', role: 'Humoriste' },
  { id: 'prisca', name: 'PRISCA', role: 'Humoriste' },
  { id: 'makafui', name: 'MAKAFUI', role: 'Humoriste' }
];

const translations = {
  fr: {
    splashSubtitle: 'Chargement du collectif',
    brandTitle: 'JO BAND',
    brandTag: 'Partout ou ca bouge, Jo Band est la.',
    liveBadge: 'EN LIVE',
    share: 'Partager',
    navHome: 'Accueil',
    navMembers: 'Collectif',
    navVideos: 'Videos',
    navContact: 'Contact & Reservation',
    heroEyebrow: 'Collectif artistique du Togo',
    heroTitle: 'Humour, musique, show et energie sur une seule scene.',
    heroText: 'JO BAND rassemble des artistes, humoristes, videastes et musiciens pour des evenements vivants, propres et memorables.',
    whatsappButton: 'Reserver sur WhatsApp',
    installButton: "Installer l'application",
    installHint: "L'installation s'affiche quand Chrome la propose.",
    statViews: 'Vues',
    statArtists: 'Artistes',
    statShows: 'Shows',
    whyTitle: 'Pourquoi choisir JO BAND',
    why1: 'Duo scene et platines : DJ PADESCO pour le show, DJ ZEKA pour les platines.',
    why2: 'Collectif polyvalent pour humour, musique, animation et visuels propres.',
    why3: 'Organisation serieuse avec reservation directe via la ligne management.',
    ttsTitle: 'Lecture vocale',
    ttsText: 'Ecoute la description du collectif avec les boutons ci-dessous.',
    play: 'Play',
    pause: 'Pause',
    stop: 'Stop',
    membersTitle: 'Collectif JO BAND',
    membersText: 'Les 13 membres sont generes automatiquement depuis le code.',
    backstageTitle: 'Coulisses & Evenements',
    backstageText: 'Une selection de moments de tournage, scenes, lives et spectacles.',
    back1: 'Preparation plateau',
    back2: 'Arrivee des artistes',
    back3: 'Scene et public',
    back4: 'Ambiance coulisse',
    videosTitle: 'Videos JO BAND',
    videosText: 'La playlist YouTube enchaine les publications automatiquement.',
    tiktokText: 'TikTok bloque les embeds, donc le bouton ouvre le profil officiel.',
    contactTitle: 'Contact & Reservation',
    contactText: 'Remplis le formulaire ci-dessous pour une reponse rapide du management.',
    contactLines: 'Lignes directes',
    contactNote: 'Les prix se negocient directement avec le client.',
    nameLabel: 'Nom',
    phoneLabel: 'Telephone',
    eventLabel: 'Type evenement',
    chooseOption: 'Choisir',
    eventWedding: 'Mariage',
    eventBirthday: 'Anniversaire',
    eventConcert: 'Concert',
    eventChurch: 'Eglise / Culte',
    eventCorporate: 'Entreprise',
    eventOther: 'Autre',
    dateLabel: 'Date',
    placeLabel: 'Lieu',
    messageLabel: 'Message',
    sendButton: 'Envoyer la reservation'
  },
  en: {
    splashSubtitle: 'Loading the collective',
    brandTitle: 'JO BAND',
    brandTag: 'Wherever there is movement, Jo Band is there.',
    liveBadge: 'LIVE',
    share: 'Share',
    navHome: 'Home',
    navMembers: 'Collective',
    navVideos: 'Videos',
    navContact: 'Contact & Booking',
    heroEyebrow: 'Artistic collective from Togo',
    heroTitle: 'Comedy, music, show and energy on one stage.',
    heroText: 'JO BAND brings together artists, comedians, videographers and musicians for lively, clean and memorable events.',
    whatsappButton: 'Book on WhatsApp',
    installButton: 'Install app',
    installHint: 'The install prompt appears when Chrome offers it.',
    statViews: 'Views',
    statArtists: 'Artists',
    statShows: 'Shows',
    whyTitle: 'Why choose JO BAND',
    why1: 'Stage and decks duo: DJ PADESCO for the show, DJ ZEKA on the decks.',
    why2: 'A versatile team for comedy, music, hosting and clean visuals.',
    why3: 'Serious organization with direct booking through management.',
    ttsTitle: 'Voice reading',
    ttsText: 'Listen to the collective description with the buttons below.',
    play: 'Play',
    pause: 'Pause',
    stop: 'Stop',
    membersTitle: 'JO BAND Collective',
    membersText: 'The 13 members are generated automatically from the code.',
    backstageTitle: 'Backstage & Events',
    backstageText: 'A selection of shooting moments, stages, live sessions and shows.',
    back1: 'Stage preparation',
    back2: 'Artists arriving',
    back3: 'Stage and audience',
    back4: 'Backstage mood',
    videosTitle: 'JO BAND Videos',
    videosText: 'The YouTube playlist automatically chains uploads.',
    tiktokText: 'TikTok blocks embeds, so the button opens the official profile.',
    contactTitle: 'Contact & Booking',
    contactText: 'Fill out the form below for a quick management response.',
    contactLines: 'Direct lines',
    contactNote: 'Prices are negotiated directly with the client.',
    nameLabel: 'Name',
    phoneLabel: 'Phone',
    eventLabel: 'Event type',
    chooseOption: 'Choose',
    eventWedding: 'Wedding',
    eventBirthday: 'Birthday',
    eventConcert: 'Concert',
    eventChurch: 'Church / Worship',
    eventCorporate: 'Corporate',
    eventOther: 'Other',
    dateLabel: 'Date',
    placeLabel: 'Place',
    messageLabel: 'Message',
    sendButton: 'Send booking'
  }
};

const punchlines = {
  fr: [
    'Lundi: JO BAND lance la semaine avec du style et du son propre.',
    'Mardi: humour, rythme et presence, le trio gagnant est en place.',
    'Mercredi: quand la scene s’allume, JO BAND fait monter la temperature.',
    'Jeudi: une reservation serieuse commence toujours par un bon contact.',
    'Vendredi: la soiree devient forte quand JO BAND entre en mouvement.',
    'Samedi: live, show et ambiance, le public garde le sourire.',
    'Dimanche: le collectif se repose, mais la marque reste vivante.'
  ],
  en: [
    'Monday: JO BAND opens the week with style and clean sound.',
    'Tuesday: comedy, rhythm and presence, the winning trio is ready.',
    'Wednesday: when the stage lights up, JO BAND raises the heat.',
    'Thursday: serious booking always starts with the right contact.',
    'Friday: the night gets stronger when JO BAND takes over.',
    'Saturday: live, show and energy keep the crowd smiling.',
    'Sunday: the team rests, but the brand stays alive.'
  ]
};

const groupDescription = {
  fr: 'JO BAND rassemble des artistes, humoristes, videastes et musiciens pour des evenements vivants, propres et memorables.',
  en: 'JO BAND brings together artists, comedians, videographers and musicians for lively, clean and memorable events.'
};

const state = {
  lang: 'fr',
  theme: 'dark',
  installPrompt: null,
  speech: null,
  speechPaused: false
};

const splash = document.getElementById('splash');
const tabs = Array.from(document.querySelectorAll('.tab-link'));
const panels = Array.from(document.querySelectorAll('.tab-panel'));
const memberGrid = document.getElementById('memberGrid');
const modal = document.getElementById('memberModal');
const modalName = document.getElementById('modalName');
const modalRole = document.getElementById('modalRole');
const modalPortrait = document.getElementById('modalPortrait');
const closeModalBtn = document.getElementById('closeModal');
const form = document.getElementById('reservationForm');
const formStatus = document.getElementById('formStatus');
const installBtn = document.getElementById('installBtn');
const installStatus = document.getElementById('installStatus');
const languageToggle = document.getElementById('languageToggle');
const themeToggle = document.getElementById('themeToggle');
const shareBtn = document.getElementById('shareBtn');
const whatsappButton = document.getElementById('whatsappButton');
const dailyPunchline = document.getElementById('dailyPunchline');
const groupDescriptionNode = document.getElementById('groupDescription');
const ttsPlay = document.getElementById('ttsPlay');
const ttsPause = document.getElementById('ttsPause');
const ttsStop = document.getElementById('ttsStop');

function encodeMessage(text) {
  return encodeURIComponent(text);
}

function getWhatsAppUrl(lang) {
  const message = lang === 'en'
    ? 'Hello JO BAND, I would like to book the collective for my event. Please confirm availability and booking conditions.'
    : 'Bonjour JO BAND, je souhaite reserver le collectif pour mon evenement. Merci de confirmer la disponibilite et les conditions de reservation.';
  return `https://wa.me/22870002539?text=${encodeMessage(message)}`;
}

function setLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  document.body.setAttribute('data-lang', lang);
  const map = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    const value = map[key];
    if (typeof value === 'string') {
      node.textContent = value;
    }
  });
  whatsappButton.href = getWhatsAppUrl(lang);
  groupDescriptionNode.textContent = groupDescription[lang];
  languageToggle.textContent = lang === 'fr' ? 'FR / EN' : 'EN / FR';
  renderPunchline();
  updateTTSButtonState();
}

function setTheme(theme) {
  state.theme = theme;
  document.body.classList.toggle('theme-gold-intense', theme === 'gold');
  themeToggle.textContent = theme === 'gold' ? 'Dark' : 'Palette';
}

function switchTab(tabId) {
  tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.tab === tabId));
  panels.forEach((panel) => panel.classList.toggle('active', panel.id === tabId));
}

function initialsFromName(name) {
  const letters = name.replace(/[^A-ZÀ-ÿ& ]/gi, ' ').trim().split(/\s+/).filter(Boolean);
  if (letters.length === 0) {
    return 'JB';
  }
  if (letters.length === 1) {
    return letters[0].slice(0, 2).toUpperCase();
  }
  return `${letters[0][0]}${letters[letters.length - 1][0]}`.toUpperCase();
}

function renderMembers() {
  memberGrid.innerHTML = '';
  members.forEach((member) => {
    const card = document.createElement('article');
    card.className = 'member-card';

    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', member.name);

    const media = document.createElement('div');
    media.className = 'member-media';

    const img = document.createElement('img');
    img.src = `images/${member.id}.jpg`;
    img.alt = member.name;
    img.loading = 'lazy';

    const fallback = document.createElement('div');
    fallback.className = 'member-fallback';
    fallback.textContent = initialsFromName(member.name);

    img.addEventListener('load', () => {
      card.classList.add('has-image');
    });

    img.addEventListener('error', () => {
      card.classList.add('is-broken');
      img.remove();
    });

    media.appendChild(img);
    media.appendChild(fallback);

    const name = document.createElement('h3');
    name.className = 'member-name';
    name.textContent = member.name;

    const role = document.createElement('p');
    role.className = 'member-role';
    role.textContent = member.role;

    button.appendChild(media);
    button.appendChild(name);
    button.appendChild(role);
    card.appendChild(button);

    button.addEventListener('click', () => openMemberModal(member, img.src, initialsFromName(member.name)));
    memberGrid.appendChild(card);
  });
}

function openMemberModal(member, imageUrl, initials) {
  modalName.textContent = member.name;
  modalRole.textContent = member.role;
  modalPortrait.innerHTML = '';
  const portraitImg = document.createElement('img');
  portraitImg.alt = member.name;
  portraitImg.src = imageUrl;
  portraitImg.addEventListener('error', () => {
    portraitImg.remove();
    modalPortrait.textContent = initials;
  });
  modalPortrait.appendChild(portraitImg);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeMemberModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function renderPunchline() {
  const dayIndex = new Date().getDay();
  dailyPunchline.textContent = punchlines[state.lang][dayIndex];
}

function animateStat(node) {
  const target = Number(node.dataset.target || '0');
  const suffix = node.dataset.suffix || '';
  const start = performance.now();
  const duration = 1200;

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    node.textContent = `${value}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function animateStats() {
  document.querySelectorAll('.stat-value').forEach(animateStat);
}

function speakText() {
  if (!('speechSynthesis' in window)) {
    installStatus.textContent = state.lang === 'fr'
      ? 'La lecture vocale nest pas disponible sur ce navigateur.'
      : 'Voice reading is not available in this browser.';
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(groupDescription[state.lang]);
  utterance.lang = state.lang === 'fr' ? 'fr-FR' : 'en-US';
  utterance.rate = 0.98;
  utterance.pitch = 1;
  utterance.onend = () => {
    state.speechPaused = false;
    updateTTSButtonState();
  };
  state.speech = utterance;
  state.speechPaused = false;
  window.speechSynthesis.speak(utterance);
  updateTTSButtonState();
}

function pauseSpeech() {
  if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
    window.speechSynthesis.pause();
    state.speechPaused = true;
    updateTTSButtonState();
  }
}

function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  state.speech = null;
  state.speechPaused = false;
  updateTTSButtonState();
}

function updateTTSButtonState() {
  const speaking = 'speechSynthesis' in window && window.speechSynthesis.speaking;
  ttsPlay.textContent = state.lang === 'fr' ? 'Play' : 'Play';
  ttsPause.textContent = state.lang === 'fr' ? 'Pause' : 'Pause';
  ttsStop.textContent = state.lang === 'fr' ? 'Stop' : 'Stop';
  ttsPause.disabled = !speaking;
  ttsStop.disabled = !speaking && !state.speechPaused;
}

async function handleShare() {
  const shareData = {
    title: 'JO BAND Officiel',
    text: 'JO BAND Officiel - collectif artistique du Togo.',
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    shareBtn.textContent = state.lang === 'fr' ? 'Lien copié' : 'Link copied';
    setTimeout(() => setLanguage(state.lang), 1200);
  } catch (error) {
    formStatus.textContent = state.lang === 'fr' ? 'Partage indisponible.' : 'Sharing is unavailable.';
  }
}

function setupInstallButton() {
  if (!state.installPrompt) {
    installBtn.disabled = false;
  }
  installBtn.addEventListener('click', async () => {
    if (!state.installPrompt) {
      installStatus.textContent = state.lang === 'fr'
        ? "L'installation depend du navigateur. Essayez depuis Chrome."
        : 'Installation depends on the browser. Try Chrome.';
      return;
    }
    state.installPrompt.prompt();
    const choice = await state.installPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      installStatus.textContent = state.lang === 'fr' ? 'Application installee.' : 'Application installed.';
    } else {
      installStatus.textContent = state.lang === 'fr' ? 'Installation annulee.' : 'Installation dismissed.';
    }
    state.installPrompt = null;
  });
}

function setupTabs() {
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });
}

function setupModal() {
  closeModalBtn.addEventListener('click', closeMemberModal);
  modal.addEventListener('click', (event) => {
    if (event.target && event.target.dataset && event.target.dataset.close === 'true') {
      closeMemberModal();
    }
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMemberModal();
    }
  });
}

function setupForm() {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    formStatus.textContent = state.lang === 'fr' ? 'Envoi en cours...' : 'Sending...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      form.reset();
      formStatus.textContent = state.lang === 'fr'
        ? 'Reservation envoyee. Le management va repondre rapidement.'
        : 'Booking sent. Management will reply soon.';
    } catch (error) {
      formStatus.textContent = state.lang === 'fr'
        ? 'Erreur denvoi. Verifie ta connexion puis recommence.'
        : 'Send error. Check your connection and try again.';
    }
  });
}

function setupPWA() {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    state.installPrompt = event;
    installStatus.textContent = state.lang === 'fr'
      ? "L'installation est disponible."
      : 'Installation is available.';
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        await navigator.serviceWorker.register('sw.js');
      } catch (error) {
        installStatus.textContent = state.lang === 'fr'
          ? 'Service Worker indisponible.'
          : 'Service Worker unavailable.';
      }
    });
  }
}

function setupEvents() {
  languageToggle.addEventListener('click', () => {
    setLanguage(state.lang === 'fr' ? 'en' : 'fr');
  });

  themeToggle.addEventListener('click', () => {
    setTheme(state.theme === 'dark' ? 'gold' : 'dark');
  });

  shareBtn.addEventListener('click', handleShare);
  ttsPlay.addEventListener('click', speakText);
  ttsPause.addEventListener('click', pauseSpeech);
  ttsStop.addEventListener('click', stopSpeech);
  window.addEventListener('focus', updateTTSButtonState);
}

function hideSplash() {
  if (!splash) {
    return;
  }
  splash.classList.add('hide');
  window.setTimeout(() => {
    splash.remove();
  }, 450);
}

function init() {
  setupTabs();
  setupModal();
  setupForm();
  setupPWA();
  setupEvents();
  setupInstallButton();
  renderMembers();
  animateStats();
  setLanguage('fr');
  setTheme('dark');
  hideSplash();
  window.setTimeout(() => {
    hideSplash();
  }, 1500);
}

document.addEventListener('DOMContentLoaded', init);