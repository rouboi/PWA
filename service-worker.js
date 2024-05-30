var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'product.js',
    'petstore.webmanisfest',
    'images/yarn.jpg',
    'images/Cat-litter.jpg',
    'images/laser-Pointer.jpg',
    'images/cat-House.jpg',
    'images/icon-store-512.jpg',
];

self.addEventListener('install', (e) =>{
    console.log('[service worker] install');
    e.waituntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function (e){
    e.respondwith(
        caches.match(e.request).then(function (r) {
            return r|| fetch(e.request).then(function (response){
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                })
            });
        })
    );
});