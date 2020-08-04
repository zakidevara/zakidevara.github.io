//Menambahkan Cache
const CACHE_NAME = "champions-league-v2";
let urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/team.html",
  "/pages/favorites.html",
  "/pages/standings.html",
  "/css/materialize.min.css",
  "/css/styles.css",
  "/css/material-icons.css",
  "/js/api.js",
  "/js/db.js",
  "/js/helper.js",
  "/js/idb.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/render.js",
  "/icon-192.png",
  "/icon-512.png"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

//kode agar page menggunakan aset yang sudah diload ke cache dan tidak request ke server
self.addEventListener("fetch", function(event) {
  const BASE_URL = "https://api.football-data.org/v2/";
  const API_KEY = "a17006d015c84eeb991f1b042d3bbd8e";
  const options = {
    headers: new Headers({"X-Auth-Token": API_KEY}),
  };

  if (event.request.url.indexOf(BASE_URL) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request, options).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
          return response || fetch(event.request);
      })
    )
  }
});
  
//Menghapus cache yang lama
self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});

//Handle push event (menampilkan notifikasi)
self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
      body = event.data.text();
  } else {
      body = 'Push message no payload';
  }
  let options = {
      body: body,
      icon: 'img/notification.png',
      vibrate: [100, 50, 100],
      data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
      }
  };
  event.waitUntil(
      self.registration.showNotification('Champions League App', options)
  );
});
