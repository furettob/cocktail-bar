import firebase from 'firebase/app';
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyArEHqy173PRbeEor_lwWCbAgFgCnkzCAs",
  authDomain: "fb-goal-buddy.firebaseapp.com",
  databaseURL: "https://fb-goal-buddy-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fb-goal-buddy",
  storageBucket: "fb-goal-buddy.appspot.com",
  messagingSenderId: "802169792867",
  appId: "1:802169792867:web:654a3308c31b89c4f1cb56",
  whatEnv: "env is sample"
}

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { app, auth };
