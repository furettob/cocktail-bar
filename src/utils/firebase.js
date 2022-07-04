import firebase from 'firebase/app';
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnIM3kTbY4xAeeeSVBUdPmVozmBD9WkFA",
  authDomain: "fb-cocktailbar.firebaseapp.com",
  projectId: "fb-cocktailbar",
  storageBucket: "fb-cocktailbar.appspot.com",
  messagingSenderId: "911121121439",
  appId: "1:911121121439:web:1634a668e922c1818e22aa"
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
