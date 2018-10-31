var staticCacheName = 'mws-static-v3';

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(staticCacheName).then(function(cache) {
        return cache.addAll([
            '/',
            '/css/styles.css',
            '/js/main.js',
            '/js/dbhelper.js',
            '/js/restaurant_info.js',
            '/restaurant.html'
        ]);
      })
    );
  });

  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName.startsWith('mws-') &&
                   cacheName != staticCacheName;
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });

