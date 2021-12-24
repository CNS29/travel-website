import firebase from "firebase";
import "firebase/storage";
const config = {
  apiKey: "AIzaSyAgDN6kEHQApRKIsoRWKxcNE18kvQnncD8",
  authDomain: "booking-tours-665b4.firebaseapp.com",
  projectId: "booking-tours-665b4",
  storageBucket: "booking-tours-665b4.appspot.com",
  messagingSenderId: "9634366081",
  appId: "1:9634366081:web:eeb7d9dc38705fabb60380",
  measurementId: "G-PPF2PBC68X",
};

firebase.initializeApp(config);

const storage = firebase.storage();
export { storage, firebase as default };
