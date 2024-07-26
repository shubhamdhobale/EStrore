import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import dotenv from "dotenv"
// dotenv.config()

// const firebaseConfig = {
//   apiKey: String(import.meta.env.VITE_FIREBASE_API),
//   authDomain: String(import.meta.env.VITE_FIREBASE_DOMAIN),
//   projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
//   storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
//   messagingSenderId:String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
//   appId: String(import.meta.env.VITE_FIREBASE_APP_ID)
// };


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
