'use strict';

var deferredPrompt = null;

var membres = [
  { id: 'padesco',   nom: 'DJ PADESCO',   role: 'DJ / Humoriste / Vidéaste' },
  { id: 'joel',      nom: 'JOEL',          role: 'Management' },
  { id: 'fondateur', nom: 'LE FONDATEUR',  role: 'Fondateur' },
  { id: 'nanasika',  nom: 'NANA SIKA',     role: 'Humoriste & Vidéaste' },
  { id: 'gedeon',    nom: 'GEDEON',        role: 'Humoriste & Danseur' },
  { id: 'jean',      nom: 'JEAN',          role: 'Humoriste / Artiste Chanteur' },
  { id: 'gacha',     nom: 'THE GACHA',     role: 'Humoriste / Artiste Chanteur' },
  { id: 'arole',     nom: 'AROLE',         role: 'Cameraman' },
  { id: 'lh',        nom: 'L&H',           role: 'Cameraman' },
  { id: 'dkpopi',    nom: 'DK POPI',       role: 'Humoriste' },
  { id: 'esther',    nom: 'ESTHER',        role: 'Humoriste' },
  { id: 'prisca',    nom: 'PRISCA',        role: 'Humoriste' },
  { id: 'makafui',   nom: 'MAKAFUI',       role: 'Humoriste' }
];

var punchlines = [
  'Le dimanche, on repete pour vous epater toute la semaine.',
  'Le lundi, l\'energie JO BAND relance la semaine.',
  'Le mardi, la creativite est notre moteur.',
  'Le mercredi, on prend la scene d\'assaut.',
  'Le jeudi, le show continue et le talent aussi.',
  'Le vendredi, on chauffe avant le grand soir.',
  'Le samedi, JO BAND met le feu a la scene.'
];

var translations = {
  fr: {
    nav_accueil: 'Accueil',
    nav_membres: 'Collectif',
    nav_videos: 'Videos',
    nav_contact: 'Contact',
    slogan: 'Partout ou ca bouge, Jo Band est la.',
    stat_vues: 'Vues',
    stat_artistes: 'Artistes',
    stat_shows: 'Shows',
    btn_reserver: 'Reserver JO BAND',
    btn_installer: "Installer l'app",
    tts_desc: 'JO BAND est un collectif artistique togolais compose de 13 artistes passionnes : humoristes, chanteurs, danseurs, cameramen et DJ. Avec plus de 500 000 vues et 150 shows, Jo Band illumine chaque scene avec energie et creativite.',
    tts_play: 'Ecouter',
    tts_pause: 'Pause',
    tts_stop: 'Arreter',
    why_title: 'Pourquoi choisir JO BAND ?',
    why1_title: 'Duo DJ exclusif',
    why1_desc: 'DJ PADESCO anime le show humour pendant que DJ ZEKA assure les platines. Deux talents, une seule scene.',
    why2_title: 'Polyvalence totale',
    why2_desc: 'Humour, musique live, danse, video : JO BAND couvre tous les formats de spectacle.',
    why3_title: 'Professionnalisme',
    why3_desc: '13 artistes structures avec un management dedie et plus de 150 shows d\'experience au Togo.',
    membres_title: 'Le Collectif',
    coulisses_title: 'Coulisses & Evenements',
    coulisses_desc: 'Des tournages aux spectacles, vivez nos moments en coulisses.',
    videos_title: 'Nos Videos',
    tiktok_title: 'TikTok JO BAND',
    tiktok_desc: "TikTok ne permet pas l'integration directe. Retrouvez toutes nos videos sur notre profil.",
    tiktok_btn: 'Voir sur TikTok',
    contact_title: 'Contact & Reservation',
    management_label: '(Management)',
    form_success: 'Message envoye ! Nous vous repondrons tres vite.',
    form_error: 'Erreur d\'envoi. Veuillez reessayer ou nous appeler directement.',
    form_nom: 'Votre nom',
    form_tel: 'Telephone',
    form_event: "Type d'evenement",
    form_event_placeholder: 'Choisir un type',
    ev_mariage: 'Mariage',
    ev_anniversaire: 'Anniversaire',
    ev_entreprise: "Soiree d'entreprise",
    ev_festival: 'Festival',
    ev_prive: 'Show prive',
    ev_autre: 'Autre',
    form_date: "Date de l'evenement",
    form_lieu: 'Lieu',
    form_message: 'Message',
    form_envoyer: 'Envoyer la demande'
  },
  en: {
    nav_accueil: 'Home',
    nav_membres: 'Collective',
    nav_videos: 'Videos',
    nav_contact: 'Contact',
    slogan: 'Wherever the party is, Jo Band is there.',
    stat_vues: 'Views',
    stat_artistes: 'Artists',
    stat_shows: 'Shows',
    btn_reserver: 'Book JO BAND',
    btn_installer: 'Install App',
    tts_desc: 'JO BAND is a Togolese artistic collective of 13 passionate artists: comedians, singers, dancers, cameramen and DJs. With over 500,000 views and 150 shows, Jo Band lights up every stage with energy and creativity.',
    tts_play: 'Listen',
    tts_pause: 'Pause',
    tts_stop: 'Stop',
    why_title: 'Why choose JO BAND?',
    why1_title: 'Exclusive DJ Duo',
    why1_desc: 'DJ PADESCO hosts the comedy show while DJ ZEKA handles the decks. Two talents, one stage.',
    why2_title: 'Total versatility',
    why2_desc: 'Comedy, live music, dance, video: JO BAND covers every entertainment format.',
    why3_title: 'Professionalism',
    why3_desc: '13 structured artists with dedicated management and over 150 shows of experience in Togo.',
    membres_title: 'The Collective',
    coulisses_title: 'Behind the Scenes',
    coulisses_desc: 'From shoots to shows, live our backstage moments.',
    videos_title: 'Our Videos',
    tiktok_title: 'JO BAND on TikTok',
    tiktok_desc: 'TikTok does not allow direct embedding. Find all our videos on our profile.',
    tiktok_btn: 'View on TikTok',
    contact_title: 'Contact & Booking',
    management_label: '(Management)',
    form_success: 'Message sent! We will get back to you very soon.',
    form_error: 'Send error. Please try again or call us directly.',
    form_nom: 'Your name',
    form_tel: 'Phone',
    form_event: 'Event type',
    form_event_placeholder: 'Choose a type',
    ev_mariage: 'Wedding',
    ev_anniversaire: 'Birthday',
    ev_entreprise: 'Corporate event',
    ev_festival: 'Festival',
    ev_prive: 'Private show',
    ev_autre: 'Other',
    form_date: 'Event date',
    form_lieu: 'Location',
    form_message: 'Message',
    form_envoyer: 'Send request'
  }
};

var currentLang = 'fr';
var ttsUtterance = null;

document.addEventListener('DOMContentLoaded', function () {

  // Splash screen
  var splash = document.getElementById('splash-screen');
  var app = document.getElementById('app');
  setTimeout(function () {
    splash.style.opacity = '0';
    setTimeout(function () {
      splash.style.display = 'none';
      app.style.display = 'block';
      animateCounters();
    }, 500);
  }, 1500);

  // PWA install
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    var btnInstall = document.getElementById('btn-install');
    if (btnInstall) btnInstall.style.display = 'inline-block';
  });

  var btnInstall = document.getElementById('btn-install');
  if (btnInstall) {
    btnInstall.addEventListener('click', function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function () {
          deferredPrompt = null;
          btnInstall.style.display = 'none';
        });
      }
    });
  }

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }

  // Navigation tabs
  var navBtns = document.querySelectorAll('.nav-btn');
  var tabSections = document.querySelectorAll('.tab-section');

  navBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-tab');
      navBtns.forEach(function (b) { b.classList.remove('active'); });
      tabSections.forEach(function (s) { s.classList.remove('active'); });
      btn.classList.add('active');
      var target = document.getElementById(targetId);
      if (target) target.classList.add('active');
    });
  });

  // Punchline du jour
  var punchlineEl = document.getElementById('daily-punchline');
  if (punchlineEl) {
    var day = new Date().getDay();
    punchlineEl.textContent = punchlines[day];
  }

  // Membres grid
  buildMembresGrid();

  // Modal
  var modal = document.getElementById('membre-modal');
  var modalClose = document.getElementById('modal-close');
  if (modalClose) {
    modalClose.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  }
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  // TTS
  var ttsPlayBtn = document.getElementById('tts-play');
  var ttsPauseBtn = document.getElementById('tts-pause');
  var ttsStopBtn = document.getElementById('tts-stop');
  var ttsText = document.getElementById('tts-text');

  if (ttsPlayBtn) {
    ttsPlayBtn.addEventListener('click', function () {
      if (!('speechSynthesis' in window)) return;
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        return;
      }
      window.speechSynthesis.cancel();
      ttsUtterance = new SpeechSynthesisUtterance(ttsText ? ttsText.textContent : '');
      ttsUtterance.lang = currentLang === 'fr' ? 'fr-FR' : 'en-US';
      window.speechSynthesis.speak(ttsUtterance);
    });
  }

  if (ttsPauseBtn) {
    ttsPauseBtn.addEventListener('click', function () {
      if ('speechSynthesis' in window) window.speechSynthesis.pause();
    });
  }

  if (ttsStopBtn) {
    ttsStopBtn.addEventListener('click', function () {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    });
  }

  // Theme toggle
  var btnTheme = document.getElementById('btn-theme');
  if (btnTheme) {
    btnTheme.addEventListener('click', function () {
      document.body.classList.toggle('theme-gold-intense');
    });
  }

  // Language toggle
  var btnLang = document.getElementById('btn-lang');
  if (btnLang) {
    btnLang.addEventListener('click', function () {
      currentLang = currentLang === 'fr' ? 'en' : 'fr';
      btnLang.textContent = currentLang.toUpperCase();
      applyTranslations();
    });
  }

  // Share
  var btnShare = document.getElementById('btn-share');
  if (btnShare) {
    btnShare.addEventListener('click', function () {
      if (navigator.share) {
        navigator.share({
          title: 'JO BAND Officiel',
          text: 'Decouvrez JO BAND, le collectif artistique du Togo !',
          url: window.location.href
        }).catch(function () {});
      } else {
        try {
          navigator.clipboard.writeText(window.location.href);
          alert('Lien copie !');
        } catch (e) {}
      }
    });
  }

  // Form submit
  var formSubmit = document.getElementById('form-submit');
  if (formSubmit) {
    formSubmit.addEventListener('click', function () {
      submitForm();
    });
  }

});

function buildMembresGrid() {
  var grid = document.getElementById('membres-grid');
  if (!grid) return;
  grid.innerHTML = '';
  membres.forEach(function (m) {
    var card = document.createElement('div');
    card.className = 'membre-card';
    card.setAttribute('data-id', m.id);

    var img = document.createElement('img');
    img.src = 'images/' + m.id + '.jpg';
    img.alt = m.nom;
    img.className = 'membre-photo';
    img.onerror = function () {
      var fallback = document.createElement('div');
      fallback.className = 'membre-photo-fallback';
      card.replaceChild(fallback, img);
    };

    var name = document.createElement('div');
    name.className = 'membre-name';
    name.textContent = m.nom;

    var role = document.createElement('div');
    role.className = 'membre-role';
    role.textContent = m.role;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(role);

    card.addEventListener('click', function () {
      openModal(m);
    });

    grid.appendChild(card);
  });
}

function openModal(m) {
  var modal = document.getElementById('membre-modal');
  var modalPhoto = document.getElementById('modal-photo');
  var modalNom = document.getElementById('modal-nom');
  var modalRole = document.getElementById('modal-role');
  if (!modal) return;

  modalPhoto.innerHTML = '';
  var img = document.createElement('img');
  img.src = 'images/' + m.id + '.jpg';
  img.alt = m.nom;
  img.onerror = function () {
    var fb = document.createElement('div');
    fb.className = 'modal-photo-fallback-icon';
    modalPhoto.replaceChild(fb, img);
  };
  modalPhoto.appendChild(img);

  modalNom.textContent = m.nom;
  modalRole.textContent = m.role;
  modal.style.display = 'flex';
}

function animateCounters() {
  var counters = document.querySelectorAll('.stat-number');
  counters.forEach(function (el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var start = 0;
    var duration = 1200;
    var step = target / (duration / 16);
    var interval = setInterval(function () {
      start += step;
      if (start >= target) {
        el.textContent = target;
        clearInterval(interval);
      } else {
        el.textContent = Math.floor(start);
      }
    }, 16);
  });
}

function applyTranslations() {
  var t = translations[currentLang] || translations.fr;
  var els = document.querySelectorAll('[data-i18n]');
  els.forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });
}

function submitForm() {
  var nom = document.getElementById('f-nom');
  var tel = document.getElementById('f-tel');
  var event = document.getElementById('f-event');
  var date = document.getElementById('f-date');
  var lieu = document.getElementById('f-lieu');
  var message = document.getElementById('f-message');
  var submitBtn = document.getElementById('form-submit');
  var successEl = document.getElementById('form-success');
  var errorEl = document.getElementById('form-error');

  if (!nom || !tel) return;
  if (!nom.value.trim() || !tel.value.trim()) {
    if (errorEl) {
      errorEl.style.display = 'block';
      errorEl.textContent = 'Veuillez remplir au moins votre nom et telephone.';
    }
    return;
  }

  if (submitBtn) submitBtn.disabled = true;
  if (successEl) successEl.style.display = 'none';
  if (errorEl) errorEl.style.display = 'none';

  var body = {
    nom: nom.value.trim(),
    telephone: tel.value.trim(),
    type_evenement: event ? event.value : '',
    date: date ? date.value : '',
    lieu: lieu ? lieu.value.trim() : '',
    message: message ? message.value.trim() : ''
  };

  fetch('https://formspree.io/f/xbdwnyer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(body)
  })
  .then(function (res) {
    if (res.ok) {
      if (successEl) successEl.style.display = 'block';
      nom.value = '';
      tel.value = '';
      if (event) event.value = '';
      if (date) date.value = '';
      if (lieu) lieu.value = '';
      if (message) message.value = '';
    } else {
      if (errorEl) errorEl.style.display = 'block';
    }
  })
  .catch(function () {
    if (errorEl) errorEl.style.display = 'block';
  })
  .finally(function () {
    if (submitBtn) submitBtn.disabled = false;
  });
}
