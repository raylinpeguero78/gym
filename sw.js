

// Asignar un nombre al caché (sin caracteres especiales)
const CACHE_NAME = 'retos-adelgazar-cache';
const urlsToCache = [
  'index.html',
  'index.css',
  'index.js',

  '1.png',
  '2.png',
  // Agrega otras rutas de recursos que quieras cachear
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(error => {
        console.log('Error al registrar el Service Worker:', error);
      });
  });
}


// service-worker.js

// service-worker.js


self.addEventListener('message', function(event) {
  console.log('inside message listener');
  event.ports[0].postMessage({'test': 'This is my response.'});
});

self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  
  const title = 'Notificación de Práctica'; // Cambia esto por el título que desees
  const options = {
    body: "Es hora para la práctica",
    icon: '2.png',
    text: '¿Listo para la rutina?',
    vibrate: [100, 50, 100]
  };
  
  console.log("data :: " + event.data.text());
  event.waitUntil(self.registration.showNotification(title, options));
});

