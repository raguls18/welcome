import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// DOM Elements
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userInitial = document.getElementById('userInitial');
const signOutBtn = document.getElementById('signOutBtn');
const creditPoints = document.getElementById('creditPoints');
const userLevel = document.getElementById('userLevel');
const totalActivities = document.getElementById('totalActivities');
const achievements = document.getElementById('achievements');

// Sample user data - In a real app, this would come from your database
const sampleUserData = {
    creditPoints: 2450,
    level: 'Gold',
    totalActivities: 47,
    achievements: 12,
    memberSince: '2024-01-15',
    lastActivity: new Date().toISOString()
};

// Function to update dashboard stats
function updateDashboardStats(userData) {
    if (creditPoints) creditPoints.textContent = userData.creditPoints.toLocaleString();
    if (userLevel) userLevel.textContent = userData.level;
    if (totalActivities) totalActivities.textContent = userData.totalActivities;
    if (achievements) achievements.textContent = userData.achievements;
}

// Function to simulate credit points animation
function animateCountUp(element, finalValue, duration = 1000) {
    const startValue = 0;
    const startTime = Date.now();
    
    function updateCount() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        const currentValue = Math.floor(startValue + (finalValue - startValue) * progress);
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    }
    
    requestAnimationFrame(updateCount);
}

// Check if user is authenticated
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        const displayName = user.displayName || 'User';
        const email = user.email;
        
        // Update UI with user info
        userName.textContent = `Welcome, ${displayName}!`;
        userEmail.textContent = email;
        userInitial.textContent = displayName.charAt(0).toUpperCase();
        
        // Update dashboard stats with animation
        setTimeout(() => {
            updateDashboardStats(sampleUserData);
            
            // Animate credit points counter
            if (creditPoints) {
                animateCountUp(creditPoints, sampleUserData.creditPoints, 1500);
            }
        }, 300);
        
        console.log('Welcome page loaded for user:', user);
    } else {
        // No user is signed in, redirect to login
        console.log('No user signed in, redirecting to login');
        window.location.href = 'index.html';
    }
});

// Sign out functionality
signOutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        console.log('User signed out successfully');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Sign out error:', error);
        alert('Error signing out. Please try again.');
    }
});

// Add click handlers for action buttons
document.addEventListener('DOMContentLoaded', () => {
    // Get all action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = e.target.textContent;
            
            // Handle different button actions
            switch(buttonText) {
                case 'Manage Profile':
                    handleProfileAction();
                    break;
                case 'View Points':
                    handlePointsAction();
                    break;
                case 'View Analytics':
                    handleAnalyticsAction();
                    break;
                case 'View Goals':
                    handleGoalsAction();
                    break;
                case 'View All':
                    handleNotificationsAction();
                    break;
                case 'Open Settings':
                    handleSettingsAction();
                    break;
                default:
                    console.log(`Action for ${buttonText} not implemented yet`);
            }
        });
    });
});

// Action handlers
function handleProfileAction() {
    alert('Profile management feature coming soon!');
    console.log('Navigate to profile settings');
}

function handlePointsAction() {
    const currentPoints = sampleUserData.creditPoints;
    alert(`You have ${currentPoints} credit points!\n\nPoints History:\n• Earned 50 points - Daily challenge\n• Spent 100 points - Premium unlock\n• Earned 200 points - Weekly bonus`);
}

function handleAnalyticsAction() {
    alert('Analytics dashboard coming soon!');
    console.log('Navigate to analytics page');
}

function handleGoalsAction() {
    alert('Goals tracking feature coming soon!');
    console.log('Navigate to goals page');
}

function handleNotificationsAction() {
    alert('Notifications:\n\n• Welcome to your dashboard!\n• Your Gold membership is active\n• New achievements available');
}

function handleSettingsAction() {
    alert('Settings page coming soon!');
    console.log('Navigate to settings page');
}

// Function to add new activity (for demonstration)
function addActivity(type, description, points = 0) {
    console.log(`New activity: ${type} - ${description} (${points} points)`);
    
    // In a real app, you would update the database and refresh the UI
    if (points > 0) {
        sampleUserData.creditPoints += points;
        updateDashboardStats(sampleUserData);
    }
}

// Export functions for external use
window.addActivity = addActivity;
window.updateDashboardStats = updateDashboardStats;