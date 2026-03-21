importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCf8_Ks8OC1J8wI5dRKS55GE_KCAO7H-8c",
  authDomain: "toktok-f5b4a.firebaseapp.com",
  databaseURL: "https://toktok-f5b4a-default-rtdb.firebaseio.com",
  projectId: "toktok-f5b4a",
  storageBucket: "toktok-f5b4a.firebasestorage.app",
  messagingSenderId: "970149361447",
  appId: "1:970149361447:web:1922b3d2b797cd26665b02",
  measurementId: "G-VWFC6KEH2P"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://image2url.com/r2/default/images/1774107604133-1b1cb683-0603-4376-9ea8-0512fca52ca3.jpg',
    badge: 'https://image2url.com/r2/default/images/1774107604133-1b1cb683-0603-4376-9ea8-0512fca52ca3.jpg',
    vibrate: [300, 100, 300, 100, 500], // Pattern for mobile vibration
    tag: 'order-alert', // To prevent multiple stacking notifications
    renotify: true,
    data: {
        url: payload.data ? payload.data.url : '/'
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const urlToOpen = event.notification.data.url || '/';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
