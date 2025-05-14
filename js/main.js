window.addEventListener('load', () => {
    'use strict';
  
    // Rejestracja service workera
        console.log('out if');
    if ('serviceWorker' in navigator) {
        console.log('in if');
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered successfully.'))
        .catch((error) => console.error('Service Worker registration failed:', error));
    }
  });
  