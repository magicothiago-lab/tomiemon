// Firebase v9 Modular SDK Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1gPcL-OF6dOYGPXGCqSnr9MA3IoNYjak",
    authDomain: "tomihito-47051.firebaseapp.com",
    projectId: "tomihito-47051",
    storageBucket: "tomihito-47051.firebasestorage.app",
    messagingSenderId: "727567469287",
    appId: "1:727567469287:web:1c977ad79648802814b042"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other modules
export { auth, db };