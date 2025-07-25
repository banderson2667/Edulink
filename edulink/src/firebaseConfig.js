import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDk2i6Iuzg4KuUkPLBdHvnRLwbaFSHecYU",
  authDomain: "chat-edulink.firebaseapp.com",
  projectId: "chat-edulink",
  storageBucket: "chat-edulink.firebasestorage.app",
  messagingSenderId: "517947840337",
  appId: "1:517947840337:web:4f51deab7b48efebd3e570",
  measurementId: "G-DMVKBR97VR",
  databaseURL:'https://chat-edulink-default-rtdb.firebaseio.com/',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);