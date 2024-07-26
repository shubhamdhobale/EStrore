import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCyOAWbliXKcGpCiWEs1uDcRydgFQn7c3Y",
  authDomain: "estore-27700.firebaseapp.com",
  projectId: "estore-27700",
  storageBucket: "estore-27700.appspot.com",
  messagingSenderId: "454923885240",
  appId: "1:454923885240:web:a740296213050c6ac2b24d"
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }