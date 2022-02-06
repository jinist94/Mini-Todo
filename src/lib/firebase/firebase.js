// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeHeKerVrBZPdHnVrrByviQ2IJlB38CMU",
  authDomain: "mini-todo-25024.firebaseapp.com",
  projectId: "mini-todo-25024",
  storageBucket: "mini-todo-25024.appspot.com",
  messagingSenderId: "670649117233",
  appId: "1:670649117233:web:4843d80e2171bbeeaf8310",
  measurementId: "G-QQ829F2JZ0",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
