# Investment Dashboard - Setup Guide

## 🚀 Quick Start

This is a complete investment dashboard built with vanilla HTML, CSS, JavaScript, and Firebase v9.

## 🌐 Access URLs

After starting the application, access the following pages:

- **Login Page**: `http://localhost:3000/login.html`
- **Register Page**: `http://localhost:3000/register.html`
- **Dashboard**: `http://localhost:3000/dashboard.html` (requires login)
- **Admin Panel**: `http://localhost:3000/admin.html` (requires admin role)

## 📁 File Structure

```
/app/frontend/public/
├── login.html              # Login page
├── register.html           # Registration page
├── dashboard.html          # User dashboard (protected)
├── admin.html              # Admin panel (role-based access)
├── css/
│   └── style.css          # All styles
├── js/
│   ├── firebase.js        # Firebase configuration
│   ├── auth.js            # Authentication logic
│   ├── dashboard.js       # Dashboard functionality
│   └── admin.js           # Admin panel logic
└── README.md
```

## 🔧 Setup Instructions

### 1. Firebase Configuration

Your Firebase credentials are already configured in `js/firebase.js`.

### 2. Firebase Console Setup

#### A. Enable Authentication

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `tomihito-47051`
3. Navigate to **Authentication** → **Sign-in method**
4. Enable **Email/Password** provider
5. Click **Save**

#### B. Create Firestore Database

1. Navigate to **Firestore Database**
2. Click **Create database**
3. Start in **Test mode** (or Production mode with custom rules)
4. Choose a location (e.g., us-central)
5. Click **Enable**

#### C. Configure Firestore Security Rules

Go to **Firestore Database** → **Rules** and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                     (request.auth.uid == userId || 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Transactions collection
    match /transactions/{transactionId} {
      allow read: if request.auth != null && 
                     (resource.data.userId == request.auth.uid || 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && 
                               get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 3. Create Admin Account

#### Method 1: Manual Setup via Firebase Console

1. **Register a user** through the application (`register.html`)
2. Go to **Firebase Console** → **Firestore Database**
3. Find the `users` collection
4. Locate your user document (by email)
5. Click on the document
6. Find the `role` field and change it from `"user"` to `"admin"`
7. Click **Update**
8. Now you can access the admin panel at `admin.html`

#### Method 2: Direct Creation in Firestore Console

1. Go to **Firestore Database**
2. Click **Start collection**
3. Collection ID: `users`
4. Document ID: (auto-generate or use custom ID)
5. Add fields:
   ```
   name: "Admin User"
   email: "admin@example.com"
   role: "admin"
   profit: 0
   availableBalance: 0
   totalInProgress: 0
   totalInvested: 0
   bankDetails: {}
   createdAt: [current timestamp]
   ```
6. Go to **Authentication** → **Users**
7. Click **Add user**
8. Use the same email: `admin@example.com`
9. Set a password
10. Click **Add user**

### 4. Running the Application

The application is already running! Access it at:

**Login Page**: `http://localhost:3000/login.html`

Or if deploying:

#### Option A: Using a Local Server

```bash
# Navigate to the directory
cd /app/frontend/public

# Using Python
python3 -m http.server 8080

# Using Node.js
npx http-server -p 8080

# Using PHP
php -S localhost:8080
```

Then open: `http://localhost:8080/login.html`

#### Option B: Using VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click on `login.html`
3. Select "Open with Live Server"

## 🎯 Features

### Authentication System
- ✅ Email/Password registration
- ✅ Email/Password login
- ✅ Protected routes
- ✅ Role-based access control
- ✅ Logout functionality

### User Dashboard
- ✅ Financial summary cards (Profit, Balance, In Progress, Invested)
- ✅ Real-time updates using Firestore listeners
- ✅ Deposit functionality
- ✅ Withdrawal requests
- ✅ Bank details management
- ✅ Transaction history table
- ✅ Interactive charts (Chart.js)
  - Line chart: Profit growth over time
  - Pie chart: Portfolio distribution
  - Bar chart: Monthly deposits

### Admin Panel
- ✅ Dashboard overview (Total users, deposits, withdrawals, platform balance)
- ✅ Users management table
- ✅ Edit user balances
- ✅ Delete users
- ✅ Approve/Reject withdrawal requests
- ✅ Real-time updates

## 🎨 Design Features

- ✅ Modern fintech design
- ✅ Clean minimal style with soft shadows
- ✅ Light blue/green accents
- ✅ Responsive grid layout
- ✅ Glassmorphism effects
- ✅ Smooth animations and transitions
- ✅ Animated number counters
- ✅ Toast notifications
- ✅ Loading states
- ✅ Modal dialogs
- ✅ Hover effects

## 🔐 Default Test Accounts

After setup, create test accounts:

**Admin Account:**
- Email: `admin@example.com`
- Password: (set during creation)
- Role: `admin`

**Test User Account:**
- Email: `user@example.com`
- Password: (set during registration)
- Role: `user`

## 📊 Firestore Collections Structure

### users
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  role: "user" | "admin",
  profit: 0,
  availableBalance: 0,
  totalInProgress: 0,
  totalInvested: 0,
  bankDetails: {
    bankName: "Bank Name",
    accountNumber: "1234567890",
    updatedAt: "2025-01-01T00:00:00.000Z"
  },
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

### transactions
```javascript
{
  userId: "user-uid-here",
  type: "deposit" | "withdraw",
  amount: 1000,
  status: "pending" | "approved" | "rejected",
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

## 🚨 Troubleshooting

### Issue: "Firebase not defined"
- Make sure you're running the app on a local server, not opening files directly
- Check browser console for CORS errors

### Issue: "Permission denied" in Firestore
- Verify Firestore security rules are properly configured
- Check that user is authenticated
- For admin actions, verify user has role: "admin"

### Issue: Charts not displaying
- Verify Chart.js CDN is loading
- Check browser console for errors
- Ensure canvas elements have proper IDs

### Issue: Can't access admin panel
- Verify user has role: "admin" in Firestore
- Check Firebase Console → Firestore → users collection
- Update role field to "admin"

## 🔄 Real-time Features

All data updates in real-time using Firestore's `onSnapshot()`:
- Financial summary cards update when user data changes
- Transaction table updates when new transactions are added
- Admin panel updates when users or withdrawals change
- Charts update dynamically with new data

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎉 Next Steps

1. ✅ Complete Firebase setup (Authentication + Firestore)
2. ✅ Create admin account
3. ✅ Test registration and login
4. ✅ Test deposit/withdrawal functionality
5. ✅ Test admin panel features
6. 🚀 Deploy to production

## 📞 Support

For issues or questions:
- Check browser console for errors
- Verify Firebase configuration
- Ensure Firestore rules are correct
- Check that Authentication is enabled

---

**Built with ❤️ using Vanilla JavaScript and Firebase v9**
