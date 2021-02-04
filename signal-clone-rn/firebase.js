import * as firebase from "firebase";
  
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnPRSzj9-Up1-CTPRSovb--nGHMPq2Yd4",
  authDomain: "signal-clone-rn-9bd83.firebaseapp.com",
  projectId: "signal-clone-rn-9bd83",
  storageBucket: "signal-clone-rn-9bd83.appspot.com",
  messagingSenderId: "63375560621",
  appId: "1:63375560621:web:70c063aa2c67790eaf9b24",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
