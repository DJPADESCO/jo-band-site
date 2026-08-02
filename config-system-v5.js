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

        closeDrawer();

        if (btn.getAttribute('data-tab') === 'tab-members') {
            loadMembers();
        }
        if (btn.getAttribute('data-tab') === 'tab-contact') {
            loadContact();
        }
        if (btn.getAttribute('data-tab') === 'tab-formules') {
            loadFormules();
        }
        if (btn.getAttribute('data-tab') === 'tab-videos') {
            loadVideos();
        }
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

/* ── GESTION DU CONTENU CONTACT ── */
var btnSaveContact    = document.getElementById('btn-save-contact');
var contactFormStatus = document.getElementById('contact-form-status');

function loadContact() {
    contactFormStatus.textContent = '';
    firebase.auth().currentUser.getIdToken().then(function (idToken) {
        fetch('/api/admin-members?resource=content&section=contact', {
            headers: { 'Authorization': 'Bearer ' + idToken }
        })
            .then(function (r) { return r.json(); })
            .then(function (result) {
                if (!result.success) {
                    contactFormStatus.textContent = 'Erreur: ' + (result.error || 'inconnue');
                    contactFormStatus.className = 'status-msg error';
                    return;
                }
                var d = result.data || {};
                document.getElementById('contact-tel1').value = d.tel1 || '';
                document.getElementById('contact-tel2').value = d.tel2 || '';
                document.getElementById('contact-youtube').value = d.youtube || '';
                document.getElementById('contact-tiktok').value = d.tiktok || '';
                document.getElementById('contact-wa-channel').value = d.waChannel || '';
            })
            .catch(function (err) {
                contactFormStatus.textContent = 'Erreur réseau: ' + err.message;
                contactFormStatus.className = 'status-msg error';
            });
    });
}

btnSaveContact.addEventListener('click', function () {
    var payload = {
        tel1: document.getElementById('contact-tel1').value.trim(),
        tel2: document.getElementById('contact-tel2').value.trim(),
        youtube: document.getElementById('contact-youtube').value.trim(),
        tiktok: document.getElementById('contact-tiktok').value.trim(),
        waChannel: document.getElementById('contact-wa-channel').value.trim()
    };

    btnSaveContact.disabled = true;
    btnSaveContact.textContent = 'Enregistrement...';

    firebase.auth().currentUser.getIdToken().then(function (idToken) {
        fetch('/api/admin-members?resource=content&section=contact', {
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
                    contactFormStatus.textContent = '✅ Enregistré';
                    contactFormStatus.className = 'status-msg success';
                } else {
                    contactFormStatus.textContent = result.error || 'Erreur.';
                    contactFormStatus.className = 'status-msg error';
                }
            })
            .catch(function (err) {
                contactFormStatus.textContent = 'Erreur: ' + err.message;
                contactFormStatus.className = 'status-msg error';
            })
            .finally(function () {
                btnSaveContact.disabled = false;
                btnSaveContact.textContent = 'Enregistrer';
            });
    });
});

/* ── GESTION DES FORMULES (PRESTATIONS) ── */
var btnSaveFormules    = document.getElementById('btn-save-formules');
var formulesFormStatus = document.getElementById('formules-form-status');

function createFeatureRow(frVal, enVal) {
    var row = document.createElement('div');
    row.className = 'feature-row';
    row.style.cssText = 'display:flex; gap:8px; align-items:center; margin-bottom:8px;';

    var inputFr = document.createElement('input');
    inputFr.type = 'text';
    inputFr.className = 'feature-fr';
    inputFr.placeholder = 'FR';
    inputFr.style.flex = '1';
    inputFr.value = frVal || '';

    var inputEn = document.createElement('input');
    inputEn.type = 'text';
    inputEn.className = 'feature-en';
    inputEn.placeholder = 'EN';
    inputEn.style.flex = '1';
    inputEn.value = enVal || '';

    var btnRemove = document.createElement('button');
    btnRemove.type = 'button';
    btnRemove.className = 'btn-logout';
    btnRemove.style.padding = '6px 10px';
    btnRemove.innerHTML = '&times;';
    btnRemove.addEventListener('click', function () {
        row.remove();
    });

    row.appendChild(inputFr);
    row.appendChild(inputEn);
    row.appendChild(btnRemove);
    return row;
}

function fillFeaturesList(containerId, featuresFr, featuresEn) {
    var container = document.getElementById(containerId);
    container.innerHTML = '';
    var count = Math.max(
        featuresFr ? featuresFr.length : 0,
        featuresEn ? featuresEn.length : 0,
        1
    );
    for (var i = 0; i < count; i++) {
        var fr = featuresFr && featuresFr[i] ? featuresFr[i] : '';
        var en = featuresEn && featuresEn[i] ? featuresEn[i] : '';
        container.appendChild(createFeatureRow(fr, en));
    }
}

function collectFeatures(containerId) {
    var container = document.getElementById(containerId);
    var rows = container.querySelectorAll('.feature-row');
    var fr = [];
    var en = [];
    rows.forEach(function (row) {
        var frVal = row.querySelector('.feature-fr').value.trim();
        var enVal = row.querySelector('.feature-en').value.trim();
        if (frVal || enVal) {
            fr.push(frVal);
            en.push(enVal);
        }
    });
    return { fr: fr, en: en };
}

document.getElementById('btn-add-feature-standard').addEventListener('click', function () {
    document.getElementById('pkg-standard-features-list').appendChild(createFeatureRow('', ''));
});
document.getElementById('btn-add-feature-premium').addEventListener('click', function () {
    document.getElementById('pkg-premium-features-list').appendChild(createFeatureRow('', ''));
});

function loadFormules() {
    formulesFormStatus.textContent = '';
    firebase.auth().currentUser.getIdToken().then(function (idToken) {
        fetch('/api/admin-members?resource=content&section=formules', {
            headers: { 'Authorization': 'Bearer ' + idToken }
        })
            .then(function (r) { return r.json(); })
            .then(function (result) {
                if (!result.success) {
                    formulesFormStatus.textContent = 'Erreur: ' + (result.error || 'inconnue');
                    formulesFormStatus.className = 'status-msg error';
                    return;
                }
                var d = result.data || {};
                var std = d.standard || {};
                var prem = d.premium || {};

                document.getElementById('pkg-standard-badge-fr').value = std.badge_fr || '';
                document.getElementById('pkg-standard-badge-en').value = std.badge_en || '';
                document.getElementById('pkg-standard-title-fr').value = std.title_fr || '';
                document.getElementById('pkg-standard-title-en').value = std.title_en || '';
                document.getElementById('pkg-standard-desc-fr').value  = std.desc_fr  || '';
                document.getElementById('pkg-standard-desc-en').value  = std.desc_en  || '';
                document.getElementById('pkg-standard-price').value    = std.price    || '';
                fillFeaturesList('pkg-standard-features-list', std.features_fr, std.features_en);

                document.getElementById('pkg-premium-badge-fr').value = prem.badge_fr || '';
                document.getElementById('pkg-premium-badge-en').value = prem.badge_en || '';
                document.getElementById('pkg-premium-title-fr').value = prem.title_fr || '';
                document.getElementById('pkg-premium-title-en').value = prem.title_en || '';
                document.getElementById('pkg-premium-desc-fr').value  = prem.desc_fr  || '';
                document.getElementById('pkg-premium-desc-en').value  = prem.desc_en  || '';
                document.getElementById('pkg-premium-price').value    = prem.price    || '';
                fillFeaturesList('pkg-premium-features-list', prem.features_fr, prem.features_en);
            })
            .catch(function (err) {
                formulesFormStatus.textContent = 'Erreur réseau: ' + err.message;
                formulesFormStatus.className = 'status-msg error';
            });
    });
}

btnSaveFormules.addEventListener('click', function () {
    var stdFeatures  = collectFeatures('pkg-standard-features-list');
    var premFeatures = collectFeatures('pkg-premium-features-list');

    var payload = {
        standard: {
            badge_fr: document.getElementById('pkg-standard-badge-fr').value.trim(),
            badge_en: document.getElementById('pkg-standard-badge-en').value.trim(),
            title_fr: document.getElementById('pkg-standard-title-fr').value.trim(),
            title_en: document.getElementById('pkg-standard-title-en').value.trim(),
            desc_fr:  document.getElementById('pkg-standard-desc-fr').value.trim(),
            desc_en:  document.getElementById('pkg-standard-desc-en').value.trim(),
            price:    document.getElementById('pkg-standard-price').value.trim(),
            features_fr: stdFeatures.fr,
            features_en: stdFeatures.en
        },
        premium: {
            badge_fr: document.getElementById('pkg-premium-badge-fr').value.trim(),
            badge_en: document.getElementById('pkg-premium-badge-en').value.trim(),
            title_fr: document.getElementById('pkg-premium-title-fr').value.trim(),
            title_en: document.getElementById('pkg-premium-title-en').value.trim(),
            desc_fr:  document.getElementById('pkg-premium-desc-fr').value.trim(),
            desc_en:  document.getElementById('pkg-premium-desc-en').value.trim(),
            price:    document.getElementById('pkg-premium-price').value.trim(),
            features_fr: premFeatures.fr,
            features_en: premFeatures.en
        }
    };

    btnSaveFormules.disabled = true;
    btnSaveFormules.textContent = 'Enregistrement...';

    firebase.auth().currentUser.getIdToken().then(function (idToken) {
        fetch('/api/admin-members?resource=content&section=formules', {
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
                    formulesFormStatus.textContent = '✅ Enregistré';
                    formulesFormStatus.className = 'status-msg success';
                } else {
                    formulesFormStatus.textContent = result.error || 'Erreur.';
                    formulesFormStatus.className = 'status-msg error';
                }
            })
            .catch(function (err) {
                formulesFormStatus.textContent = 'Erreur: ' + err.message;
                formulesFormStatus.className = 'status-msg error';
            })
            .finally(function () {
                btnSaveFormules.disabled = false;
                btnSaveFormules.textContent = 'Enregistrer';
            });
    });
});

/* ── GESTION DE LA GALERIE (ORDRE, MISE EN AVANT, VISIBILITÉ, UPLOAD, SUPPRESSION) ── */
var galleryUploadFile   = document.getElementById('gallery-upload-file');
var galleryUploadStatus = document.getElementById('gallery-upload-status');
var btnSaveGalleryOrder = document.getElementById('btn-save-gallery-order');
var galleryOrderStatus  = document.getElementById('gallery-order-status');
var adminGalleryList    = document.getElementById('admin-gallery-list');
var galleryItemsCache   = [];

function loadVideos() {
    adminGalleryList.innerHTML = '<p class="subtext">Chargement...</p>';
    firebase.auth().currentUser.getIdToken().then(function (idToken) {
        fetch('/api/videos', {
            headers: { 'Authorization': 'Bearer ' + idToken }
        })
            .then(function (r) { return r.json(); })
            .then(function (result) {
                if (!result.success || !result.data) {
                    adminGalleryList.innerHTML = '<p style="color:#e0344c; font-size:0.85rem;">Erreur de chargement.</p>';
                    return;
                }
                galleryItemsCache = result.data;
                renderGalleryAdminList();
            })
            .catch(function (err) {
                adminGalleryList.innerHTML = '<p style="color:#e0344c; font-size:0.85rem;">Erreur réseau: ' + err.message + '</p>';
            });
    });
}

function renderGalleryAdminList() {
    if (!galleryItemsCache.length) {
        adminGalleryList.innerHTML = '<p class="subtext">Aucun média pour le moment.</p>';
        return;
    }

    adminGalleryList.innerHTML = galleryItemsCache.map(function (item, index) {
        var thumb = item.resource_type === 'video'
            ? '<video src="' + item.secure_url + '" class="member-thumb" muted></video>'
            : (item.resource_type === 'raw'
                ? '<i class="fa-solid fa-file-pdf" style="font-size:1.6rem;"></i>'
                : '<img src="' + item.secure_url + '" class="member-thumb">');

        return '' +
            '<div class="admin-item-card" data-index="' + index + '">' +
                '<p class="admin-item-text">' + thumb + '<strong>' + escapeHTML(item.display_name || item.public_id) + '</strong></p>' +
                '<div class="field">' +
                    '<label>Ordre</label>' +
                    '<input type="number" class="gallery-order-input" value="' + (item.order || 0) + '">' +
                '</div>' +
                '<div class="field">' +
                    '<label>Catégorie</label>' +
                    '<select class="gallery-category-input">' +
                        '<option value="photo"' + (item.category === 'photo' ? ' selected' : '') + '>Photo</option>' +
                        '<option value="video"' + (item.category === 'video' ? ' selected' : '') + '>Vidéo</option>' +
                        '<option value="document"' + (item.category === 'document' ? ' selected' : '') + '>Document</option>' +
                        '<option value="affiche"' + (item.category === 'affiche' ? ' selected' : '') + '>Affiche</option>' +
                    '</select>' +
                '</div>' +
                '<div class="field" style="display:flex; align-items:center; gap:10px;">' +
                    '<input type="checkbox" class="gallery-featured-input" style="width:auto;" ' + (item.featured ? 'checked' : '') + '>' +
                    '<label style="margin:0;">Mis en avant (accueil)</label>' +
                '</div>' +
                '<div class="field" style="display:flex; align-items:center; gap:10px;">' +
                    '<input type="checkbox" class="gallery-hidden-input" style="width:auto;" ' + (item.hidden ? 'checked' : '') + '>' +
                    '<label style="margin:0;">Masqué (invisible sur le site)</label>' +
                '</div>' +
                '<button class="admin-btn-delete" data-index="' + index + '">Supprimer définitivement</button>' +
            '</div>';
    }).join('');

    adminGalleryList.querySelectorAll('.admin-btn-delete').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var idx = Number(btn.getAttribute('data-index'));
            var item = galleryItemsCache[idx];
            if (!item) return;
            if (confirm('Supprimer définitivement "' + (item.display_name || item.public_id) + '" ? Cette action est irréversible.')) {
                deleteGalleryItem(item);
            }
        });
    });
}

function deleteGalleryItem(item) {
    firebase.auth().currentUser.getIdToken().then(function (idToken) {
        fetch('/api/videos', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + idToken
            },
            body: JSON.stringify({ publicId: item.public_id, resourceType: item.resource_type })
        })
            .then(function (r) { return r.json(); })
            .then(function (result) {
                if (result.success) {
                    loadVideos();
                } else {
                    alert('Erreur: ' + (result.error || 'inconnue'));
                }
            })
            .catch(function (err) {
                alert('Erreur réseau: ' + err.message);
            });
    });
}

btnSaveGalleryOrder.addEventListener('click', function () {
    var rows = adminGalleryList.querySelectorAll('.admin-item-card');
    var items = [];

    rows.forEach(function (row) {
        var idx = Number(row.getAttribute('data-index'));
        var source = galleryItemsCache[idx];
        if (!source) return;
        items.push({
            publicId: source.public_id,
            order:    row.querySelector('.gallery-order-input').value,
            featured: row.querySelector('.gallery-featured-input').checked,
            hidden:   row.querySelector('.gallery-hidden-input').checked,
            category: row.querySelector('.gallery-category-input').value
        });
    });

    btnSaveGalleryOrder.disabled = true;
    btnSaveGalleryOrder.textContent = 'Enregistrement...';

    firebase.auth().currentUser.getIdToken().then(function (idToken) {
        fetch('/api/videos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + idToken
            },
            body: JSON.stringify({ items: items })
        })
            .then(function (r) { return r.json(); })
            .then(function (result) {
                if (result.success) {
                    galleryOrderStatus.textContent = '✅ Enregistré';
                    galleryOrderStatus.className = 'status-msg success';
                    loadVideos();
                } else {
                    galleryOrderStatus.textContent = result.error || 'Erreur.';
                    galleryOrderStatus.className = 'status-msg error';
                }
            })
            .catch(function (err) {
                galleryOrderStatus.textContent = 'Erreur: ' + err.message;
                galleryOrderStatus.className = 'status-msg error';
            })
            .finally(function () {
                btnSaveGalleryOrder.disabled = false;
                btnSaveGalleryOrder.textContent = 'Enregistrer les modifications';
            });
    });
});

galleryUploadFile.addEventListener('change', function () {
    var file = galleryUploadFile.files[0];
    if (!file) return;

    galleryUploadStatus.textContent = 'Envoi en cours...';

    var resourceType = 'image';
    if (file.type.indexOf('video/') === 0) resourceType = 'video';
    else if (file.type === 'application/pdf') resourceType = 'raw';

    firebase.auth().currentUser.getIdToken().then(function (idToken) {
        fetch('/api/upload-signature?target=gallery', {
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

                return fetch('https://api.cloudinary.com/v1_1/' + sig.cloudName + '/' + resourceType + '/upload', {
                    method: 'POST',
                    body: formData
                }).then(function (r) { return r.json(); });
            })
            .then(function (result) {
                if (!result.secure_url) throw new Error('Échec upload');
                galleryUploadStatus.textContent = '✅ Média envoyé';
                galleryUploadFile.value = '';
                loadVideos();
            })
            .catch(function (err) {
                galleryUploadStatus.textContent = 'Erreur: ' + err.message;
            });
    });
});

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
