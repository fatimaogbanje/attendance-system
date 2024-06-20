if ("serviceWorker" in navigator && !navigator.serviceWorker.controller) {
  console.log(navigator.serviceWorker.controller, "Is controller");
  window.addEventListener("load", async () => {
    try {
      const version = Math.random().toString(36).substring(7);
      const registration = await navigator.serviceWorker.register(`/sw.js?v=${version}`);
      console.log("Service Worker registered with scope:", registration.scope);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  });
} else {
  if (!("serviceWorker" in navigator)) {
    console.error("Service Workers are not supported in this browser.");
  } else if (navigator.serviceWorker.controller) {
    console.log("Service Worker is already controlling this page.");
  }
}
