// src/utils/registerServiceWorker.ts
/**
 * Service Worker registration for offline support
 * Call this from your root layout
 */

export function registerServiceWorker() {
  if (typeof window === 'undefined') return;

  // Only register in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('Service Worker: Skipping registration in development');
    return;
  }

  // Check if service workers are supported
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker: Not supported in this browser');
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker: Registered successfully', registration.scope);

        // Check for updates periodically
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available, notify user to refresh
              if (confirm('A new version is available! Reload to update?')) {
                window.location.reload();
              }
            }
          });
        });
      })
      .catch((error) => {
        console.error('Service Worker: Registration failed', error);
      });

    // Handle service worker messages
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'CACHE_UPDATED') {
        console.log('Service Worker: Cache updated');
      }
    });

    // Handle connection status changes
    window.addEventListener('online', () => {
      console.log('Connection restored');
      document.body.classList.remove('offline');
    });

    window.addEventListener('offline', () => {
      console.log('Connection lost');
      document.body.classList.add('offline');
    });
  });
}

// Unregister service worker (for debugging)
export function unregisterServiceWorker() {
  if (typeof window === 'undefined') return;
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
        console.log('Service Worker: Unregistered');
      })
      .catch((error) => {
        console.error('Service Worker: Unregister failed', error);
      });
  }
}