const version ="version1";
this.addEventListener('install', event => {
    event.waitUntil(
        caches.open(version)
        .then(cache => {
          return cache.addAll([
            '/index.html',
            '/Styles/normalize.min.css',
            '/Img/80a9750d105c49b56beaaa84a6ff2667.jpg',
            '/Styles/main.css'
          ]);
        }).catch((err=> console.log(err + " got rejected")))
    );
},false);

/**
 * Fetch event
 *
 * Event triggered whenever a network request is made. You can decide wether you
 * want to serve content from cache or fetch network
 * we could have added contents not previously add using the .add(url)
 * but the contents not added to the cache are to large 
 * which may exceed the browser storage.
 */
this.addEventListener('fetch', event => {
    event.respondWith(    // extends the fetch event.
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request); 
        })
    );
});

this.addEventListener('activate', event => {
    console.log("Activated");
},false);
