import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB40jTYi1YXuJYGRnsxfiAOXEMI8FD-Uco",
  authDomain: "thar-project.firebaseapp.com",
  databaseURL: "https://thar-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thar-project",
  storageBucket: "thar-project.appspot.com",
  messagingSenderId: "334429151774",
  appId: "1:334429151774:web:9583cc1af916ee67c1c40f",
  measurementId: "G-3GYYK2LLC3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db ;


