import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADzB8Ng8wjI3ynHBWTCP_W7baAP2c7-qg",
  authDomain: "job-list-66bea.firebaseapp.com",
  projectId: "job-list-66bea",
  storageBucket: "job-list-66bea.appspot.com",
  messagingSenderId: "866573601204",
  appId: "1:866573601204:web:9002018e92779d95520ae1",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
