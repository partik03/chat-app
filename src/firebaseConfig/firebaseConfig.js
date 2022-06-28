// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRcos_YtwruKCuZDnyX85kbX6qcFjEFjk",
  authDomain: "chat-app-9e3eb.firebaseapp.com",
  projectId: "chat-app-9e3eb",
  storageBucket: "chat-app-9e3eb.appspot.com",
  messagingSenderId: "878894751171",
  appId: "1:878894751171:web:a61e020cd60114e4493176",
  measurementId: "G-QJ3DZF7KNF"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const db  =getFirestore(app)
export const storage =getStorage(app)
