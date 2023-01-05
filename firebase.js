// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtVIrJd3BLrehK566E7YBW7x_OhdWQ_vY",
    authDomain: "fir-auth-4dc95.firebaseapp.com",
    projectId: "fir-auth-4dc95",
    storageBucket: "fir-auth-4dc95.appspot.com",
    messagingSenderId: "358607949662",
    appId: "1:358607949662:web:9ca8d22a943bdcb3d449cf"
};

// let app;

// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig)
// } else {
//   app = firebase.app();
// }

// const db = app.firestore();
// const auth = firebase.auth();

// export { db, auth, Database };
const app = initializeApp(firebaseConfig);

//initizile database
export const db = getDatabase(app);