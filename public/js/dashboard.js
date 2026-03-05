// Dashboard functionality
import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { doc, getDoc, collection, addDoc, query, where, onSnapshot, updateDoc, orderBy } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

let currentUser = null;
let profitChart = null;
let portfolioChart = null;
let depositsChart = null;

// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Check authentication and redirect if needed
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = '/login/';
        return;
    }
    
    currentUser = user;
    
    // Load user data
    await loadUserData();
    
    // Setup real-time listeners
    setupRealtimeListeners();
    
    // Initialize charts
    initializeCharts();
});

// Load user data
async function loadUserData() {
    try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            document.getElementById('user-name').textContent = userData.name || 'User';
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

// Setup real-time listeners for user data
function setupRealtimeListeners() {
    // Listen to user document changes
    const userRef = doc(db, 'users', currentUser.uid);
    onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            updateFinancialCards(data);
        }
    });
    
    // Listen to transactions
    const transactionsQuery = query(
        collection(db, 'transactions'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
    );
    
    onSnapshot(transactionsQuery, (snapshot) => {
        updateTransactionTable(snapshot.docs);
        updateChartsWithTransactions(snapshot.docs);
    });
}

// Update financial summary cards
function updateFinancialCards(data) {
    document.getElementById('profit-value').textContent = formatCurrency(data.profit || 0);
    document.getElementById('balance-value').textContent = formatCurrency(data.availableBalance || 0);
    document.getElementById('progress-value').textContent = formatCurrency(data.totalInProgress || 0);
    document.getElementById('invested-value').textContent = formatCurrency(data.totalInvested || 0);
}

// Update transaction table
function updateTransactionTable(docs) {
    const tbody = document.getElementById('transactions-tbody');
    
    if (docs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="no-data">No transactions yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = docs.map(doc => {
        const data = doc.data();
        const statusClass = `status-${data.status}`;
        return `
            <tr>
                <td>${formatDate(data.createdAt)}</td>
                <td>${data.type.charAt(0).toUpperCase() + data.type.slice(1)}</td>
                <td>${formatCurrency(data.amount)}</td>
                <td><span class="status-badge ${statusClass}">${data.status}</span></td>
                <td>${doc.id.substring(0, 8)}...</td>
            </tr>
        `;
    }).join('');
}

// Initialize charts
function initializeCharts() {
    // Profit Chart (Line)
    const profitCtx = document.getElementById('profit-chart').getContext('2d');
    profitChart = new Chart(profitCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Profit Growth',
                data: [0, 0, 0, 0, 0, 0],
                borderColor: '#4299e1',
                backgroundColor: 'rgba(66, 153, 225, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
    
    // Portfolio Chart (Pie)
    const portfolioCtx = document.getElementById('portfolio-chart').getContext('2d');
    portfolioChart = new Chart(portfolioCtx, {
        type: 'doughnut',
        data: {
            labels: ['Stocks', 'Bonds', 'Real Estate', 'Crypto'],
            datasets: [{
                data: [40, 30, 20, 10],
                backgroundColor: [
                    '#4299e1',
                    '#48bb78',
                    '#ed8936',
                    '#9f7aea'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Deposits Chart (Bar)
    const depositsCtx = document.getElementById('deposits-chart').getContext('2d');
    depositsChart = new Chart(depositsCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Monthly Deposits',
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: '#48bb78'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
}

// Update charts with transaction data
function updateChartsWithTransactions(docs) {
    const deposits = docs.filter(doc => doc.data().type === 'deposit');
    
    // Calculate monthly deposits for the last 6 months
    const monthlyData = new Array(6).fill(0);
    const currentMonth = new Date().getMonth();
    
    deposits.forEach(doc => {
        const data = doc.data();
        const date = new Date(data.createdAt);
        const monthDiff = currentMonth - date.getMonth();
        if (monthDiff >= 0 && monthDiff < 6) {
            monthlyData[5 - monthDiff] += data.amount;
        }
    });
    
    if (depositsChart) {
        depositsChart.data.datasets[0].data = monthlyData;
        depositsChart.update();
    }
}

// Modal management
const modals = ['deposit-modal', 'withdraw-modal', 'bank-modal'];

modals.forEach(modalId => {
    const modal = document.getElementById(modalId);
    const btn = document.getElementById(modalId.replace('-modal', '-btn'));
    const closeBtn = modal.querySelector('.modal-close');
    
    btn.addEventListener('click', () => {
        modal.classList.add('active');
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Deposit form
document.getElementById('deposit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    
    if (amount <= 0) {
        showToast('Please enter a valid amount', 'error');
        return;
    }
    
    try {
        // Add transaction
        await addDoc(collection(db, 'transactions'), {
            userId: currentUser.uid,
            type: 'deposit',
            amount: amount,
            status: 'approved',
            createdAt: new Date().toISOString()
        });
        
        // Update user balance
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        const currentBalance = userDoc.data().availableBalance || 0;
        const currentInvested = userDoc.data().totalInvested || 0;
        
        await updateDoc(userRef, {
            availableBalance: currentBalance + amount,
            totalInvested: currentInvested + amount
        });
        
        showToast('Deposit successful!', 'success');
        document.getElementById('deposit-modal').classList.remove('active');
        document.getElementById('deposit-form').reset();
    } catch (error) {
        console.error('Deposit error:', error);
        showToast('Deposit failed. Please try again.', 'error');
    }
});

// Withdraw form
document.getElementById('withdraw-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    
    if (amount <= 0) {
        showToast('Please enter a valid amount', 'error');
        return;
    }
    
    try {
        // Check available balance
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        const availableBalance = userDoc.data().availableBalance || 0;
        
        if (amount > availableBalance) {
            showToast('Insufficient balance', 'error');
            return;
        }
        
        // Add withdrawal request
        await addDoc(collection(db, 'transactions'), {
            userId: currentUser.uid,
            type: 'withdraw',
            amount: amount,
            status: 'pending',
            createdAt: new Date().toISOString()
        });
        
        showToast('Withdrawal request submitted', 'success');
        document.getElementById('withdraw-modal').classList.remove('active');
        document.getElementById('withdraw-form').reset();
    } catch (error) {
        console.error('Withdrawal error:', error);
        showToast('Withdrawal request failed', 'error');
    }
});

// Bank details form
document.getElementById('bank-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const bankName = document.getElementById('bank-name').value.trim();
    const accountNumber = document.getElementById('account-number').value.trim();
    
    try {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
            bankDetails: {
                bankName: bankName,
                accountNumber: accountNumber,
                updatedAt: new Date().toISOString()
            }
        });
        
        showToast('Bank details updated successfully', 'success');
        document.getElementById('bank-modal').classList.remove('active');
        document.getElementById('bank-form').reset();
    } catch (error) {
        console.error('Bank details error:', error);
        showToast('Failed to update bank details', 'error');
    }
});

// Logout
document.getElementById('logout-btn').addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = '/login/';
    } catch (error) {
        console.error('Logout error:', error);
        showToast('Logout failed', 'error');
    }
});