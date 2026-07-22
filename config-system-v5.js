firebase.initializeApp({
    apiKey:            'AIzaSyDol8OdWq6YoBY5XMyuPYue25mQnOoIOYE',
    authDomain:        'jo-band-notifications-aea69.firebaseapp.com',
    projectId:         'jo-band-notifications-aea69',
    storageBucket:     'jo-band-notifications-aea69.firebasestorage.app',
    messagingSenderId: '942336247693',
    appId:             '1:942336247693:web:4a0f5915907c911d671fc4'
});

var loginView   = document.getElementById('login-view');
var totpView    = document.getElementById('totp-view');
var successView = document.getElementById('success-view');

var btnLogin      = document.getElementById('btn-login');
var btnVerifyTotp = document.getElementById('btn-verify-totp');
var btnLogout     = document.getElementById('btn-logout');
var statusMsg     = document.getElementById('login-status');
var totpStatus    = document.getElementById('totp-status');
var totpVerified  = sessionStorage.getItem('jb_totp_verified') === 'true';

firebase.auth().onAuthStateChanged(function (user) {
    if (user && totpVerified) {
        loginView.classList.add('hidden');
        totpView.classList.add('hidden');
        successView.classList.remove('hidden');
    } else if (user && !totpVerified) {
        loginView.classList.add('hidden');
        totpView.classList.remove('hidden');
        successView.classList.add('hidden');
    } else {
        loginView.classList.remove('hidden');
        totpView.classList.add('hidden');
        successView.classList.add('hidden');
    }
});

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
});

btnVerifyTotp.addEventListener('click', function () {
    var code = document.getElementById('totp-code').value.trim();
    if (!code) return;

    btnVerifyTotp.disabled = true;
    btnVerifyTotp.textContent = 'Vérification...';
    totpStatus.textContent = '';

    var totpTimeout = setTimeout(function () {
        totpStatus.textContent = 'Ça prend trop de temps, réessayez.';
        totpStatus.className = 'status-msg error';
        btnVerifyTotp.disabled = false;
        btnVerifyTotp.textContent = 'Vérifier';
    }, 15000);

    fetch('/api/verify-totp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: code })
    })
        .then(function (r) { return r.json(); })
        .then(function (result) {
            clearTimeout(totpTimeout);
            if (result.success) {
                sessionStorage.setItem('jb_totp_verified', 'true');
                totpVerified = true;
                totpView.classList.add('hidden');
                successView.classList.remove('hidden');
            } else {
                totpStatus.textContent = result.error || 'Code incorrect.';
                totpStatus.className = 'status-msg error';
            }
        })
        .catch(function (err) {
            clearTimeout(totpTimeout);
            totpStatus.textContent = 'Erreur: ' + err.message;
            totpStatus.className = 'status-msg error';
        })
        .finally(function () {
            btnVerifyTotp.disabled = false;
            btnVerifyTotp.textContent = 'Vérifier';
        });
});

btnLogout.addEventListener('click', function () {
    sessionStorage.removeItem('jb_totp_verified');
    firebase.auth().signOut();
});
