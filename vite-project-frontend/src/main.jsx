import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBclGpWk6a3-cKpyCIWYYk3ZDlTEQjmA3Q",
  authDomain: "full-stack-react-db.firebaseapp.com",
  projectId: "full-stack-react-db",
  storageBucket: "full-stack-react-db.firebasestorage.app",
  messagingSenderId: "986478061493",
  appId: "1:986478061493:web:d47666cccb9cbf63cc1bfc"
};

const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
