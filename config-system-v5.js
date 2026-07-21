/* ==========================================
   PANNEAU ADMIN JO BAND — LOGIQUE COMPLETE
   Connexion + 2FA + tiroir de navigation + témoignages
========================================== */

firebase.initializeApp({
    apiKey:            'AIzaSyDol8OdWq6YoBY5XMyuPYue25mQnOoIOYE',
    authDomain:        'jo-band-notifications-aea69.firebaseapp.com',
    projectId:         'jo-band-notifications-aea69',
    storageBucket:     'jo-band-notifications-aea69.firebasestorage.app',
    messagingSenderId: '942336247693',
    appId:             '1:942336247693:web:4a0f5915907c911d671fc4'
});

var authWrapper = document.getElementById('auth-wrapper');
var loginView   = document.getElementById('login-view');
var totpView    = document.getElementById('totp-view');
var dashboard   = document.getElementById('dashboard');

var btnLogin      = document.getElementById('btn-login');
var btnVerifyTotp = document.getElementById('btn-verify-totp');
var btnLogout     = document.getElementById('btn-logout');
var statusMsg     = document.getElementById('login-status');
var totpStatus    = document.getElementById('totp-status');
var totpVerified  = sessionStorage.getItem('jb_totp_verified') === 'true';

/* ── ETAT DE CONNEXION ── */
firebase.auth().onAuthStateChanged(function (user) {
    if (user && totpVerified) {
        authWrapper.classList.remove('visible');
        dashboard.classList.add('visible');
        loadTestimonials('pending');
        loadTestimonials('approved');
    } else if (user && !totpVerified) {
        authWrapper.classList.add('visible');
        loginView.classList.remove('visible');
        totpView.classList.add('visible');
        dashboard.classList.remove('visible');
    } else {
        authWrapper.classList.add('visible');
        loginView.classList.add('visible');
        totpView.classList.remove('visible');
        dashboard.classList.remove('visible');
    }
});

/* ── ETAPE 1 : EMAIL + MOT DE PASSE ── */
btnLogin.addEventListener('click', function () {
    var email    = document.getElementById('admin-email').value.trim();
    var password = document.getElementById('admin-password').value;

    if (!email || !password) {
        statusMsg.textContent = 'Merci de remplir tous les champs.';
        statusMsg.className = 'status-msg error';
        return;
    }

    btnLogin.disabled = true;
    btnLogin.textContent = 'Connexion...';
    statusMsg.textContent = '';

    var loginTimeout = setTimeout(function () {
        statusMsg.textContent = 'Ça prend trop de temps, réessayez.';
        statusMsg.className = 'status-msg error';
        btnLogin.disabled = false;
        btnLogin.textContent = 'Se connecter';
    }, 15000);

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            clearTimeout(loginTimeout);
        })
                .catch(function (error) {
            clearTimeout(loginTimeout);
            statusMsg.textContent = 'Erreur: ' + error.code + ' - ' + error.message;
            statusMsg.className = 'status-msg error';
        })
        .finally(function () {
            btnLogin.disabled = false;
            btnLogin.textContent = 'Se connecter';
        });
}); // <--- AJOUTE CETTE LIGNE ICI POUR FERMER L'ÉTAPE 1

/* ── ETAPE 2 : CODE GOOGLE AUTHENTICATOR ── */
btnVerifyTotp.addEventListener('click', function () {
   

/* ── ETAPE 2 : CODE GOOGLE AUTHENTICATOR ── */
btnVerifyTotp.addEventListener('click', function () {
    var code = document.getElementById('totp-code').value.trim();
    if (!code) return;

    btnVerifyTotp.disabled = true;
    btnVerifyTotp.textContent = 'Vérification...';

    fetch('/api/verify-totp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: code })
    })
        .then(function (r) { return r.json(); })
        .then(function (result) {
            if (result.success) {
                sessionStorage.setItem('jb_totp_verified', 'true');
                totpVerified = true;
                authWrapper.classList.remove('visible');
                dashboard.classList.add('visible');
                loadTestimonials('pending');
                loadTestimonials('approved');
            } else {
                totpStatus.textContent = result.error || 'Code incorrect.';
                totpStatus.className = 'status-msg error';
            }
        })
        .catch(function () {
            totpStatus.textContent = 'Erreur de connexion, réessayez.';
            totpStatus.className = 'status-msg error';
        })
        .finally(function () {
            btnVerifyTotp.disabled = false;
            btnVerifyTotp.textContent = 'Vérifier';
        });
});

/* ── DECONNEXION ── */
btnLogout.addEventListener('click', function () {
    sessionStorage.removeItem('jb_totp_verified');
    firebase.auth().signOut();
});

/* ── TIROIR DE NAVIGATION (hamburger) ── */
var btnOpenDrawer = document.getElementById('btn-open-drawer');
var sideDrawer    = document.getElementById('side-drawer');
var drawerBackdrop = document.getElementById('drawer-backdrop');

function openDrawer() {
    sideDrawer.classList.add('open');
    drawerBackdrop.classList.add('visible');
}
function closeDrawer() {
    sideDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('visible');
}

btnOpenDrawer.addEventListener('click', openDrawer);
drawerBackdrop.addEventListener('click', closeDrawer);

/* ── NAVIGATION ENTRE ONGLETS ── */
var pageTitle = document.getElementById('page-title');

document.querySelectorAll('.nav-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.nav-item').forEach(function (b) { b.classList.remove('active'); });
        document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });

        btn.classList.add('active');
        document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
        pageTitle.textContent = btn.textContent.trim();

        closeDrawer();
    });
});

/* ── GESTION DES TEMOIGNAGES ── */
function loadTestimonials(status) {
    var containerId = status === 'approved' ? 'admin-testi-approved' : 'admin-testi-pending';
    var container = document.getElementById(containerId);

    firebase.auth().currentUser.getIdToken().then(function (idToken) {
        fetch('/api/admin-testimonials?status=' + status, {
            headers: { 'Authorization': 'Bearer ' + idToken }
        })
            .then(function (r) { return r.json(); })
            .catch(function (err) {
                return { success: false, error: 'Erreur réseau: ' + err.message };
            })
            .then(function (result) {
                if (!result.success) {
                    container.innerHTML = '<p style="color:#e0344c; font-size:0.85rem;">Erreur: ' + (result.error || 'inconnue') + '</p>';
                    return;
                }
                if (!result.data || !result.data.length) {
                    container.innerHTML = '<p class="subtext">' +
                        (status === 'approved' ? 'Aucun témoignage approuvé.' : 'Aucun témoignage en attente.') +
                        '</p>';
                    return;
                }

                container.innerHTML = result.data.map(function (t) {
                    var approveBtn = status === 'pending'
                        ? '<button class="admin-btn-approve" data-id="' + t.id + '">Approuver</button>'
                        : '';
                    return '' +
                        '<div class="admin-item-card">' +
                            '<p class="admin-item-text">' + t.message + '</p>' +
                            '<p class="admin-item-meta">— ' + t.name + ' (' + t.rating + '⭐)</p>' +
                            approveBtn +
                            '<button class="admin-btn-delete" data-id="' + t.id + '">Supprimer</button>' +
                        '</div>';
                }).join('');

                container.querySelectorAll('.admin-btn-approve').forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        var id = btn.getAttribute('data-id');
                        if (confirm('Voulez-vous approuver ce témoignage ? Il deviendra visible publiquement sur le site.')) {
                            updateTestimonial(id, 'approve');
                        }
                    });
                });
                container.querySelectorAll('.admin-btn-delete').forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        var id = btn.getAttribute('data-id');
                        if (confirm('Voulez-vous vraiment supprimer ce témoignage définitivement ?')) {
                            updateTestimonial(id, 'delete');
                        }
                    });
                });
            });
    });
}

function updateTestimonial(id, action) {
    firebase.auth().currentUser.getIdToken().then(function (idToken) {
        fetch('/api/admin-testimonials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + idToken
            },
            body: JSON.stringify({ id: id, action: action })
        }).then(function () {
            loadTestimonials('pending');
            loadTestimonials('approved');
        });
    });
}
