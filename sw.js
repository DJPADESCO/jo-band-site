const APP_VERSION = '2026.07.13.18'; // Changez ce numéro pour forcer la mise à jour
const CACHE_NAME = `joband-cache-v-${APP_VERSION}`;

const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/privacy_policy.html',
  '/terms_of_use.html',
  '/images/logo.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Stratégie corrigée et sécurisée pour l'iPhone 7
self.addEventListener('fetch', e => {
  // On ne gère en cache QUE les requêtes de notre propre site
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) {
    return; // Laisse passer le réseau normal pour les API/Firestore sans bloquer
  }

  e.respondWith(
    fetch(e.request).then(response => {
      // On vérifie que la réponse du réseau est valide avant de la mettre en cache
      if (response && response.status === 200) {
        const resClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, resClone));
      }
      return response;
    }).catch(() => {
      // Si le réseau est coupé (hors-ligne), on cherche dans le cache
      return caches.match(e.request);
    })
  );
});
