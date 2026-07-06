const APP_VERSION = '2026.07.06.20'; // Modifiez cette date à chaque mise à jour de votre site
const CACHE_NAME = `joband-cache-v-${APP_VERSION}`; // Crée le nom du cache automatiquement

// Fichiers vitaux mis en cache au démarrage
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/images/logo.jpg'
];

// Installation du Service Worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // Force l'activation immédiate
  );
});

// Nettoyage des anciens caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Supprime l'ancien cache devenu inutile
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Stratégie : Réseau en premier, Cache en secours
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(response => {
      // Si le réseau fonctionne, on met à jour le cache (uniquement pour les requêtes GET)
      if(e.request.method === 'GET') {
        const resClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, resClone));
      }
      return response;
    }).catch(() => {
      // Si pas d'internet, on utilise le cache
      return caches.match(e.request);
    })
  );
});
