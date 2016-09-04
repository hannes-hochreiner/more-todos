var currentCache = "more-todos-v1.1";

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(currentCache).then(function(cache) {
      return cache.addAll([
        "icon-2x.png",
        "icon-3x.png",
        "icon-4x.png",
        "/",
        "/index.html",
        "/manifest.json",
        "/material.min.css",
        "/material.min.js",
        "/pouchdb.min.js",
        "/pubsub.js",
        "/repositoryPouchdb.js",
        "/riot.min.js",
        "/todo.js",
        "/todolist.js"
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== currentCache;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
