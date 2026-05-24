export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    var allowedOrigins = [
        'https://jo-band-site.vercel.app',
        'https://jo-band-site-git-main-djpadesco.vercel.app'
    ];
    var origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin',
        allowedOrigins.indexOf(origin) !== -1 ? origin : allowedOrigins[0]);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    var message = req.body.message;
    var history = req.body.history || [];

    if (!message) {
        return res.status(400).json({ error: 'Message requis' });
    }

    var systemPrompt = `Tu es ALICE, l'assistante officielle du collectif artistique togolais JO BAND.
Tu réponds toujours en français sauf si on te parle en anglais.
Tu es chaleureuse, enthousiaste et professionnelle.
Tu peux répondre aux salutations simples (bonjour, salut, coucou, etc.) de façon amicale.
Pour les questions hors JO BAND, redirige poliment vers le collectif.

INFORMATIONS SUR JO BAND :
- Collectif artistique togolais basé à Lomé, Togo
- Slogan : "Partout où ça bouge, Jo Band est là."
- YouTube : @jobandofficiel
- TikTok : @jobandofficiel
- WhatsApp Ligne 1 : +228 97 66 80 21
- WhatsApp Réservations : +228 70 00 25 39
- Site web : jo-band-site.vercel.app

MEMBRES (13 au total) :
- DJ PADESCO : DJ / Humoriste (créateur du site)
- JOEL : Management
- LE FONDATEUR : Fondateur du collectif
- NANA SIKA : Humoriste & Vidéaste
- GEDEON : Humoriste & Danseur
- JEAN : Humoriste & Artiste Chanteur
- THE GACHA : Humoriste & Artiste Chanteur
- AROLE : Caméraman
- L&H : Caméraman
- DK POPI : Humoriste
- ESTHER : Humoriste
- PRISCA : Humoriste
- MAKAFUI : Humoriste

FORMULES :
- Formule Standard : Show Humour + Animation DJ PADESCO & DJ ZÉKA
- Formule Premium VIP : Show complet + DJ Premium + Captation vidéo par Arole & L&H

STATISTIQUES :
- 500K+ vues sur les réseaux sociaux
- 150+ shows réussis
- Disponibles pour mariages, anniversaires, concerts, soirées d'entreprise

Pour toute réservation, oriente toujours vers WhatsApp : +228 70 00 25 39
Sois concise (max 3 phrases) sauf si on demande des détails.`;

    var apis = [
        {
            name: 'groq',
            fn: async function() {
                var key = process.env.GROQ_KEY;
                if (!key || key.length < 10) throw new Error('No Groq key');
                var messages = [{ role: 'system', content: systemPrompt }];
                history.forEach(function(h) { messages.push(h); });
                messages.push({ role: 'user', content: message });
                var r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: 'llama3-8b-8192',
                        messages: messages,
                        max_tokens: 300,
                        temperature: 0.7
                    })
                });
                if (!r.ok) throw new Error('Groq error ' + r.status);
                var d = await r.json();
                return d.choices[0].message.content;
            }
        },
        {
            name: 'gemini',
            fn: async function() {
                var key = process.env.GEMINI_KEY;
                if (!key || key.length < 10) throw new Error('No Gemini key');
                var contents = [];
                history.forEach(function(h) {
                    contents.push({
                        role: h.role === 'assistant' ? 'model' : 'user',
                        parts: [{ text: h.content }]
                    });
                });
                contents.push({ role: 'user', parts: [{ text: message }] });
                var r = await fetch(
                    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + key,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            systemInstruction: { parts: [{ text: systemPrompt }] },
                            contents: contents,
                            generationConfig: { maxOutputTokens: 300 }
                        })
                    }
                );
                if (!r.ok) throw new Error('Gemini error ' + r.status);
                var d = await r.json();
                return d.candidates[0].content.parts[0].text;
            }
        },
        {
            name: 'mistral',
            fn: async function() {
                var key = process.env.MISTRAL_KEY;
                if (!key || key.length < 10) throw new Error('No Mistral key');
                var messages = [{ role: 'system', content: systemPrompt }];
                history.forEach(function(h) { messages.push(h); });
                messages.push({ role: 'user', content: message });
                var r = await fetch('https://api.mistral.ai/v1/chat/completions', {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: 'mistral-small-latest',
                        messages: messages,
                        max_tokens: 300
                    })
                });
                if (!r.ok) throw new Error('Mistral error ' + r.status);
                var d = await r.json();
                return d.choices[0].message.content;
            }
        }
    ];

    for (var i = 0; i < apis.length; i++) {
        try {
            var result = await Promise.race([
                apis[i].fn(),
                new Promise(function(_, reject) {
                    setTimeout(function() { reject(new Error('timeout')); }, 8000);
                })
            ]);
            return res.status(200).json({ reply: result, source: apis[i].name });
        } catch (e) {
            continue;
        }
    }

    return res.status(200).json({
        reply: "Je suis momentanément indisponible. Contactez JO BAND directement sur WhatsApp au +228 70 00 25 39 !",
        source: 'fallback'
    });
}