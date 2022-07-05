import firebase from 'firebase/app';
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6aOHMxEzUW-9_xy7oReS_O8ikQ1rSYnU",
  authDomain: "fb-cocktailbar-v2.firebaseapp.com",
  databaseURL: "https://fb-cocktailbar-v2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fb-cocktailbar-v2",
  storageBucket: "fb-cocktailbar-v2.appspot.com",
  messagingSenderId: "65892001055",
  appId: "1:65892001055:web:50ce964c3ba28827aa7c2a"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { app, auth };
