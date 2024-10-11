const CACHE_NAME = "my-site-cache-v1";
const urlsToCache = [
  "/index.html",
  "/attendance.html",
  "/admin.html",
  "/attendance.js",
  "/check.json",
  "/admin.js",
  "/check.css",
  "/login.html",
  "/fram.jpeg",
  "/img/black girl.jpeg",
  "/img/blue flower.jpeg",
  "/img/bluepaper.jpeg",
  "/img/downl.jpeg",
  "/img/fram.jpeg",
  "/img/rob.jpeg",
  "/img/wootlab.png",
];

// Install event
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event
self.addEventListener("activate", function (event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches
      .keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        var responseToCache = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});
