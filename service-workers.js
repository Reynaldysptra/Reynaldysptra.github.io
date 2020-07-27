const cahce_name = 'version1';
const cache = [
     './',
     './index.html',
     '../src/pages/tentang.html',
     '../src/pages/tiket.html',
     './src/script/jquery-3.5.1.min.js',
     './src/style/icon.css',
     './src/style/materialize.min.css',
     '../src/script/application.js',
     '../src/script/materialize.js',
     '../src/script/registryWorker.js',
     '../src/style/style.css',
     './img/icon.png',
     './img/logo.png',
     './img/me.jpg',
     ''
];

self.addEventListener('install', function (event) {
     event.waitUntil(
          caches.open(cahce_name).then(response => {
               console.log('Cache berhasil ditambahkan')
               response.addAll(cache);
          })
     )
})

self.addEventListener('fetch', function (event) {
     const req = event.request;
     const url = new URL(req.url);

     event.respondWith(
          caches.open(cahce_name).then(function (cache) {
               return cache.match(event.request).then(function (response) {
                    var fetchPromise = fetch(event.request).then(function (networkResponse) {
                         cache.put(event.request, networkResponse.clone());
                         return networkResponse;
                    })
                    return response || fetchPromise;
               })
          })
     );
})

self.addEventListener('activate', function (event) {
     event.waitUntil(
          caches.keys().then(key => {
               key.forEach(keys => {
                    if (keys != cahce_name) caches.delete(keys);
               })
          })
     )
});