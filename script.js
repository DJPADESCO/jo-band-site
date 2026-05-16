// La base de données de l'équipe avec TES vrais rôles
const members = [
    { name: "DJ PADESCO", id: "padesco", role: "DJ / Humoriste" },
    { name: "JOËL", id: "joel", role: "Management" },
    { name: "LE FONDATEUR", id: "fondateur", role: "Fondateur" },
    { name: "NANA SIKA", id: "nanasika", role: "Comédien & Vidéaste" },
    { name: "GÉDÉON", id: "gedeon", role: "Humoriste" },
    { name: "JEAN", id: "jean", role: "Artiste Chanteur" },
    { name: "THE GACHA", id: "gacha", role: "Artiste Chanteur" },
    { name: "AROLE", id: "arole", role: "Caméraman" },
    { name: "L&H", id: "lh", role: "Caméraman" },
    { name: "DK POPI", id: "dkpopi", role: "Humoriste" },
    { name: "ESTHER", id: "esther", role: "Humoriste" },
    { name: "PRISCA", id: "prisca", role: "Humoriste" },
    { name: "MAKAFUI", id: "makafui", role: "Humoriste" }
];

document.addEventListener('DOMContentLoaded', () => {

    // 🐛 BUG 1 CORRIGÉ : Suppression fiable du Splash Screen
    const splash = document.getElementById('splash-screen');
    if(splash) {
        setTimeout(() => { splash.classList.add('hide'); }, 1000);
    }

    // Navigation des onglets
    const navItems = document.querySelectorAll('.nav-item');
    const tabs = document.querySelectorAll('.tab-content');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));
            item.classList.add('active');
            document.getElementById(item.getAttribute('data-tab')).classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 🐛 BUG 2 CORRIGÉ + ✨ NOUVEAU (Modal) : Grille avec fallback CSS local
    const grid = document.getElementById('team-grid');
    const modal = document.getElementById('member-modal');
    
    if (grid) {
        grid.innerHTML = members.map(m => `
            <div class="member-card" onclick="openModal('${m.name}', '${m.role}')">
                <img src="images/${m.id}.jpg" alt="${m.name}" class="member-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="member-fallback-bg" style="display:none;"><i class="fa-solid fa-user"></i></div>
                <h3>${m.name}</h3>
                <p>${m.role}</p>
            </div>
        `).join('');
    }

    // Logique du Modal
    window.openModal = (name, role) => {
        document.getElementById('modal-name').innerText = name;
        document.getElementById('modal-role').innerText = role;
        document.querySelector('.modal-img-placeholder').innerHTML = '<i class="fa-solid fa-star"></i>';
        modal.classList.remove('hide');
    };
    
    document.querySelector('.close-modal').addEventListener('click', () => {
        modal.classList.add('hide');
    });

    // ✨ NOUVEAU : Timer Compte à rebours
    const countDownDate = new Date().getTime() + (14 * 24 * 60 * 60 * 1000); // +14 jours par défaut
    setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        if(distance > 0 && document.getElementById("days")) {
            document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }
    }, 1000);

    // ✨ NOUVEAU : Générateur de Ticket VIP
    const btnTicket = document.getElementById('generate-ticket-btn');
    if(btnTicket) {
        btnTicket.addEventListener('click', () => {
            const name = document.getElementById('fan-name').value;
            if(name.trim() !== "") {
                document.getElementById('ticket-fan-name').innerText = name.toUpperCase();
                document.getElementById('ticket-result').classList.remove('hide');
            } else {
                alert("Mettez votre prénom d'abord !");
            }
        });
    }

    // Animation des compteurs
    document.querySelectorAll('.stat-number').forEach(counter => {
        counter.innerText = counter.getAttribute('data-target') + "+";
    });

    // Thème Sombre / Or
    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('theme-gold-intense');
            themeToggle.querySelector('i').className = document.body.classList.contains('theme-gold-intense') ? "fa-solid fa-sun" : "fa-solid fa-moon";
        });
    }

    // Formulaire Formspree
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if(form && formStatus) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            formStatus.classList.remove('hide');
            formStatus.innerText = "Envoi en cours...";
            formStatus.style.color = "var(--gold)";
            
            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(() => {
                formStatus.innerText = "✓ Demande envoyée à l'équipe !";
                formStatus.style.color = "var(--wa-green)";
                form.reset();
            }).catch(() => {
                formStatus.innerText = "Erreur de réseau. Utilisez WhatsApp en attendant.";
                formStatus.style.color = "red";
            });
        });
    }

        // ✨ Activation officielle de la PWA (Application installable)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('Application JO BAND prête à être installée !', reg))
                .catch(err => console.log('Erreur installation PWA :', err));
        });
    }
