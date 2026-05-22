/* ==========================================
   ALICE JAVASCRIPT — LIVE STAGE & CLOUDINARY
========================================== */

'use strict';

var AliceBot = (function () {
    var conversationHistory = [];
    var isTyping = false;
    var joData = null;
    var voiceReady = false;

    function byId(id) { return document.getElementById(id); }
    function safeText(value) { return String(value == null ? '' : value); }

    // --- NOUVEAUTÉ : Connexion Cloudinary ---
    function getCloudinaryUrl(publicId) {
        if (!publicId) return '';
        if (publicId.startsWith('http')) return publicId;
        // Remplace par ton identifiant Cloudinary si nécessaire, ici dsk6ndsb0
        return `https://res.cloudinary.com/dsk6ndsb0/image/upload/f_auto,q_auto/${publicId}`;
    }

    function loadImages() {
        var fabAvatar = byId('alice-fab-avatar');
        var stageAvatar = byId('alice-avatar-img');
        
        // Assure-toi que "alice-avatar.png" est bien le nom de l'image sur ton Cloudinary
        var avatarUrl = getCloudinaryUrl('alice-avatar.png'); 
        
        if (fabAvatar) fabAvatar.src = avatarUrl;
        if (stageAvatar) stageAvatar.src = avatarUrl;
    }

    function loadData() {
        return fetch('/alice-data.json', { cache: 'no-store' })
            .then(function (r) {
                if (!r.ok) throw new Error('Impossible de charger alice-data.json');
                return r.json();
            })
            .then(function (d) { joData = d || null; })
            .catch(function () { joData = null; });
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
            var faq = faqList[i] || {};
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

    function speakText(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel(); 

        var cleanText = safeText(text)
            .replace(/\*/g, '')
            .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}]/gu, '');

        var utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'fr-FR';

        var voices = window.speechSynthesis.getVoices();
        var frenchVoice = voices.find(function (v) {
            return v.lang.indexOf('fr') === 0 && (v.name.includes('Google') || v.name.includes('Natural'));
        });
        if (frenchVoice) utterance.voice = frenchVoice;

        var widget = byId('alice-widget');

        utterance.onstart = function () {
            if (widget) {
                widget.classList.remove('idle', 'waiting');
                widget.classList.add('speaking');
            }
        };

        utterance.onend = function () {
            if (widget) {
                widget.classList.remove('speaking', 'waiting');
                widget.classList.add('idle');
            }
        };

        utterance.onerror = function () {
            if (widget) {
                widget.classList.remove('speaking', 'waiting');
                widget.classList.add('idle');
            }
        };

        window.speechSynthesis.speak(utterance);
    }

    function updateBubble(text) {
        var bubble = byId('alice-bubble');
        if (bubble) {
            bubble.innerHTML = text;
            bubble.scrollTop = 0;
        }
    }

    function handleSend() {
        var input = byId('alice-input');
        if (!input || isTyping) return;

        var text = safeText(input.value).trim();
        if (!text) return;

        input.value = ''; 
        isTyping = true;

        var widget = byId('alice-widget');
        if (widget) {
            widget.classList.remove('idle', 'speaking');
            widget.classList.add('waiting'); 
        }

        updateBubble("Je réfléchis... ⚡");

        var localAnswer = checkLocalAnswer(text);
        if (localAnswer) {
            setTimeout(function () {
                isTyping = false;
                if (widget) {
                    widget.classList.remove('waiting');
                    widget.classList.add('idle');
                }
                updateBubble(localAnswer);
                speakText(localAnswer);
            }, 600);
            return;
        }

        fetch('/api/alice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text, history: conversationHistory })
        })
        .then(function (r) {
            if (!r.ok) throw new Error('Erreur API');
            return r.json();
        })
        .then(function (data) {
            var reply = data.reply || "Je n'ai pas reçu de réponse stable.";
            conversationHistory.push({ role: 'user', content: text });
            conversationHistory.push({ role: 'assistant', content: reply });
            if (conversationHistory.length > 10) {
                conversationHistory.shift();
                conversationHistory.shift();
            }

            if (widget) {
                widget.classList.remove('waiting');
                widget.classList.add('idle');
            }
            updateBubble(reply);
            speakText(reply);
        })
        .catch(function (err) {
            console.error(err);
            if (widget) {
                widget.classList.remove('waiting');
                widget.classList.add('idle');
            }
            var fallback = 'ALICE est indisponible pour le moment.';
            updateBubble(fallback);
            speakText(fallback);
        })
        .finally(function () {
            isTyping = false;
        });
    }

    function bindVoicesWhenReady() {
        if (!('speechSynthesis' in window)) return;
        var voices = window.speechSynthesis.getVoices();
        if (voices && voices.length) {
            voiceReady = true;
            return;
        }
        window.speechSynthesis.onvoiceschanged = function () { voiceReady = true; };
    }

    function init() {
        loadData();
        loadImages(); // Charge l'avatar depuis Cloudinary
        bindVoicesWhenReady();

        var fab = byId('alice-fab');
        var closeBtn = byId('alice-close');
        var sendBtn = byId('alice-send');
        var input = byId('alice-input');
        var widget = byId('alice-widget');

        // Ouverture et fermeture du widget
        if (fab) {
            fab.addEventListener('click', function() {
                if (widget) {
                    widget.style.display = 'flex';
                    fab.style.display = 'none'; // Cache le bouton quand c'est ouvert
                }
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                if (widget) {
                    widget.style.display = 'none';
                    if (fab) fab.style.display = 'block'; // Réaffiche le bouton
                }
            });
        }

        if (sendBtn) sendBtn.addEventListener('click', handleSend);

        if (input) {
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            });
        }
    }

    return { init: init };
})();

document.addEventListener('DOMContentLoaded', function () {
    AliceBot.init();
});
