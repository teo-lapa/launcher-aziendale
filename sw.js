// Service Worker per PWA Launcher Aziendale
const CACHE_NAME = 'launcher-aziendale-v1.0';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Installazione del Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aperta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercetta le richieste di rete
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - restituisce la risposta dalla cache
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Aggiornamento del Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminazione cache vecchia:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});