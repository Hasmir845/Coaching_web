## GeniusCare Admin Login - Troubleshooting Checklist

### ✅ Quick Checklist to Get Login Working

#### Step 1: Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows with MongoDB installed:
mongod

# Or if using MongoDB Atlas (Cloud), ensure internet connection
```

#### Step 2: Setup .env File
Create/verify `server/.env` file with:
```env
MONGODB_URI=mongodb://localhost:27017/geniuscare
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/geniuscare

JWT_SECRET=your-super-secret-key-at-least-32-characters-long
JWT_EXPIRES_IN=7d
ADMIN_PASSWORD=GeniusCare@2024
PORT=5000
NODE_ENV=development
```

#### Step 3: Create Admin Account
```bash
cd server
npm install  # If you haven't installed dependencies
node scripts/createAdmin.js
```

You should see:
```
✅ Admin user created successfully!
📧 Email: geniuscare@gmail.com
👤 Username: geniuscare
🔑 Password: GeniusCare@2024
```

#### Step 4: Start the Server
```bash
cd server
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```

#### Step 5: Start the Frontend
In another terminal:
```bash
npm start  # or npm run dev
```

#### Step 6: Test Login
1. Press `Ctrl+Shift+A` on the website
2. Enter credentials:
   - Email: `geniuscare@gmail.com`
   - Password: `GeniusCare@2024`
3. Click Login

---

### ❌ If Login Still Doesn't Work

#### Run Debug Script
```bash
cd server
node scripts/debugLogin.js
```

This will check:
- MongoDB connection
- Admin account existence
- Password validity
- JWT configuration
- Server setup

#### Check Browser Console
1. Open website in browser
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Look for red error messages
5. Check **Network** tab for failed requests to `/api/auth/login`

#### Check Server Logs
Make sure to see output like:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```

Look for any error messages.

#### Common Issues

**Issue**: "Cannot connect to server"
- **Fix**: Make sure server is running with `npm start` in server directory

**Issue**: "Invalid username or password"
- **Fix**: Run `node scripts/createAdmin.js` to create/reset admin account

**Issue**: "Database connection error"
- **Fix**: 
  - Check MongoDB is running (`mongod` command)
  - Verify MONGODB_URI in .env file
  - Check internet if using MongoDB Atlas

**Issue**: "Server configuration error"
- **Fix**: Add `JWT_SECRET=any-random-string` to server/.env file

**Issue**: Login page doesn't appear
- **Fix**: 
  - Make sure you pressed `Ctrl+Shift+A`
  - Or navigate directly to `/admin` in URL bar
  - Try refreshing page

---

### 🔧 Reset Everything (Nuclear Option)

If nothing works, reset completely:

1. **Delete admin from MongoDB**:
   ```bash
   # Using MongoDB Compass or CLI:
   # Remove the admin document with email: geniuscare@gmail.com
   ```

2. **Clear browser cache**:
   - Press `Ctrl+Shift+Delete` (Shift+Cmd+Delete on Mac)
   - Clear all data

3. **Create admin again**:
   ```bash
   cd server
   node scripts/createAdmin.js
   ```

4. **Restart server**:
   ```bash
   npm start
   ```

5. **Refresh browser and try login again**

---

### 📞 Still Need Help?

Check these files for clues:
- `server/.env` - Configuration
- `server/server.js` - Server setup
- `server/routes/auth.js` - Login endpoint
- Browser Console (F12) - Client-side errors
- Server Terminal - Server-side errors

---

**Last Updated**: January 2026
