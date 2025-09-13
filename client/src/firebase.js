import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDue_nvaA9BBSI7CswPgGgkcYElFNTdnjE",
  authDomain: "aluminate-43a4f.firebaseapp.com",
  projectId: "aluminate-43a4f",
  storageBucket: "aluminate-43a4f.firebasestorage.app",
  messagingSenderId: "287304144918",
  appId: "1:287304144918:web:43b50251f8367f4a5dfd37",
  measurementId: "G-108JQF6JZP",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };