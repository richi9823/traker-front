// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('../firebase-messaging-sw.js').then(
        function(registration) {
            console.log('Registration succesful, scope is:', registration.scope);
        }
    ).catch(function(err) {
        console.log("Service worker registration failer, error:", err)
    })
}


firebase.initializeApp({
  apiKey: "AIzaSyCv990kLR8GFB1gb_dwkH0zpYTX93lev_w",
  authDomain: "angelic-triumph-415121.firebaseapp.com",
  projectId: "angelic-triumph-415121",
  storageBucket: "angelic-triumph-415121.appspot.com",
  messagingSenderId: "517478282394",
  appId: "1:517478282394:web:c554d52558c61aa97e9b23",
  measurementId: "G-TBXEP5ZM51"
});

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
});