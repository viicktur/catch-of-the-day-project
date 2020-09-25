import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBV4pog6OdUukkIHNz3s_emR3dQLyTwv50",
  authDomain: "catch-of-the-day-victor-95ece.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-victor-95ece.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;

//   storageBucket: "catch-of-the-day-victor-95ece.appspot.com",
//   messagingSenderId: "873938380851",
//   appId: "1:873938380851:web:6028b5f0e2483578ae9b46",
//   measurementId: "G-CHD3HQ956C"
