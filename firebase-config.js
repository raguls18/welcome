// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// Your Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDYoeFdUPDNebrJxQefP9Uww_v5SuE_lqA",
    authDomain: "hospital-3e6cc.firebaseapp.com",
    projectId: "hospital-3e6cc",
    storageBucket: "hospital-3e6cc.firebasestorage.app",
    messagingSenderId: "493540413183",
    appId: "1:493540413183:web:50abd036597ef9d53046ca",
    measurementId: "G-JFDV99DY3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth for use in other files
export { auth };