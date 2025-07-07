// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Para usar este proyecto, necesitas reemplazar esta configuración con la tuya
const firebaseConfig = {
  apiKey: "AIzaSyBl1vFKtT8EImIc2LX4yUCfBWG8PqOKL1M",
  authDomain: "ejemplo-crud-bbf2c.firebaseapp.com",
  projectId: "ejemplo-crud-bbf2c",
  storageBucket: "ejemplo-crud-bbf2c.firebasestorage.app",
  messagingSenderId: "1017914289191",
  appId: "1:1017914289191:web:dc86c174e9d7038b893202"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Cloud Firestore
export const db = getFirestore(app);

export default app;
