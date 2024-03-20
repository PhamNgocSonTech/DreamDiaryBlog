// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB35SgaTmzdu4KSsqlwFqaeO4_BG4flPs8",
  authDomain: "vueblog-f7532.firebaseapp.com",
  projectId: "vueblog-f7532",
  storageBucket: "vueblog-f7532.appspot.com",
  messagingSenderId: "152582305228",
  appId: "1:152582305228:web:070336d872f018c0201969",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { timeStamp };
export default firebaseApp.firestore();
