self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('codedex-cache-v1').then(cache => {
      return cache.addAll([
        './offline.html',
        './icon-192.png',
        './icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match('./offline.html');
    })
  );
});
