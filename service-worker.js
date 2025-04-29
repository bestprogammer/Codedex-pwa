self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('codedex-cache-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './offline.html',
        './styles.css',
        './icon-192.png',
        './icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(response => {
      return response || caches.match('./offline.html');
    }))
  );
});
