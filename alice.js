/* ==========================================
   ALICE JAVASCRIPT — INTERACTION AUDIO CONTRÔLÉE
========================================== */

'use strict';

var AliceBot = (function () {
    var conversationHistory = [];
    var isTyping = false;
    var joData = null;
    var voiceReady = false;

    function byId(id) {
        return document.getElementById(id);
    }

    function safeText(value) {
        return String(value == null ? '' : value);
    }

    // Charge les infos du fichier JSON de base
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

    // Recherche de réponses en local dans le fichier FAQ
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

    // Gestion de l'audio TTS intelligent sans caractères spéciaux
    function speakText(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel(); // Coupe la voix précédente immédiatement

        // NETTOYAGE : Élimine les astérisques et tous les types d'émojis pour le haut-parleur
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

        // ÉVÉNEMENTS D'ACTIVATION DES MOUVEMENTS DE PAROLE
        utterance.onstart = function () {
            if (widget) {
                widget.classList.remove('idle', 'waiting');
                widget.classList.add('speaking'); // Le capitaine bouge et parle
            }
        };

        utterance.onend = function () {
            if (widget) {
                widget.classList.remove('speaking', 'waiting');
                widget.classList.add('idle'); // Retour à la respiration calme
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

    // Injection propre du texte dans la bulle BD
    function updateBubble(text) {
        var bubble = byId('alice-bubble');
        if (bubble) {
            bubble.innerHTML = text;
            bubble.scrollTop = 0;
        }
    }

    // Envoi de la question
    function handleSend() {
        var input = byId('alice-input');
        if (!input || isTyping) return;

        var text = safeText(input.value).trim();
        if (!text) return;

        input.value = ''; // Vide immédiatement le champ de texte
        isTyping = true;

        var widget = byId('alice-widget');
        if (widget) {
            widget.classList.remove('idle', 'speaking');
            widget.classList.add('waiting'); // Passe en mode "réflexion"
        }

        updateBubble("Je réfléchis... ⚡");

        // 1. Essai avec la base locale FAQ
        var localAnswer = checkLocalAnswer(text);
        if (localAnswer) {
            setTimeout(function () {
                isTyping = false;
                if (widget) widget.classList.remove('waiting');
                updateBubble(localAnswer);
                speakText(localAnswer);
            }, 600);
            return;
        }

        // 2. Requête vers ton API Vercel si inconnu en local
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
            
            // Mise à jour de l'historique
            conversationHistory.push({ role: 'user', content: text });
            conversationHistory.push({ role: 'assistant', content: reply });
            if (conversationHistory.length > 10) {
                conversationHistory.shift();
                conversationHistory.shift();
            }

            if (widget) widget.classList.remove('waiting');
            updateBubble(reply);
            speakText(reply);
        })
        .catch(function (err) {
            console.error(err);
            if (widget) widget.classList.remove('waiting');
            var fallback = 'ALICE est indisponible pour le moment. Contactez le management sur WhatsApp au +228 70 00 25 39.';
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
        window.speechSynthesis.onvoiceschanged = function () {
            voiceReady = true;
        };
    }

    function init() {
        loadData();
        bindVoicesWhenReady();

        var closeBtn = byId('alice-close');
        var sendBtn = byId('alice-send');
        var input = byId('alice-input');

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                var widget = byId('alice-widget');
                if (widget) widget.style.display = 'none'; // Ferme le module
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

    return {
        init: init
    };
})();

document.addEventListener('DOMContentLoaded', function () {
    AliceBot.init();
});
