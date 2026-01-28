# ✅ Admin Account Setup - Complete

## 🎉 Admin Account Successfully Created!

### Login Credentials:
- **Email**: `geniuscare@gmail.com`
- **Username**: `geniuscare`
- **Password**: `GeniusCare@2024`

---

## 🚀 How to Login Now

### Step 1: Start the Server
```bash
cd server
npm start
```

Wait for this message:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```

### Step 2: Start Frontend (in another terminal)
```bash
npm start
# or
npm run dev
```

### Step 3: Access Admin Panel
**Option A: Keyboard Shortcut**
1. Press `Ctrl+Shift+A` on the website
2. You'll see the login page

**Option B: Direct URL**
1. Navigate to: `http://localhost:5173/admin` (or your frontend URL + /admin)

### Step 4: Enter Credentials
```
Email/Username: geniuscare@gmail.com
Password: GeniusCare@2024
```

Click "লগইন করুন" (Login)

---

## 🔍 Verify Setup

If login doesn't work, run these commands to debug:

### Check Admin Account
```bash
cd server
node scripts/debugLogin.js
```

### Test Login Endpoint
```bash
cd server
npm start  # In one terminal (backend)

# In another terminal:
node scripts/testLogin.js
```

---

## 📋 What Was Done

✅ Created admin account in MongoDB
✅ Set username: `geniuscare`
✅ Set email: `geniuscare@gmail.com`
✅ Set password: `GeniusCare@2024`
✅ Set role: `superadmin`
✅ Account is active and ready to use

---

## 🛡️ Security Reminder

⚠️ **Important**:
- Change the password after first login
- Never share credentials
- Use strong passwords in production
- Keep JWT_SECRET secure

---

## 📚 Additional Commands

### Reset Password
If you forget the password:
```bash
cd server
rm node_modules/... # (just restart)
node scripts/createAdmin.js  # Creates new admin
```

### View All Admins
```bash
# Using MongoDB Compass or CLI
db.admins.find()
```

### Delete Admin
```bash
# Using MongoDB Compass or CLI
db.admins.deleteOne({ email: 'geniuscare@gmail.com' })
```

---

## ✅ Everything is Ready!

Your admin panel is now fully set up and secure:
- ✅ Hidden keyboard shortcut access (Ctrl+Shift+A)
- ✅ Professional login page
- ✅ Gmail/email authentication
- ✅ Admin account created
- ✅ MongoDB connected
- ✅ JWT authentication ready

**You can now login and manage admissions and contacts!** 🎊

---

**Last Updated**: January 29, 2026
