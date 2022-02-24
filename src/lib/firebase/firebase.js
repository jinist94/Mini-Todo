import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeHeKerVrBZPdHnVrrByviQ2IJlB38CMU",
  authDomain: "mini-todo-25024.firebaseapp.com",
  projectId: "mini-todo-25024",
  storageBucket: "mini-todo-25024.appspot.com",
  messagingSenderId: "670649117233",
  appId: "1:670649117233:web:4843d80e2171bbeeaf8310",
  measurementId: "G-QQ829F2JZ0",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
