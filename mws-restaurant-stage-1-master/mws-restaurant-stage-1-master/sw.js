let myCacheName = "Cache";
let load = [
  // './', './index.html', './restaurant.html', './css/styles.css', './data/restaurant.json', './js/dbheper.js', './js/main.js', './js/restaurant_info.js', './README.md', './CODEOWNERS', './js/register.js',
  // './img/1.jpg', './img/2.jpg', './img/3.jpg', './img/4.jpg', './img/5.jpg', './img/6.jpg', './img/7.jpg', './img/8.jpg', './img/9.jpg', './img/10.jpg'
];

// Installing Service worker
this.addEventListener('install', (ev) => {
  // wait until given functionality is finished
  ev.waitUntil(
    // opens `Cache` and loads
    caches.open(myCacheName).then((ca) => {
      ca.addAll(load);
    })
  );
});

//fetching service worker
this.addEventListener('fetch', (e) => {
  e.respondWith(
    //opens the caches
    caches.open(myCacheName).then((ca) => {
      //If founds in cache return it.
      //Else fetch it from server.
      return ca.match(e.request).then((res) => {
        //After fetching put the fetched data into cache and return it.
        return res || fetch(e.request).then((res) => {
          ca.put(e.request, res.clone())
          return res;
        })
      })
    })
  )
});

//Activating service worker
this.addEventListener('activate', function(event) {
  var cacheWhitelist = ['page-cache-v1', 'blog-post-cache-v1'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
