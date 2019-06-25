//checking if serviceWorker or not
if ('serviceWorker' in navigator) {
  // Registering service worker with `sw.js` file
  navigator.serviceWorker.register('sw.js')
    .then((register) => {
      console.log("Service Worker registered successfully.", register);
    })
    .catch((e) => {
      console.log("The service worker is not registered.", e);
    })
} else {
  console.log("The service worker is not registered.");
}
