import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCszaH3e5Qm3CLi9OX96uoQBxa6rECf6k4",
  authDomain: "easysort-f8e2d.firebaseapp.com",
  databaseURL: "https://easysort-f8e2d.firebaseio.com",
  projectId: "easysort-f8e2d",
  storageBucket: "easysort-f8e2d.appspot.com",
  messagingSenderId: "535700928965",
  appId: "1:535700928965:web:be879d53dd361284fcb3ac",
  measurementId: "G-SFMD1GRXNC",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
