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
  'Le dimanche, on répète pour vous épater toute la semaine.',
  'Le lundi, l\'énergie JO BAND relance la semaine.',
  'Le mardi, la créativité est notre moteur.',
  'Le mercredi, on prend la scène d\'assaut.',
  'Le jeudi, le show continue et le talent aussi.',
  'Le vendredi, on chauffe avant le grand soir.',
  'Le samedi, JO BAND met le feu à la scène.'
];

var translations = {
  fr: {
    nav_accueil: 'Accueil',
    nav_collectif: 'Collectif',
    nav_videos: 'Vidéos',
    nav_contact: 'Contact',
    slogan: 'Partout où ça bouge,<br>Jo Band est là.',
    s_vues: 'Vues',
    s_artistes: 'Artistes',
    s_shows: 'Shows',
    btn_reserver: 'Réserver JO BAND',
    btn_install: "Installer l'application",
    about_txt: 'JO BAND est un collectif artistique togolais composé de 13 artistes passionnés : humoristes, chanteurs, danseurs, cameramen et DJ. Avec plus de 500 000 vues et 150 shows, Jo Band illumine chaque scène avec énergie et créativité.',
    tts_play: 'Écouter',
    tts_pause: 'Pause',
    tts_stop: 'Stop',
    why_title: 'Pourquoi choisir JO BAND ?',
    w1h: 'Duo DJ exclusif',
    w1p: 'DJ PADESCO anime le show humour pendant que DJ ZEKA tient les platines. Deux talents, une seule scène.',
    w2h: 'Polyvalence totale',
    w2p: 'Humour, musique live, danse, vidéo : JO BAND couvre tous les formats de spectacle.',
    w3h: 'Professionnalisme',
    w3p: '13 artistes structurés, management dédié, 150+ shows d\'expérience au Togo.',
    coul_title: 'Coulisses & Événements',
    coul_sub: 'Des tournages aux spectacles, vivez nos moments en coulisses.',
    coul_a: 'Tournage',
    coul_b: 'Spectacle',
    coul_c: 'Répétition',
    coul_d: 'Backstage',
    tt_title: 'TikTok JO BAND',
    tt_desc: "TikTok ne permet pas l'intégration directe. Retrouvez toutes nos vidéos sur notre profil.",
    tt_btn: 'Voir sur TikTok',
    mgmt: 'Management',
    f_ok: 'Message envoyé ! Nous vous répondrons très vite.',
    f_err: 'Erreur d\'envoi. Veuillez réessayer ou nous appeler.',
    f_nom: 'Votre nom',
    f_tel: 'Téléphone',
    f_event: "Type d'événement",
    f_ev0: 'Choisir un type',
    f_ev1: 'Mariage',
    f_ev2: 'Anniversaire',
    f_ev3: "Soirée d'entreprise",
    f_ev4: 'Festival',
    f_ev5: 'Show privé',
    f_ev6: 'Autre',
    f_date: "Date de l'événement",
    f_lieu: 'Lieu',
    f_msg: 'Message',
    f_send: 'Envoyer la demande',
    banner_sub: 'Installer sur votre téléphone',
    banner_btn: 'Installer',
    banner_skip: 'Plus tard'
  },
  en: {
    nav_accueil: 'Home',
    nav_collectif: 'Collective',
    nav_videos: 'Videos',
    nav_contact: 'Contact',
    slogan: 'Wherever the party is,<br>Jo Band is there.',
    s_vues: 'Views',
    s_artistes: 'Artists',
    s_shows: 'Shows',
    btn_reserver: 'Book JO BAND',
    btn_install: 'Install App',
    about_txt: 'JO BAND is a Togolese artistic collective of 13 passionate artists: comedians, singers, dancers, cameramen and DJs. With over 500,000 views and 150 shows, Jo Band lights up every stage with energy and creativity.',
    tts_play: 'Listen',
    tts_pause: 'Pause',
    tts_stop: 'Stop',
    why_title: 'Why choose JO BAND?',
    w1h: 'Exclusive DJ Duo',
    w1p: 'DJ PADESCO hosts the comedy show while DJ ZEKA handles the decks. Two talents, one stage.',
    w2h: 'Total versatility',
    w2p: 'Comedy, live music, dance, video: JO BAND covers every entertainment format.',
    w3h: 'Professionalism',
    w3p: '13 structured artists with dedicated management and over 150 shows of experience in Togo.',
    coul_title: 'Behind the Scenes',
    coul_sub: 'From shoots to shows, live our backstage moments.',
    coul_a: 'Shooting',
    coul_b: 'Show',
    coul_c: 'Rehearsal',
    coul_d: 'Backstage',
    tt_title: 'JO BAND on TikTok',
    tt_desc: 'TikTok does not allow direct embedding. Find all our videos on our profile.',
    tt_btn: 'View on TikTok',
    mgmt: 'Management',
    f_ok: 'Message sent! We will get back to you very soon.',
    f_err: 'Send error. Please try again or call us directly.',
    f_nom: 'Your name',
    f_tel: 'Phone',
    f_event: 'Event type',
    f_ev0: 'Choose a type',
    f_ev1: 'Wedding',
    f_ev2: 'Birthday',
    f_ev3: 'Corporate event',
    f_ev4: 'Festival',
    f_ev5: 'Private show',
    f_ev6: 'Other',
    f_date: 'Event date',
    f_lieu: 'Location',
    f_msg: 'Message',
    f_send: 'Send request',
    banner_sub: 'Install on your phone',
    banner_btn: 'Install',
    banner_skip: 'Maybe later'
  }
};

var currentLang = 'fr';
var ttsUtterance = null;

document.addEventListener('DOMContentLoaded', function () {

  // Splash screen (Corrigé)
  var splash = document.getElementById('splash');
  var app = document.getElementById('app');
  setTimeout(function () {
    if (splash) splash.classList.add('out');
    setTimeout(function () {
      if (splash) splash.style.display = 'none';
      if (app) app.style.display = 'flex';
      animateCounters();
    }, 500);
  }, 1500);

  // PWA install logic (Corrigé pour la bannière)
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    
    var btnPwa = document.getElementById('btn-pwa');
    var pwaBanner = document.getElementById('pwa-banner');
    
    if (btnPwa) btnPwa.classList.add('show');
    if (pwaBanner) pwaBanner.classList.add('show');
  });

  var btnPwa = document.getElementById('btn-pwa');
  if (btnPwa) {
    btnPwa.addEventListener('click', function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function () {
          deferredPrompt = null;
          btnPwa.classList.remove('show');
          var pwaBanner = document.getElementById('pwa-banner');
          if (pwaBanner) pwaBanner.classList.remove('show');
        });
      }
    });
  }

  var pwaInstall = document.getElementById('pwa-install');
  if (pwaInstall) {
    pwaInstall.addEventListener('click', function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function () {
          deferredPrompt = null;
          var pwaBanner = document.getElementById('pwa-banner');
          if (pwaBanner) pwaBanner.classList.remove('show');
          if (btnPwa) btnPwa.classList.remove('show');
        });
      }
    });
  }

  var pwaSkip = document.getElementById('pwa-skip');
  if (pwaSkip) {
    pwaSkip.addEventListener('click', function () {
      var pwaBanner = document.getElementById('pwa-banner');
      if (pwaBanner) pwaBanner.classList.remove('show');
    });
  }

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(function (err) { console.log(err); });
  }

  // Navigation tabs (Corrigé)
  var tabBtns = document.querySelectorAll('.tab-btn');
  var pages = document.querySelectorAll('.page');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-page');
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      pages.forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var target = document.getElementById(targetId);
      if (target) target.classList.add('active');
    });
  });

  // Punchline du jour (Corrigé)
  var punchlineEl = document.getElementById('punchline-el');
  if (punchlineEl) {
    var day = new Date().getDay();
    punchlineEl.textContent = punchlines[day];
  }

  // Membres grid
  buildMembresGrid();

  // Modal (Corrigé)
  var modal = document.getElementById('modal');
  var modalClose = document.getElementById('modal-close');
  if (modalClose) {
    modalClose.addEventListener('click', function () {
      modal.classList.remove('open');
    });
  }
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  // TTS (Corrigé)
  var ttsPlayBtn = document.getElementById('tts-play');
  var ttsPauseBtn = document.getElementById('tts-pause');
  var ttsStopBtn = document.getElementById('tts-stop');
  var ttsText = document.getElementById('tts-txt');

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

  // Theme toggle (Corrigé)
  var btnTheme = document.getElementById('btn-theme');
  if (btnTheme) {
    btnTheme.addEventListener('click', function () {
      document.body.classList.toggle('gold-theme');
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
          text: 'Découvrez JO BAND, le collectif artistique du Togo !',
          url: window.location.href
        }).catch(function () {});
      } else {
        try {
          navigator.clipboard.writeText(window.location.href);
          alert('Lien copié !');
        } catch (e) {}
      }
    });
  }

  // Form submit (Corrigé)
  var btnSend = document.getElementById('btn-send');
  if (btnSend) {
    btnSend.addEventListener('click', function () {
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
    img.className = 'm-photo';
    img.onerror = function () {
      var fallback = document.createElement('div');
      fallback.className = 'm-fallback';
      card.replaceChild(fallback, img);
    };

    var name = document.createElement('div');
    name.className = 'm-name';
    name.textContent = m.nom;

    var role = document.createElement('div');
    role.className = 'm-role';
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
  var modal = document.getElementById('modal');
  var modalPhoto = document.getElementById('modal-photo');
  var modalNom = document.getElementById('modal-name');
  var modalRole = document.getElementById('modal-role');
  if (!modal) return;

  modalPhoto.innerHTML = '';
  var img = document.createElement('img');
  img.src = 'images/' + m.id + '.jpg';
  img.alt = m.nom;
  img.onerror = function () {
    var fb = document.createElement('div');
    fb.className = 'modal-photo-fb';
    modalPhoto.replaceChild(fb, img);
  };
  modalPhoto.appendChild(img);

  modalNom.textContent = m.nom;
  modalRole.textContent = m.role;
  modal.classList.add('open');
}

function animateCounters() {
  var counters = document.querySelectorAll('.cnt');
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
        if(key === 'slogan') {
            el.innerHTML = t[key];
        } else {
            el.textContent = t[key];
        }
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
  var submitBtn = document.getElementById('btn-send');
  var successEl = document.getElementById('form-ok');
  var errorEl = document.getElementById('form-err');

  if (!nom || !tel) return;
  if (!nom.value.trim() || !tel.value.trim()) {
    if (errorEl) {
      errorEl.classList.add('show');
      errorEl.textContent = 'Veuillez remplir au moins votre nom et téléphone.';
    }
    return;
  }

  if (submitBtn) submitBtn.disabled = true;
  if (successEl) successEl.classList.remove('show');
  if (errorEl) errorEl.classList.remove('show');

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
      if (successEl) successEl.classList.add('show');
      nom.value = '';
      tel.value = '';
      if (event) event.value = '';
      if (date) date.value = '';
      if (lieu) lieu.value = '';
      if (message) message.value = '';
    } else {
      if (errorEl) errorEl.classList.add('show');
    }
  })
  .catch(function () {
    if (errorEl) errorEl.classList.add('show');
  })
  .finally(function () {
    if (submitBtn) submitBtn.disabled = false;
  });
}
