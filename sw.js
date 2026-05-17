'use strict';

// Nom du cache pour l'application JO BAND
const CACHE_NAME = 'joband-cache-v1';

// Fichiers de base à mettre en cache pour le fonctionnement hors-ligne
const ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/images/logo.jpg'
];

// Installation du Service Worker et mise en cache des composants vitaux
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(ASSETS);
        })
    );
});

// Activation du Service Worker
self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim());
});

// Stratégie réseau : charge du cache d'abord, sinon va sur internet
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
