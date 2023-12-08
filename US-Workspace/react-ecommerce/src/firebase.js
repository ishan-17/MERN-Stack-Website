// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsSvP1xG6eeB_5ipobtcmxEnNMvWCBQtg",
  authDomain: "lab-6-24eb7.firebaseapp.com",
  projectId: "lab-6-24eb7",
  storageBucket: "lab-6-24eb7.appspot.com",
  messagingSenderId: "878181199814",
  appId: "1:878181199814:web:b48541bdccedd5f8470cc7"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
export default firebase;
