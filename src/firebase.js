import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpPgZtjQB6-zeZGY0B0P5moloeQx__Jz8",
  authDomain: "reactopedia-66149.firebaseapp.com",
  projectId: "reactopedia-66149",
  storageBucket: "reactopedia-66149.appspot.com",
  messagingSenderId: "967172931544",
  appId: "1:967172931544:web:6c451c14c52107dce27cad",
  measurementId: "G-GXFZ35ZYYH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };