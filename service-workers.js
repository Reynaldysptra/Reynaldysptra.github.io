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

     // if(url.origin === location.origin) {
          event.respondWith(cacheFirst(req))
     // }else {
          // event.respondWith(networkRequest(req));
     // }
})

self.addEventListener('activate', function (event) {
     event.waitUntil(
          caches.keys().then(key => {
               key.forEach(keys => {
                    if(keys != cahce_name) caches.delete(keys);
               })
          })
     )
});

async function cacheFirst(req) {
     const cache = await caches.open(cahce_name);
     const cached = await cache.match(req);
     return cached || fetch(req);
}

async function networkRequest(requ) {
     const cache = await caches.open(cahce_name);

     try {
          const fresh = await fetch(req);
          await cache.put(req, fresh.clone());
          return fresh;
     } catch (e) {
          const cached = await cache.match(req);
          return cached;
     }
}
