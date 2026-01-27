# Quick Fix for Login Error

## Problem: "Server error during login"

### Solution 1: Check .env file

Make sure `server/.env` file has these variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sciencecare
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```

### Solution 2: Generate JWT_SECRET

If JWT_SECRET is missing, generate one:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and add to `.env` file:
```env
JWT_SECRET=paste-generated-secret-here
```

### Solution 3: Restart Server

After updating .env file:

```bash
cd server
npm start
```

### Solution 4: Check MongoDB Connection

Make sure MongoDB connection string is correct in `.env` file.

### Solution 5: Check Server Logs

Look at the terminal where server is running for error messages.

