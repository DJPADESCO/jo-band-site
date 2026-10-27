const APP_VERSION = '2026.10.27.2';
const CACHE_NAME = `joband-cache-v-${APP_VERSION}`;

const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/alice.css',
  '/script.js',
  '/alice.js',
  '/ui-effects.js',
  '/youtube-gallery.js',
  '/manifest.json',
  '/privacy_policy.html',
  '/terms_of_use.html',
  '/alice-data.json',
  '/images/logo.jpg',
  '/images/icon-192.png'
];


/* INSTALLATION */
self.addEventListener('install', event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
    .then(cache => {

      return Promise.all(
        ASSETS.map(file => {

          return fetch(file)
          .then(response => {

            if(response.ok){
              return cache.put(file,response);
            }

          })
          .catch(() => {
            console.warn('Cache ignoré :', file);
          });

        })
      );

    })
    .then(() => {

      if(self.skipWaiting){
        return self.skipWaiting();
      }

    })

  );

});


/* ACTIVATION */
self.addEventListener('activate', event => {

  event.waitUntil(

    caches.keys()
    .then(keys => {

      return Promise.all(

        keys.map(key => {

          if(key !== CACHE_NAME){

            return caches.delete(key);

          }

        })

      );

    })

    .then(() => {

      if(self.clients && self.clients.claim){

        return self.clients.claim();

      }

    })

  );

});


/* REQUETES
   - /api/*, panneau admin, sw.js : jamais interceptés (toujours le réseau, toujours à jour)
   - alice-data.json (événements) : réseau d'abord, cache en secours
   - le reste du site : affiché tout de suite depuis le téléphone, mis à jour en arrière-plan
*/
const NETWORK_ONLY = [/^\/api\//, /^\/config-system-v5/, /^\/sw\.js/, /^\/firebase-messaging-sw\.js/];
const NETWORK_FIRST = [/^\/alice-data\.json/];

function putInCache(request, response) {
  if (response && response.status === 200 && response.type === 'basic') {
    const clone = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(request, clone)).catch(() => {});
  }
}

self.addEventListener('fetch', event => {

  const request = event.request;
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return;

  const path = new URL(request.url).pathname;
  if (NETWORK_ONLY.some(re => re.test(path))) return;

  const isNavigation = request.mode === 'navigate';
  const isHome = isNavigation && (path === '/' || path === '/index.html');
  const key = isHome ? '/index.html' : request;
  const matchOptions = isNavigation ? { ignoreSearch: true } : {};

  /* Réseau d'abord (avec cache en secours) */
  if (NETWORK_FIRST.some(re => re.test(path))) {
    event.respondWith(
      fetch(request)
        .then(response => { putInCache(request, response); return response; })
        .catch(() => caches.match(request))
    );
    return;
  }

  /* Cache d'abord + mise à jour en arrière-plan */
  event.respondWith(
    caches.match(key, matchOptions).then(cached => {
      const network = fetch(request)
        .then(response => {
          putInCache(key, response);
          return response;
        })
        .catch(() => null);

      if (cached) {
        event.waitUntil(network);   // rafraîchit le cache sans faire attendre l'affichage
        return cached;
      }
      return network.then(response => response || caches.match('/index.html'));
    })
  );

});
