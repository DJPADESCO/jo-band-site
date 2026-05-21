'use strict';

var AliceBot = (function () {
    var conversationHistory = [];
    var isOpen = false;
    var isTyping = false;
    var joData = null;
    var hasGreeted = false;
    var voiceReady = false;

    function byId(id) {
        return document.getElementById(id);
    }

    function safeText(value) {
        return String(value == null ? '' : value);
    }

    function loadData() {
        return fetch('/alice-data.json', { cache: 'no-store' })
            .then(function (r) {
                if (!r.ok) throw new Error('Impossible de charger alice-data.json');
                return r.json();
            })
            .then(function (d) {
                joData = d || null;
            })
            .catch(function () {
                joData = null;
            });
    }

    function getFaqList() {
        if (!joData || !Array.isArray(joData.faq)) return [];
        return joData.faq;
    }

    function checkLocalAnswer(message) {
        var faqList = getFaqList();
        if (!faqList.length) return null;

        var msg = safeText(message).toLowerCase();

        for (var i = 0; i < faqList.length; i++) {
            var faq = faqList[i] || {};
            var questions = Array.isArray(faq.questions) ? faq.questions : [];

            for (var j = 0; j < questions.length; j++) {
                var q = safeText(questions[j]).toLowerCase().trim();
                if (q && msg.indexOf(q) !== -1) {
                    return faq.answer || null;
                }
            }
        }

        return null;
    }

    function sendToAPI(message) {
        return fetch('/api/alice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: message,
                history: conversationHistory.slice(-6)
            })
        })
        .then(function (r) {
            if (!r.ok) throw new Error('API error');
            return r.json();
        })
        .then(function (d) {
            return d && d.reply ? d.reply : 'Je n’ai pas reçu de réponse valide.';
        });
    }

    function addMessage(text, sender) {
        var container = byId('alice-messages');
        if (!container) return;

        var div = document.createElement('div');
        div.className = 'alice-msg alice-msg-' + sender;

        if (sender === 'bot') {
            var avatar = document.createElement('div');
            avatar.className = 'alice-avatar';
            avatar.textContent = 'A';

            var bubble = document.createElement('div');
            bubble.className = 'alice-bubble';
            bubble.textContent = safeText(text);

            div.appendChild(avatar);
            div.appendChild(bubble);
        } else {
            var bubbleUser = document.createElement('div');
            bubbleUser.className = 'alice-bubble';
            bubbleUser.textContent = safeText(text);
            div.appendChild(bubbleUser);
        }

        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    function showTyping() {
        var container = byId('alice-messages');
        if (!container) return;

        var wrap = document.createElement('div');
        wrap.className = 'alice-msg alice-msg-bot';
        wrap.id = 'alice-typing';

        var avatar = document.createElement('div');
        avatar.className = 'alice-avatar';
        avatar.textContent = 'A';

        var bubble = document.createElement('div');
        bubble.className = 'alice-bubble alice-typing-dots';

        var dot1 = document.createElement('span');
        var dot2 = document.createElement('span');
        var dot3 = document.createElement('span');

        bubble.appendChild(dot1);
        bubble.appendChild(dot2);
        bubble.appendChild(dot3);

        wrap.appendChild(avatar);
        wrap.appendChild(bubble);

        container.appendChild(wrap);
        container.scrollTop = container.scrollHeight;
    }

    function hideTyping() {
        var el = byId('alice-typing');
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    }

    function setSpeaking(on) {
        var fab = byId('alice-fab');
        if (!fab) return;
        if (on) fab.classList.add('is-speaking');
        else fab.classList.remove('is-speaking');
    }

    function cleanSpeechText(text) {
        return safeText(text)
            .replace(/[*_`~]/g, ' ')
            .replace(/[😘😍🥳👍🔥💯🎧👋😔😭😅😂🤣❤️❤✨🎉🎵🎶🫶🙂🙃😉😎🤖]/g, '')
            .replace(/[<>]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function pickVoice() {
        if (!('speechSynthesis' in window)) return null;

        var voices = window.speechSynthesis.getVoices();
        if (!voices || !voices.length) return null;

        var preferred =
            voices.find(function (v) { return /Microsoft/i.test(v.name) && /fr/i.test(v.lang); }) ||
            voices.find(function (v) { return /Google/i.test(v.name) && /fr/i.test(v.lang); }) ||
            voices.find(function (v) { return /fr/i.test(v.lang); }) ||
            voices[0];

        return preferred || null;
    }

    function speakText(text) {
        if (!('speechSynthesis' in window)) return;

        var finalText = cleanSpeechText(text);
        if (!finalText) return;

        try {
            window.speechSynthesis.cancel();
        } catch (e) {}

        var utter = new SpeechSynthesisUtterance(finalText);
        utter.lang = 'fr-FR';
        utter.rate = 0.95;
        utter.pitch = 1;

        var voice = pickVoice();
        if (voice) {
            utter.voice = voice;
        }

        utter.onstart = function () {
            setSpeaking(true);
        };

        utter.onend = function () {
            setSpeaking(false);
        };

        utter.onerror = function () {
            setSpeaking(false);
        };

        window.speechSynthesis.speak(utter);
    }

    function greetAliceVisual() {
        var fab = byId('alice-fab');
        if (!fab) return;

        fab.classList.add('is-greeting');
        window.setTimeout(function () {
            fab.classList.remove('is-greeting');
        }, 1200);
    }

    function openChat() {
        var widget = byId('alice-widget');
        var fab = byId('alice-fab');
        var input = byId('alice-input');

        if (!widget || !fab) return;

        widget.style.display = 'flex';
        fab.style.display = 'none';
        isOpen = true;

        if (!hasGreeted) {
            hasGreeted = true;
            window.setTimeout(function () {
                var welcome = 'Salut 👋, soyez les bienvenus sur JO BAND 😘🥳🔥💯🎧';
                addMessage(welcome, 'bot');
                speakText('Salut, soyez les bienvenus sur JO BAND. Comment puis-je vous aider ?');
            }, 250);
        }

        if (input) input.focus();
    }

    function closeChat() {
        var widget = byId('alice-widget');
        var fab = byId('alice-fab');

        if (!widget || !fab) return;

        widget.style.display = 'none';
        fab.style.display = 'flex';
        isOpen = false;
    }

    function toggleChat() {
        if (isOpen) closeChat();
        else openChat();
    }

    function handleSend() {
        if (isTyping) return;

        var input = byId('alice-input');
        if (!input) return;

        var message = input.value.trim();
        if (!message) return;

        input.value = '';
        addMessage(message, 'user');
        conversationHistory.push({ role: 'user', content: message });

        isTyping = true;
        showTyping();

        var localAnswer = checkLocalAnswer(message);

        if (localAnswer) {
            window.setTimeout(function () {
                hideTyping();
                addMessage(localAnswer, 'bot');
                conversationHistory.push({ role: 'assistant', content: localAnswer });
                speakText(localAnswer);
                isTyping = false;
            }, 500);
            return;
        }

        sendToAPI(message)
            .then(function (reply) {
                hideTyping();
                addMessage(reply, 'bot');
                conversationHistory.push({ role: 'assistant', content: reply });
                speakText(reply);
            })
            .catch(function () {
                hideTyping();
                var fallback = 'Je suis momentanément indisponible. Contactez-nous sur WhatsApp au +228 70 00 25 39.';
                addMessage(fallback, 'bot');
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

        if (voiceReady) return;

        window.speechSynthesis.onvoiceschanged = function () {
            voiceReady = true;
        };
    }

    function init() {
        loadData();
        bindVoicesWhenReady();

        var fab = byId('alice-fab');
        var closeBtn = byId('alice-close');
        var sendBtn = byId('alice-send');
        var input = byId('alice-input');

        if (fab) fab.addEventListener('click', toggleChat);
        if (closeBtn) closeBtn.addEventListener('click', closeChat);
        if (sendBtn) sendBtn.addEventListener('click', handleSend);

        if (input) {
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            });
        }

        greetAliceVisual();
    }

    return {
        init: init
    };
})();

document.addEventListener('DOMContentLoaded', function () {
    AliceBot.init();
});