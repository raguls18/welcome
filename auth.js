import { auth } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile,
    onAuthStateChanged,
    signOut
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const loginFormContainer = document.getElementById('login-form');
const registerFormContainer = document.getElementById('register-form');
const loading = document.getElementById('loading');

// Form switching
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormContainer.classList.remove('active');
    registerFormContainer.classList.add('active');
    clearErrors();
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerFormContainer.classList.remove('active');
    loginFormContainer.classList.add('active');
    clearErrors();
});

// Clear error messages
function clearErrors() {
    document.getElementById('loginError').textContent = '';
    document.getElementById('registerError').textContent = '';
}

// Show loading spinner
function showLoading() {
    loading.classList.remove('hidden');
}

// Hide loading spinner
function hideLoading() {
    loading.classList.add('hidden');
}

// Display error message
function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

// Login functionality
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    clearErrors();
    showLoading();
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful:', userCredential.user);
        // Redirect will happen automatically through onAuthStateChanged
    } catch (error) {
        console.error('Login error:', error);
        showError('loginError', getErrorMessage(error.code));
    } finally {
        hideLoading();
    }
});

// Register functionality
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    clearErrors();
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showError('registerError', 'Passwords do not match');
        return;
    }
    
    // Validate password length
    if (password.length < 6) {
        showError('registerError', 'Password must be at least 6 characters long');
        return;
    }
    
    showLoading();
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update user profile with display name
        await updateProfile(userCredential.user, {
            displayName: name
        });
        
        console.log('Registration successful:', userCredential.user);
        // Redirect will happen automatically through onAuthStateChanged
    } catch (error) {
        console.error('Registration error:', error);
        showError('registerError', getErrorMessage(error.code));
    } finally {
        hideLoading();
    }
});

// Convert Firebase error codes to user-friendly messages
function getErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email is already registered. Please use a different email or try logging in.';
        case 'auth/weak-password':
            return 'Password is too weak. Please choose a stronger password.';
        case 'auth/user-not-found':
            return 'No account found with this email address.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/user-disabled':
            return 'This account has been disabled.';
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later.';
        case 'auth/network-request-failed':
            return 'Network error. Please check your internet connection.';
        default:
            return 'An error occurred. Please try again.';
    }
}

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, redirect to welcome page
        console.log('User is signed in:', user);
        window.location.href = 'welcome.html';
    } else {
        // User is signed out
        console.log('User is signed out');
    }
});

// Export signOut function for use in welcome page
window.signOutUser = async function() {
    try {
        await signOut(auth);
        console.log('User signed out successfully');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Sign out error:', error);
    }
};