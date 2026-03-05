// Admin panel functionality
import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { doc, getDoc, collection, query, where, onSnapshot, updateDoc, deleteDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

let currentUser = null;

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

// Check authentication and admin role
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = '/login/';
        return;
    }
    
    currentUser = user;
    
    // Check if user is admin
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists() || userDoc.data().role !== 'admin') {
        alert('Access denied. Admin privileges required.');
        window.location.href = '/dashboard/';
        return;
    }
    
    // Load admin dashboard
    loadAdminDashboard();
    setupRealtimeListeners();
});

// Load admin dashboard data
async function loadAdminDashboard() {
    try {
        // Get all users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const totalUsers = usersSnapshot.size;
        
        // Get all transactions
        const transactionsSnapshot = await getDocs(collection(db, 'transactions'));
        let totalDeposits = 0;
        let totalWithdrawals = 0;
        
        transactionsSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.type === 'deposit' && data.status === 'approved') {
                totalDeposits += data.amount;
            } else if (data.type === 'withdraw' && data.status === 'approved') {
                totalWithdrawals += data.amount;
            }
        });
        
        const platformBalance = totalDeposits - totalWithdrawals;
        
        // Update cards
        document.getElementById('total-users').textContent = totalUsers;
        document.getElementById('total-deposits').textContent = formatCurrency(totalDeposits);
        document.getElementById('total-withdrawals').textContent = formatCurrency(totalWithdrawals);
        document.getElementById('platform-balance').textContent = formatCurrency(platformBalance);
        
    } catch (error) {
        console.error('Error loading admin dashboard:', error);
    }
}

// Setup real-time listeners
function setupRealtimeListeners() {
    // Listen to all users
    const usersQuery = query(collection(db, 'users'));
    onSnapshot(usersQuery, (snapshot) => {
        updateUsersTable(snapshot.docs);
    });
    
    // Listen to pending withdrawals
    const withdrawalsQuery = query(
        collection(db, 'transactions'),
        where('type', '==', 'withdraw'),
        where('status', '==', 'pending')
    );
    
    onSnapshot(withdrawalsQuery, (snapshot) => {
        updateWithdrawalsTable(snapshot.docs);
    });
}

// Update users table
function updateUsersTable(docs) {
    const tbody = document.getElementById('users-tbody');
    
    if (docs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No users found</td></tr>';
        return;
    }
    
    tbody.innerHTML = docs.map(doc => {
        const data = doc.data();
        const userId = doc.id;
        return `
            <tr>
                <td>${data.name || 'N/A'}</td>
                <td>${data.email}</td>
                <td>${formatCurrency(data.availableBalance || 0)}</td>
                <td>${formatCurrency(data.totalInvested || 0)}</td>
                <td><span class="status-badge ${data.role === 'admin' ? 'status-approved' : 'status-pending'}">${data.role}</span></td>
                <td>
                    <div class="admin-actions">
                        <button class="btn btn-sm btn-info" onclick="editUserBalance('${userId}', ${data.profit || 0}, ${data.availableBalance || 0}, ${data.totalInProgress || 0}, ${data.totalInvested || 0})" data-testid="edit-balance-btn-${userId}">Edit Balance</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteUser('${userId}')" data-testid="delete-user-btn-${userId}">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Update withdrawals table
function updateWithdrawalsTable(docs) {
    const tbody = document.getElementById('withdrawals-tbody');
    
    if (docs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="no-data">No pending withdrawals</td></tr>';
        return;
    }
    
    tbody.innerHTML = docs.map(doc => {
        const data = doc.data();
        const transactionId = doc.id;
        return `
            <tr>
                <td>${formatDate(data.createdAt)}</td>
                <td>${data.userId.substring(0, 10)}...</td>
                <td>${formatCurrency(data.amount)}</td>
                <td><span class="status-badge status-pending">${data.status}</span></td>
                <td>
                    <div class="admin-actions">
                        <button class="btn btn-sm btn-success" onclick="approveWithdrawal('${transactionId}', '${data.userId}', ${data.amount})" data-testid="approve-withdrawal-btn-${transactionId}">Approve</button>
                        <button class="btn btn-sm btn-danger" onclick="rejectWithdrawal('${transactionId}')" data-testid="reject-withdrawal-btn-${transactionId}">Reject</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Edit user balance
window.editUserBalance = function(userId, profit, balance, progress, invested) {
    document.getElementById('edit-user-id').value = userId;
    document.getElementById('edit-profit').value = profit;
    document.getElementById('edit-balance').value = balance;
    document.getElementById('edit-progress').value = progress;
    document.getElementById('edit-invested').value = invested;
    document.getElementById('edit-balance-modal').classList.add('active');
};

// Delete user
window.deleteUser = async function(userId) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }
    
    try {
        await deleteDoc(doc(db, 'users', userId));
        showToast('User deleted successfully', 'success');
    } catch (error) {
        console.error('Delete user error:', error);
        showToast('Failed to delete user', 'error');
    }
};

// Approve withdrawal
window.approveWithdrawal = async function(transactionId, userId, amount) {
    try {
        // Update transaction status
        await updateDoc(doc(db, 'transactions', transactionId), {
            status: 'approved'
        });
        
        // Update user balance
        const userDoc = await getDoc(doc(db, 'users', userId));
        const currentBalance = userDoc.data().availableBalance || 0;
        
        await updateDoc(doc(db, 'users', userId), {
            availableBalance: currentBalance - amount
        });
        
        showToast('Withdrawal approved', 'success');
    } catch (error) {
        console.error('Approve withdrawal error:', error);
        showToast('Failed to approve withdrawal', 'error');
    }
};

// Reject withdrawal
window.rejectWithdrawal = async function(transactionId) {
    try {
        await updateDoc(doc(db, 'transactions', transactionId), {
            status: 'rejected'
        });
        
        showToast('Withdrawal rejected', 'success');
    } catch (error) {
        console.error('Reject withdrawal error:', error);
        showToast('Failed to reject withdrawal', 'error');
    }
};

// Edit balance form submission
document.getElementById('edit-balance-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userId = document.getElementById('edit-user-id').value;
    const profit = parseFloat(document.getElementById('edit-profit').value);
    const balance = parseFloat(document.getElementById('edit-balance').value);
    const progress = parseFloat(document.getElementById('edit-progress').value);
    const invested = parseFloat(document.getElementById('edit-invested').value);
    
    try {
        await updateDoc(doc(db, 'users', userId), {
            profit: profit,
            availableBalance: balance,
            totalInProgress: progress,
            totalInvested: invested
        });
        
        showToast('Balance updated successfully', 'success');
        document.getElementById('edit-balance-modal').classList.remove('active');
    } catch (error) {
        console.error('Update balance error:', error);
        showToast('Failed to update balance', 'error');
    }
});

// Modal close handlers
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modalId = closeBtn.getAttribute('data-modal');
        document.getElementById(modalId).classList.remove('active');
    });
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Logout
document.getElementById('admin-logout-btn').addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = '/login/';
    } catch (error) {
        console.error('Logout error:', error);
        showToast('Logout failed', 'error');
    }
});