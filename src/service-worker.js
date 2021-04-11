import { getCacheKeyForURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";

export default function register() {
  // Register the service worker
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registartion) => {
          if (navigator.serviceWorker.conotroller) {
            window["serviceWorkerReady"] = true;
            window.dispatchEvent(new CustomEvent("service-worker-ready"));
          }

          const newWorker = registartion.installing;
          const waitingWorker = registartion.waiting;

          if (newWorker) {
            if (newWorker.state === "activated" && !waitingWorker) {
              window.location.reload();
            }
            newWorker.addEventListener("statechange", (e) => {
              if (newWorker.state === "activated" && !waitingWorker) {
                window.location.reload();
              }
            });
          }
        })
        .catch((err) => {
          console.log("service worker could not be registered", err);
        });
    });

    registerRoute(
      ({ event }) => event.request.mode === "navigate",
      async () => {
        const defaultBase = "/index.html";
        return caches
          .match(getCacheKeyForURL(defaultBase))
          .then((response) => {
            return response || fetch(defaultBase);
          })
          .catch((err) => {
            return fetch(defaultBase);
          });
      }
    );
  }
}
