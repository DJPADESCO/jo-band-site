'use strict';

var AliceBot = (function () {
    var conversationHistory = [];
    var isOpen = false;
    var isTyping = false;
    var joData = null;
    var hasGreeted = false;

    function byId(id) {
        return document.getElementById(id);
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

        var msg = String(message || '').toLowerCase();

        for (var i = 0; i < faqList.length; i++) {
            var faq = faqList[i] || {};
            var questions = Array.isArray(faq.questions) ? faq.questions : [];

            for (var j = 0; j < questions.length; j++) {
                var q = String(questions[j] || '').toLowerCase().trim();
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
            bubble.textContent = text;

            div.appendChild(avatar);
            div.appendChild(bubble);
        } else {
            var bubbleUser = document.createElement('div');
            bubbleUser.className = 'alice-bubble';
            bubbleUser.textContent = text;
            div.appendChild(bubbleUser);
        }

        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    function showTyping() {
        var container = byId('alice-messages');
        if (!container) return;

        var div = document.createElement('div');
        div.className = 'alice-msg alice-msg-bot';
        div.id = 'alice-typing';

        var avatar = document.createElement('div');
        avatar.className = 'alice-avatar';
        avatar.textContent = 'A';

        var bubble = document.createElement('div');
        bubble.className = 'alice-bubble alice-typing-dots';
        bubble.innerHTML = '<span></span><span></span><span></span>';

        div.appendChild(avatar);
        div.appendChild(bubble);

        container.appendChild(div);
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

    function speakText(text) {
        if (!('speechSynthesis' in window)) return;

        var utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'fr-FR';
        utter.rate = 1;
        utter.pitch = 1;

        utter.onstart = function () {
            setSpeaking(true);
        };

        utter.onend = function () {
            setSpeaking(false);
        };

        utter.onerror = function () {
            setSpeaking(false);
        };

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
    }

    function greetAliceVisual() {
        var fab = byId('alice-fab');
        if (!fab) return;

        fab.classList.add('is-greeting');
        setTimeout(function () {
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
            setTimeout(function () {
                var welcome = 'Salut 👋, soyez les bienvenus sur JO BAND 😘🥳🔥💯🎧';
                addMessage(welcome, 'bot');
                speakText('Salut, soyez les bienvenus sur JO BAND.');
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
            setTimeout(function () {
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

    function init() {
        loadData();

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
            var welcome = 'Salut 👋, soyez les bienvenus sur JO BAND 😘🥳🔥💯🎧';
addMessage(welcome, 'bot');
speakText('Salut, soyez les bienvenus sur JO BAND.');

    return { init: init };
})();

document.addEventListener('DOMContentLoaded', function () {
    AliceBot.init();
});
