import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "FAKE_API_KEY",
  authDomain: "fake-project.firebaseapp.com",
  projectId: "fake-project",
  storageBucket: "fake-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
  measurementId: "G-FAKE_MEASUREMENT_ID"
};

// Ініціалізуємо додаток
const app = initializeApp(firebaseConfig);

// Отримуємо сервіси
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };