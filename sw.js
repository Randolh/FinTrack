const CACHE_NAME = 'fintrack-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './favicon.svg',
  './css/main.css',
  './css/layout.css',
  './css/components.css',
  './css/views.css',
  './js/app.js',
  './js/store.js',
  './js/finance.js',
  './js/ui.js',
  './js/i18n.js',
  './js/views/dashboard.js',
  './js/views/transactions.js',
  './js/views/journal.js',
  './js/views/settings.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
