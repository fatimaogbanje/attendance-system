//url-based determination of the request type
/ In serviceworker.js
self.addEventListener('fetch', (event) => {
  // Parse the URL
  const requestURL = new URL(event.request.url);  // Handle article URLs
  if (/^\/article\//.test(requestURL.pathname)) {
    event.respondWith(/* some response strategy */);
    return;
  }
  if (/\.webp$/.test(requestURL.pathname)) {
    event.respondWith(/* some other response strategy */);
    return;
  }
  /* … */
});


//request.destination based determination of the request type
// In serviceworker.js
self.addEventListener('fetch', (event) => {
    const destination = event.request.destination;
    switch (destination) {
      case 'style':
      case 'script':
      case 'document':
      case 'image': {
        event.respondWith(
            /* "Network Falling Back to Cache" strategy */);
        return;
      }
      case 'font': {
        event.respondWith(/* "Cache Only" strategy */);
        return;
      }
      // All `XMLHttpRequest` or `fetch()` calls where
      // `Request.destination` is the empty string default value
      default: {
        event.respondWith(/* "Network Only" strategy */);
        return;
      }
    }
  });