/* ==========================================
   ALICE JAVASCRIPT — LIVE STAGE & CLOUDINARY
========================================== */

'use strict';

var AliceBot = (function () {
    var conversationHistory = [];
    var isTyping            = false;
    var joData              = null;

    function byId(id)      { return document.getElementById(id); }
    function safeText(val) { return String(val == null ? '' : val); }

    /* ── IMAGES ── */
    function loadImages() {
    var fabAvatar = byId('alice-fab-avatar');
    if (fabAvatar) fabAvatar.src = 'images/alice-avatar.png';
    // Avatar du widget supprimé
}

    /* ── DONNÉES FAQ ── */
    function loadData() {
        return fetch('/alice-data.json', { cache: 'no-store' })
            .then(function(r) {
                if (!r.ok) throw new Error('Erreur chargement FAQ');
                return r.json();
            })
            .then(function(d) { joData = d || null; })
            .catch(function()  { joData = null; });
    }

    function getFaqList() {
        if (!joData || !Array.isArray(joData.faq)) return [];
        return joData.faq;
    }

    function checkLocalAnswer(message) {
        var faqList = getFaqList();
        if (!faqList.length) return null;
        var msg = safeText(message).toLowerCase().trim();
        for (var i = 0; i < faqList.length; i++) {
            var faq       = faqList[i] || {};
            var questions = Array.isArray(faq.questions) ? faq.questions : [];
            for (var j = 0; j < questions.length; j++) {
                var q = safeText(questions[j]).toLowerCase().trim();
                if (msg.indexOf(q) !== -1 || q.indexOf(msg) !== -1) {
                    return faq.answer;
                }
            }
        }
        return null;
    }

    /* ── ÉTATS ── */
    function setIdle(widget) {
        if (widget) {
            widget.classList.remove('speaking', 'waiting');
            widget.classList.add('idle');
        }
    }

    function setSpeaking(widget) {
        if (widget) {
            widget.classList.remove('idle', 'waiting');
            widget.classList.add('speaking');
        }
    }

    /* ── VOIX EDGE TTS PAR PHRASES ── */
    function speakText(text) {
        var cleanText = safeText(text)
            .replace(/\*/g, '')
            .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}]/gu, '');

        var widget  = byId('alice-widget');
        var phrases = cleanText.match(/[^.!?]+[.!?]*/g) || [cleanText];
        var index   = 0;

        function jouerPhrase() {
            if (index >= phrases.length) { setIdle(widget); return; }
            var phrase = phrases[index].trim();
            index++;
            if (!phrase) { jouerPhrase(); return; }

            fetch('/api/tts', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ texte: phrase, langue: 'fr' })
            })
            .then(function(r) {
                if (!r.ok) throw new Error('TTS error');
                return r.blob();
            })
            .then(function(blob) {
                var url   = URL.createObjectURL(blob);
                var audio = new Audio(url);
                audio.onplay  = function() { setSpeaking(widget); };
                audio.onended = function() { URL.revokeObjectURL(url); jouerPhrase(); };
                audio.onerror = function() { URL.revokeObjectURL(url); jouerPhrase(); };
                var p = audio.play();
                if (p !== undefined) {
                    p.catch(function() { setIdle(widget); });
                }
            })
            .catch(function() { setIdle(widget); });
        }

        jouerPhrase();
    }

    /* ── BULLE ── */
    function updateBubble(text) {
        var bubble = byId('alice-bubble');
        if (bubble) {
            bubble.innerHTML = text;
            bubble.scrollTop = bubble.scrollHeight;
        }
    }

    /* ── ENVOI MESSAGE ── */
    function handleSend() {
        var input  = byId('alice-input');
        var widget = byId('alice-widget');
        if (!input || isTyping) return;

        var text = safeText(input.value).trim();
        if (!text) return;

        input.value = '';
        isTyping    = true;

        if (widget) {
            widget.classList.remove('idle', 'speaking');
            widget.classList.add('waiting');
        }

        updateBubble('Je réfléchis... ⚡');

        var localAnswer = checkLocalAnswer(text);
        if (localAnswer) {
            setTimeout(function() {
                isTyping = false;
                if (widget) widget.classList.remove('waiting');
                updateBubble(localAnswer);
                speakText(localAnswer);
            }, 600);
            return;
        }

        fetch('/api/alice', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ message: text, history: conversationHistory })
        })
        .then(function(r) {
            if (!r.ok) throw new Error('Erreur API');
            return r.json();
        })
        .then(function(data) {
            var reply = data.reply || "Je n'ai pas reçu de réponse.";
            conversationHistory.push({ role: 'user',      content: text  });
            conversationHistory.push({ role: 'assistant', content: reply });
            if (conversationHistory.length > 10) {
                conversationHistory.shift();
                conversationHistory.shift();
            }
            if (widget) widget.classList.remove('waiting');
            updateBubble(reply);
            speakText(reply);
        })
        .catch(function(err) {
            console.error(err);
            if (widget) widget.classList.remove('waiting');
            var fallback = 'ALICE est indisponible pour le moment.';
            updateBubble(fallback);
            speakText(fallback);
        })
        .finally(function() { isTyping = false; });
    }

    /* ── MICRO (VOIX VERS TEXTE) ── */
    function initMic() {
        var micBtn = byId('alice-mic');
        if (!micBtn) return;

        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            micBtn.style.display = 'none';
            return;
        }

        var recognition        = new SpeechRecognition();
        recognition.lang       = 'fr-FR';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = function(e) {
            var transcript = e.results[0][0].transcript;
            var inp        = byId('alice-input');
            if (inp) {
                inp.value = transcript;
                micBtn.classList.remove('recording');
                setTimeout(function() { handleSend(); }, 300);
            }
        };

        recognition.onerror = function() {
            micBtn.classList.remove('recording');
        };

        recognition.onend = function() {
            micBtn.classList.remove('recording');
        };

        micBtn.addEventListener('click', function() {
            if (micBtn.classList.contains('recording')) {
                recognition.stop();
                micBtn.classList.remove('recording');
            } else {
                recognition.start();
                micBtn.classList.add('recording');
            }
        });
    }

    /* ── INITIALISATION ── */
    function init() {
        loadImages();
        loadData();
        initMic();

        var fab      = byId('alice-fab');
        var closeBtn = byId('alice-close');
        var sendBtn  = byId('alice-send');
        var input    = byId('alice-input');
        var widget   = byId('alice-widget');

        if (fab) {
            fab.addEventListener('click', function() {
                if (widget) widget.style.setProperty('display', 'flex', 'important');
                fab.style.setProperty('display', 'none', 'important');
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                if (widget) widget.style.setProperty('display', 'none', 'important');
                if (fab)    fab.style.setProperty('display', 'flex', 'important');
            });
        }

        if (sendBtn) sendBtn.addEventListener('click', handleSend);

        if (input) {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            });
        }
    }

    return { init: init };
})();

document.addEventListener('DOMContentLoaded', function() {
    AliceBot.init();
initAnnonce();

});

function initAnnonce() {
    fetch('/alice-data.json', { cache: 'no-store' })
        .then(r => r.json())
        .then(data => {
            const annonce = data.annonce;
            if (!annonce || !annonce.actif) return;

            const banner = document.getElementById('annonce-banner');
            const msg    = document.getElementById('annonce-message');
            const lien   = document.getElementById('annonce-lien');
            const close  = document.getElementById('annonce-close');
            if (!banner || !msg) return;

            msg.textContent    = annonce.message || '';
            lien.href          = annonce.lien    || '#';
            lien.textContent   = annonce.lien_texte || 'Voir';
            lien.style.display = annonce.lien ? 'inline-block' : 'none';

            if (annonce.couleur === 'rouge') banner.classList.add('rouge');
            if (annonce.couleur === 'vert')  banner.classList.add('vert');

            banner.style.display = 'flex';
            close.addEventListener('click', () => {
                banner.style.display = 'none';
            });
        })
        .catch(() => {});
}
