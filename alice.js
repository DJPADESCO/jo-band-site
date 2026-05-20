'use strict';

var AliceBot = (function () {

    var conversationHistory = [];
    var isOpen = false;
    var isTyping = false;
    var joData = null;

    function loadData() {
        fetch('/alice-data.json')
            .then(function (r) { return r.json(); })
            .then(function (d) { joData = d; })
            .catch(function () { joData = null; });
    }

    function checkLocalAnswer(message) {
        if (!joData) return null;
        var msg = message.toLowerCase();
        for (var i = 0; i < joData.faq.length; i++) {
            var faq = joData.faq[i];
            for (var j = 0; j < faq.questions.length; j++) {
                if (msg.indexOf(faq.questions[j]) !== -1) {
                    return faq.answer;
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
        .then(function (d) { return d.reply; });
    }

    function addMessage(text, sender) {
        var container = document.getElementById('alice-messages');
        if (!container) return;
        var div = document.createElement('div');
        div.className = 'alice-msg alice-msg-' + sender;
        if (sender === 'bot') {
            div.innerHTML = '<div class="alice-avatar">A</div><div class="alice-bubble">' + text + '</div>';
        } else {
            div.innerHTML = '<div class="alice-bubble">' + text + '</div>';
        }
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    function showTyping() {
        var container = document.getElementById('alice-messages');
        if (!container) return;
        var div = document.createElement('div');
        div.className = 'alice-msg alice-msg-bot';
        div.id = 'alice-typing';
        div.innerHTML = '<div class="alice-avatar">A</div><div class="alice-bubble alice-typing-dots"><span></span><span></span><span></span></div>';
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    function hideTyping() {
        var el = document.getElementById('alice-typing');
        if (el) el.parentNode.removeChild(el);
    }

    function handleSend() {
        if (isTyping) return;
        var input = document.getElementById('alice-input');
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
                isTyping = false;
            }, 600);
            return;
        }

        sendToAPI(message)
            .then(function (reply) {
                hideTyping();
                addMessage(reply, 'bot');
                conversationHistory.push({ role: 'assistant', content: reply });
            })
            .catch(function () {
                hideTyping();
                var fallback = 'Je suis momentanément indisponible. Contactez-nous sur WhatsApp au +228 70 00 25 39 !';
                addMessage(fallback, 'bot');
            })
            .finally(function () {
                isTyping = false;
            });
    }

    function toggleChat() {
        isOpen = !isOpen;
        var widget = document.getElementById('alice-widget');
        var fab = document.getElementById('alice-fab');
        if (!widget || !fab) return;
        if (isOpen) {
            widget.style.display = 'flex';
            fab.style.display = 'none';
            if (conversationHistory.length === 0) {
                setTimeout(function () {
                    addMessage('Bonjour ! Je suis ALICE, l\'assistante officielle de JO BAND. Comment puis-je vous aider ? Réservation, infos sur le groupe, tarifs... je suis là !', 'bot');
                }, 300);
            }
            var input = document.getElementById('alice-input');
            if (input) input.focus();
        } else {
            widget.style.display = 'none';
            fab.style.display = 'flex';
        }
    }

    function init() {
        loadData();

        var fab = document.getElementById('alice-fab');
        var closeBtn = document.getElementById('alice-close');
        var sendBtn = document.getElementById('alice-send');
        var input = document.getElementById('alice-input');

        if (fab) fab.addEventListener('click', toggleChat);
        if (closeBtn) closeBtn.addEventListener('click', toggleChat);
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
