var currentCache = "more-todos-2016-09-11T20:55:05+0000";
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(currentCache).then(function(cache) {
      return cache.addAll([
        "/more-todos/icon-2x.png",
        "/more-todos/icon-3x.png",
        "/more-todos/icon-4x.png",
        "/more-todos/",
        "/more-todos/index.html",
        "/more-todos/manifest.json",
        "/more-todos/material.min.css",
        "/more-todos/material.min.js",
        "/more-todos/page-about.js",
        "/more-todos/page-main.js",
        "/more-todos/pouchdb.min.js",
        "/more-todos/pubsub.js",
        "/more-todos/repositoryPouchdb.js",
        "/more-todos/riot.min.js",
        "/more-todos/todo.js",
        "/more-todos/todolist.js",
        "/more-todos/system.js"
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
