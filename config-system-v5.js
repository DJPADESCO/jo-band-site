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
function escapeHTML(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user && totpVerified) {
        authWrapper.classList.add('hidden');
        dashboard.classList.remove('hidden');
        loadTestimonials('pending');
        loadTestimonials('approved');
    } else if (user && !totpVerified) {
        authWrapper.classList.remove('hidden');
        loginView.classList.add('hidden');
        totpView.classList.remove('hidden');
        dashboard.classList.add('hidden');
    } else {
        authWrapper.classList.remove('hidden');
        loginView.classList.remove('hidden');
        totpView.classList.add('hidden');
        dashboard.classList.add('hidden');
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

    fetch('/api/verify-totp-v2', {
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
                authWrapper.classList.add('hidden');
                dashboard.classList.remove('hidden');
                loadTestimonials('pending');
                loadTestimonials('approved');
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

var btnOpenDrawer  = document.getElementById('btn-open-drawer');
var sideDrawer     = document.getElementById('side-drawer');
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

var pageTitle = document.getElementById('page-title');

document.querySelectorAll('.nav-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.nav-item').forEach(function (b) { b.classList.remove('active'); });
        document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });

        btn.classList.add('active');
        document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
        pageTitle.textContent = btn.textContent.trim();

        if (btn.getAttribute('data-tab') === 'tab-members') {
            loadMembers();
        }

        closeDrawer();
    });
});

function escapeHTML(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
}

/* ── GESTION DES MEMBRES ── */
var memberFormOverlay = document.getElementById('member-form-overlay');
var btnAddMember      = document.getElementById('btn-add-member');
var btnSaveMember     = document.getElementById('btn-save-member');
var btnCancelMember   = document.getElementById('btn-cancel-member');
var memberFormStatus  = document.getElementById('member-form-status');
var memberPhotoFile   = document.getElementById('member-photo-file');
var memberPhotoStatus = document.getElementById('member-photo-status');
var memberPhotoPreview = document.getElementById('member-photo-preview');

function loadMembers() {
    var list = document.getElementById('admin-members-list');
    firebase.auth().currentUser.getIdToken().then(function (idToken) {
        fetch('/api/admin-members', {
            headers: { 'Authorization': 'Bearer ' + idToken }
        })
            .then(function (r) { return r.json(); })
            .catch(function (err) {
                return { success: false, error: 'Erreur réseau: ' + err.message };
            })
            .then(function (result) {
                if (!result.success) {
                    list.innerHTML = '<p style="color:#e0344c; font-size:0.85rem;">Erreur: ' + (result.error || 'inconnue') + '</p>';
                    return;
                }
                if (!result.data || !result.data.length) {
                    list.innerHTML = '<p class="subtext">Aucun membre pour le moment.</p>';
                    return;
                }

                list.innerHTML = result.data.map(function (m) {
                    var thumb = m.imageUrl
                        ? '<img src="' + m.imageUrl + '" class="member-thumb">'
                        : '';
                    var status = m.active ? '✅ Actif' : '⏸️ Inactif';
                    return '' +
                        '<div class="admin-item-card">' +
                            '<p class="admin-item-text">' + thumb + '<strong>' + escapeHTML(m.name) + '</strong> — ' + escapeHTML(m.role) + '</p>' +
                            '<p class="admin-item-meta">' + status + ' · Ordre: ' + (m.order || 0) + '</p>' +
                            '<button class="admin-btn-edit" data-id="' + m.id + '">Modifier</button>' +
                            '<button class="admin-btn-delete" data-id="' + m.id + '">Supprimer</button>' +
                        '</div>';
                }).join('');

                list.querySelectorAll('.admin-btn-edit').forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        var member = result.data.find(function (m) { return m.id === btn.getAttribute('data-id'); });
                        openMemberForm(member);
                    });
                });
                list.querySelectorAll('.admin-btn-delete').forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        var id = btn.getAttribute('data-id');
                        if (confirm('Voulez-vous vraiment supprimer ce membre ?')) {
                            deleteMember(id);
                        }
                    });
                });
            });
    });
}

function openMemberForm(member) {
    document.getElementById('member-form-title').textContent = member ? 'Modifier le membre' : 'Nouveau membre';
    document.getElementById('member-id').value = member ? member.id : '';
    document.getElementById('member-name').value = member ? member.name : '';
    document.getElementById('member-role').value = member ? member.role : '';
    document.getElementById('member-description').value = member ? (member.description || '') : '';
    document.getElementById('member-image-url').value = member ? (member.imageUrl || '') : '';
    document.getElementById('member-order').value = member ? (member.order || 0) : 0;
    document.getElementById('member-active').checked = member ? member.active !== false : true;
    memberPhotoStatus.textContent = '';
    memberFormStatus.textContent = '';

    if (member && member.imageUrl) {
        memberPhotoPreview.src = member.imageUrl;
        memberPhotoPreview.style.display = 'block';
    } else {
        memberPhotoPreview.style.display = 'none';
    }

    memberFormOverlay.classList.remove('hidden');
}

btnAddMember.addEventListener('click', function () {
    openMemberForm(null);
});
btnCancelMember.addEventListener('click', function () {
    memberFormOverlay.classList.add('hidden');
});

memberPhotoFile.addEventListener('change', function () {
    var file = memberPhotoFile.files[0];
    if (!file) return;

    memberPhotoStatus.textContent = 'Envoi de la photo...';

    firebase.auth().currentUser.getIdToken().then(function (idToken) {
        fetch('/api/upload-signature', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + idToken }
        })
            .then(function (r) { return r.json(); })
            .then(function (sig) {
                if (!sig.success) throw new Error(sig.error || 'Signature refusée');

                var formData = new FormData();
                formData.append('file', file);
                formData.append('api_key', sig.apiKey);
                formData.append('timestamp', sig.timestamp);
                formData.append('signature', sig.signature);
                formData.append('folder', sig.folder);

                return fetch('https://api.cloudinary.com/v1_1/' + sig.cloudName + '/image/upload', {
                    method: 'POST',
                    body: formData
                }).then(function (r) { return r.json(); });
            })
            .then(function (result) {
                if (!result.secure_url) throw new Error('Échec upload');
                document.getElementById('member-image-url').value = result.secure_url;
                memberPhotoPreview.src = result.secure_url;
                memberPhotoPreview.style.display = 'block';
                memberPhotoStatus.textContent = '✅ Photo envoyée';
            })
            .catch(function (err) {
                memberPhotoStatus.textContent = 'Erreur: ' + err.message;
            });
    });
});

btnSaveMember.addEventListener('click', function () {
    var payload = {
        id: document.getElementById('member-id').value || null,
        name: document.getElementById('member-name').value.trim(),
        role: document.getElementById('member-role').value.trim(),
        description: document.getElementById('member-description').value.trim(),
        imageUrl: document.getElementById('member-image-url').value,
        order: document.getElementById('member-order').value,
        active: document.getElementById('member-active').checked
    };

    if (!payload.name || !payload.role) {
        memberFormStatus.textContent = 'Nom et rôle sont obligatoires.';
        memberFormStatus.className = 'status-msg error';
        return;
    }

    btnSaveMember.disabled = true;
    btnSaveMember.textContent = 'Enregistrement...';

    firebase.auth().currentUser.getIdToken().then(function (idToken) {
        fetch('/api/admin-members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + idToken
            },
            body: JSON.stringify(payload)
        })
            .then(function (r) { return r.json(); })
            .then(function (result) {
                if (result.success) {
                    memberFormOverlay.classList.add('hidden');
                    loadMembers();
                } else {
                    memberFormStatus.textContent = result.error || 'Erreur.';
                    memberFormStatus.className = 'status-msg error';
                }
            })
            .catch(function (err) {
                memberFormStatus.textContent = 'Erreur: ' + err.message;
                memberFormStatus.className = 'status-msg error';
            })
            .finally(function () {
                btnSaveMember.disabled = false;
                btnSaveMember.textContent = 'Enregistrer';
            });
    });
});

function deleteMember(id) {
    firebase.auth().currentUser.getIdToken().then(function (idToken) {
        fetch('/api/admin-members', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + idToken
            },
            body: JSON.stringify({ id: id })
        }).then(function () {
            loadMembers();
        });
    });
                  }

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
                            '<p class="admin-item-text">' + escapeHTML(t.message) + '</p>' +
                            '<p class="admin-item-meta">— ' + escapeHTML(t.name) + ' (' + escapeHTML(t.rating) + '⭐)</p>' +
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
