// Authentication logic for login page
import { auth } from './firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Check if user is already logged in
onAuthStateChanged(auth, (user) => {
    if (user && window.location.pathname.includes('/login')) {
        window.location.href = '/dashboard/';
    }
});

// Login form handling
const loginForm = document.getElementById('login-form');
if (loginForm) {
    const errorMessage = document.getElementById('error-message');
    const loginBtn = document.getElementById('login-btn');
    const btnText = loginBtn.querySelector('.btn-text');
    const spinner = loginBtn.querySelector('.loading-spinner');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Hide previous error
        errorMessage.style.display = 'none';
        
        // Show loading state
        btnText.style.display = 'none';
        spinner.style.display = 'inline-block';
        loginBtn.disabled = true;
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect to dashboard
            window.location.href = '/dashboard/';
        } catch (error) {
            console.error('Login error:', error);
            let errorMsg = 'Login failed. Please try again.';
            
            if (error.code === 'auth/user-not-found') {
                errorMsg = 'No account found with this email';
            } else if (error.code === 'auth/wrong-password') {
                errorMsg = 'Incorrect password';
            } else if (error.code === 'auth/invalid-email') {
                errorMsg = 'Invalid email address';
            } else if (error.code === 'auth/too-many-requests') {
                errorMsg = 'Too many failed attempts. Please try again later';
            }
            
            errorMessage.textContent = errorMsg;
            errorMessage.style.display = 'block';
        } finally {
            // Reset button state
            btnText.style.display = 'inline';
            spinner.style.display = 'none';
            loginBtn.disabled = false;
        }
    });
}