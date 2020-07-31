const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

// we are creating a cache name
// No need to reload an image everytime we go online 
const self = this;

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opened Cache');

            return cache.addAll(urlsToCache);
        })
    )

});

// Listen for Requests
self.addEventListener('fetch', (event) => {

    // caches.match is like promise
    // we match all the requests that the page is receiving
    event.respondWith(
        caches.match(event.request)
        .then(() => {
            return fetch(event.request)
            //if it cannot fetch online internet connection then we get information form the Offline.html
            .catch(() => caches.match('offline.html'))
        })


    )
    
});

//  Activate the SW
self.addEventListener('activate', (event) => {
    //lot of versions of caches
    // remove previous caches and keep the latest version

    const cacheWhitelist = []
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cachenames) => Promise.all(
            cachenames.map((cacheName) =>{
                if(!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })

        ))
    )
    
});