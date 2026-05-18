const CACHE_NAME = 'joband-cache-v2'; // Changez le numéro de version à chaque mise à jour

// On ne met en cache que les fichiers strictement vitaux au démarrage
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/images/logo.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // Force l'activation immédiate
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Supprime l'ancien cache bloquant
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Stratégie Réseau en premier pour éviter le blocage de mise à jour
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(response => {
      // Si le réseau fonctionne, on met à jour le cache
      if(e.request.method === 'GET') {
        const resClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, resClone));
      }
      return response;
    }).catch(() => {
      // Si pas d'internet (mode hors-ligne), on utilise le cache
      return caches.match(e.request);
    })
  );
});
