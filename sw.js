const APP_VERSION = '2026.07.21.1';
const CACHE_NAME = `joband-cache-v-${APP_VERSION}`;

const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/alice.css',
  '/script.js',
  '/alice.js',
  '/youtube-gallery.js',
  '/manifest.json',
  '/privacy_policy.html',
  '/terms_of_use.html',
  '/alice-data.json',
  '/images/logo.jpg',
  '/images/logo.png'
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


/* REQUETES */
self.addEventListener('fetch', event => {


  const request = event.request;


  if(
    request.method !== 'GET' ||
    !request.url.startsWith(self.location.origin)
  ){

    return;

  }


  event.respondWith(


    fetch(request)

    .then(response => {


      if(response && response.status === 200){

        const clone = response.clone();


        caches.open(CACHE_NAME)
        .then(cache => {

          cache.put(request,clone);

        });

      }


      return response;


    })


    .catch(() => {


      return caches.match(request)
      .then(cached => {


        return cached || caches.match('/index.html');


      });


    })


  );


});