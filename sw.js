// WORKBOX
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.loadModule('workbox-routing');
workbox.loadModule('workbox-strategies');
workbox.loadModule('workbox-precaching');

//Menambahkan cache di awal membuka website (precache)
workbox.precaching.precacheAndRoute([
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/team.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/styles.css', revision: '1' },
    { url: '/img/notification.png', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/helper.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/registerServiceWorker.js', revision: '1' },
    { url: '/js/render.js', revision: '1' },
    { url: '/js/teamDetails.js', revision: '1' },
    { url: '/icon-192.png', revision: '1' },
    { url: '/icon-512.png', revision: '1' },
]);


workbox.routing.setCatchHandler(({url, event, params}) => {
  console.log(url);
  if(/team\.html/.test(url.href)){
    return caches.match('/team.html')
  }
});

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Menyimpan cache untuk file font dari Google Fonts selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// Menyimpan cache berkas halaman
workbox.routing.registerRoute(
    new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'pages'
      })
);

// Menyimpan cache page detail team
workbox.routing.registerRoute(
    new RegExp('/team.html'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'team-details',
          plugins: [
            new workbox.expiration.Plugin({
              maxAgeSeconds: 60 * 60 * 24 * 30,
              maxEntries: 20,
            })
          ],
      })
);

// Menyimpan cache request ke api selama 30 hari
workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org\/v2\//, 
  workbox.strategies.networkFirst({
    cacheName: 'football-org-api',
    networkTimeoutSeconds: 7,
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30,
        maxEntries: 60,
      })
    ],
  })
);

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
      icon: '/img/notification.png',
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