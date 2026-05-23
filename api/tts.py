from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import asyncio
import edge_tts
import json

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        length = int(self.headers.get('Content-Length', 0))
        body   = json.loads(self.rfile.read(length)) if length else {}

        texte  = body.get('texte', 'Bonjour')
        langue = body.get('langue', 'fr')
        voice  = 'en-US-JennyNeural' if langue == 'en' else 'fr-FR-DeniseNeural'

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        try:
            communicate  = edge_tts.Communicate(texte, voice)
            audio_data   = loop.run_until_complete(self._get_audio(communicate))

            self.send_response(200)
            self.send_header('Content-Type', 'audio/mpeg')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(audio_data)

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())

        finally:
            loop.close()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    async def _get_audio(self, communicate):
        chunks = []
        async for chunk in communicate.stream():
            if chunk['type'] == 'audio':
                chunks.append(chunk['data'])
        return b''.join(chunks)