// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv990kLR8GFB1gb_dwkH0zpYTX93lev_w",
  authDomain: "angelic-triumph-415121.firebaseapp.com",
  projectId: "angelic-triumph-415121",
  storageBucket: "angelic-triumph-415121.appspot.com",
  messagingSenderId: "517478282394",
  appId: "1:517478282394:web:c554d52558c61aa97e9b23",
  measurementId: "G-TBXEP5ZM51"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const messaging = getMessaging();

export const requestForToken = () => {
    // The method getToken(): Promise<string> allows FCM to use the VAPID key credential
    // when sending message requests to different push services
    return getToken(messaging, { vapidKey: `BIyjcY-ekPZYS1wit0YEkAuFNzfRtbEeEJArUcS8quG2sWGBBAvFlUWL5av92DHv6-m7Cd3l4E_lZ5VXvBG2tMk` }) //to authorize send requests to supported web push services
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);

                if(localStorage.getItem('fcmToken') && currentToken !==localStorage.getItem('fcmToken')){
                    localStorage.setItem('fcmToken', currentToken);

                }

                else if(!localStorage.getItem('fcmToken')){
                    localStorage.setItem('fcmToken', currentToken);

                }


            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });