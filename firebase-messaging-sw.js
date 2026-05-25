importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDol8OdWq6YoBY5XMyuPYue25mQnOoIOYE",
  authDomain: "jo-band-notifications-aea69.firebaseapp.com",
  projectId: "jo-band-notifications-aea69",
  storageBucket: "jo-band-notifications-aea69.firebasestorage.app",
  messagingSenderId: "942336247693",
  appId: "1:942336247693:web:4a0f5915907c911d671fc4"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification.title || 'JO BAND';
  const options = {
    body: payload.notification.body || '',
    icon: '/images/logo.jpg',
    badge: '/images/logo.jpg'
  };
  self.registration.showNotification(title, options);
});
