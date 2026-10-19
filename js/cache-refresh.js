// Keep GitHub Pages browsers from holding an old stylesheet or script bundle.
const CACHE_VERSION = 'wardrobe-pets-only-2';
(function () {
  try {
    if ('serviceWorker' in navigator) navigator.serviceWorker.getRegistrations().then(list => list.forEach(registration => registration.unregister()));
    if (window.caches) caches.keys().then(keys => keys.forEach(key => caches.delete(key)));
  } catch (_) {}
})();
