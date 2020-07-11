importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

workbox.precaching.precacheAndRoute([
  { url: "/images/403.jpg", revision: "1" },
  { url: "/images/no-data.jpg", revision: "1" },
  { url: "/index.html", revision: "1" },
  { url: "/pages/detailMatch.html", revision: "1" },
  { url: "/pages/history.html", revision: "1" },
  { url: "/pages/home.html", revision: "1" },
  { url: "/pages/nav.html", revision: "1" },
  { url: "/pages/saved.html", revision: "1" },
  { url: "/pages/standing.html", revision: "1" },
  { url: "/pages/team.html", revision: "1" },
  { url: "/pages/upcoming.html", revision: "1" },
  { url: "/scripts/data/data-source.js", revision: "1" },
  { url: "/scripts/db/db.js", revision: "1" },
  { url: "/scripts/db/idb.js", revision: "1" },
  { url: "/scripts/js/materialize.min.js", revision: "1" },
  { url: "/scripts/js/myConfig.js", revision: "1" },
  { url: "/scripts/js/nav.js", revision: "1" },
  { url: "/scripts/view/detailMatch.js", revision: "1" },
  { url: "/scripts/view/history.js", revision: "1" },
  { url: "/scripts/view/main.js", revision: "1" },
  { url: "/scripts/view/saved.js", revision: "1" },
  { url: "/scripts/view/standings.js", revision: "1" },
  { url: "/scripts/view/team.js", revision: "1" },
  { url: "/scripts/view/upcoming.js", revision: "1" },
  { url: "/styles/materialize.min.css", revision: "1" },
  { url: "/styles/myConfig.css", revision: "1" },
  { url: "/styles/style.css", revision: "1" },
  { url: "/bundle.js", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/service-worker.js", revision: "1" },
  {
    url: "https://fonts.googleapis.com/icon?family=Material+Icons",
    revision: "1",
  },
  {
    url:
      "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
    revision: "1",
  },
  {
    url:
      "https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap",
    revision: "1",
  },
]);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "api",
  })
);

workbox.routing.registerRoute(
  new RegExp("/images/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "image-cache",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30,
        maxEntries: 60,
      }),
    ],
  })
);

// const CACHE_NAME = "dicoding-nico-sub3";
// const urlsToCache = [
//   "/",
//   "/bundle.js",
//   "/styles/materialize.min.css",
//   "/styles/myConfig.css",
//   "/styles/style.css",
//   "/pages/detailMatch.html",
//   "/pages/history.html",
//   "/pages/home.html",
//   "/pages/nav.html",
//   "/pages/saved.html",
//   "/pages/standing.html",
//   "/pages/team.html",
//   "/pages/upcoming.html",
//   "/images/403.jpg",
//   "/images/laliga.png",
//   "/images/loading.gif",
//   "/images/logo-not-found.svg",
//   "/images/no-data.jpg",
//   "/images/icons/ic_bell.png",
//   "/images/icons/ic_browser.svg",
//   "/images/icons/ic_coach.svg",
//   "/images/icons/ic_collapse.svg",
//   "/images/icons/ic_jersey.svg",
//   "/images/icons/ic_link.svg",
//   "/images/icons/ic_location.svg",
//   "/images/icons/ic_mail.svg",
//   "/images/icons/ic_times.png",
//   "/images/icons/ic_venue.svg",
//   "/images/icons/icon128.png",
//   "/images/icons/icon192.png",
//   "/images/icons/icon192ios.png",
//   "/images/icons/icon256.png",
//   "/images/icons/icon512.png",
//   "https://fonts.googleapis.com/icon?family=Material+Icons",
//   "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
//   "https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap",
//   "./manifest.json",
//   "./scripts/data/data-source.js",
//   "./scripts/db/db.js",
//   "./scripts/db/idb.js",
//   "./scripts/js/materialize.min.js",
//   "./scripts/js/myConfig.js",
//   "./scripts/js/nav.js",
//   "./scripts/view/detailMatch.js",
//   "./scripts/view/history.js",
//   "./scripts/view/main.js",
//   "./scripts/view/saved.js",
//   "./scripts/view/standings.js",
//   "./scripts/view/team.js",
//   "./scripts/view/upcoming.js",
// ];

self.addEventListener("push", function (event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }

  let options = {
    body: body,
    icon: "./images/icons/icon512.png",
    vibrate: [100, 50, 100],
    data: {
      dataOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification("My Reminder Nico Leage", options)
  );
});
