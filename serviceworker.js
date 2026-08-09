const CACHE_NAME = "ghost-match-v2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];


/* =========================================
   INSTALL
   ========================================= */

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(
          FILES_TO_CACHE
        );

      })

  );

  self.skipWaiting();
});


/* =========================================
   ACTIVATE
   ========================================= */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys()
      .then(cacheNames => {

        return Promise.all(

          cacheNames
            .filter(name =>
              name !== CACHE_NAME
            )
            .map(name =>
              caches.delete(name)
            )

        );

      })
      .then(() => self.clients.claim())

  );
});


/* =========================================
   FETCH
   Network-first for navigation/HTML so a fresh
   deploy always shows up right away; cache-first
   fallback for everything else so the game still
   works offline.
   ========================================= */

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }

  const isHTML =
    event.request.mode === "navigate" ||
    (event.request.headers.get("accept") || "").includes("text/html");

  if (isHTML) {

    event.respondWith(

      fetch(event.request)
        .then(response => {

          const responseClone = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseClone));

          return response;

        })
        .catch(() =>
          caches.match(event.request)
            .then(hit => hit || caches.match("./index.html"))
        )

    );

    return;
  }

  event.respondWith(

    caches.match(event.request)
      .then(hit => {

        if (hit) {
          return hit;
        }

        return fetch(event.request)
          .then(response => {

            const responseClone = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseClone));

            return response;

          });

      })
      .catch(() => caches.match(event.request))

  );

});
