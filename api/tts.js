const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { texte, langue } = req.body;
  const voix = langue === 'en'
    ? 'en-US-JennyNeural'
    : 'fr-FR-DeniseNeural';

  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(voix, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    const readable = await tts.toStream(texte);
    const chunks = [];

    await new Promise((resolve, reject) => {
      readable.on('data', chunk => chunks.push(chunk));
      readable.on('end', resolve);
      readable.on('error', reject);
    });

    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(Buffer.concat(chunks));

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};