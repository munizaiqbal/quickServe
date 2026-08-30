

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";


import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js"; 


import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZ0CSdTrp8mUS6mqRm44kMG0LGpVVSNXM",
  authDomain: "learningfirebase-55bc0.firebaseapp.com",
  projectId: "learningfirebase-55bc0",
  storageBucket: "learningfirebase-55bc0.firebasestorage.app",
  messagingSenderId: "287417692495",
  appId: "1:287417692495:web:b55e3336d7888db60a553a",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db
};
