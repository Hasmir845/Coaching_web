# MongoDB Integration Complete! 🎉

Your ScienceCare Coaching website now has MongoDB database integration. Student admission forms will be saved to the database.

## Quick Start Guide

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 2: Set Up MongoDB

**Option A: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Create `server/.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sciencecare
PORT=5000
```

**Option B: Local MongoDB**
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Create `server/.env` file:
```
MONGODB_URI=mongodb://localhost:27017/sciencecare
PORT=5000
```

### Step 3: Start Backend Server

```bash
cd server
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 4: Start Frontend (in another terminal)

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### Step 5: Test the Form

1. Go to `http://localhost:3000`
2. Click "ভর্তি হোন" in navigation
3. Fill out the admission form
4. Submit the form
5. Data will be saved to MongoDB!

## View Data in Database

### Using MongoDB Compass (GUI)
1. Download: https://www.mongodb.com/products/compass
2. Connect using your connection string
3. Navigate to `sciencecare` database
4. View `admissions` collection

### Using MongoDB Shell
```bash
mongosh
use sciencecare
db.admissions.find().pretty()
```

## Admin Panel (Optional)

To view all submissions, you can add the AdminPanel component:

1. Import in `src/App.jsx`:
```jsx
import AdminPanel from './components/AdminPanel'
```

2. Add route (or use conditional rendering):
```jsx
<AdminPanel />
```

Access at: `http://localhost:3000/admin` (if you set up routing)

Default password: `admin123` (Change this in AdminPanel.jsx!)

## API Endpoints

- `POST /api/admission/submit` - Submit admission form
- `GET /api/admission/all` - Get all admissions (admin)
- `GET /api/admission/stats/overview` - Get statistics
- `PATCH /api/admission/:id/status` - Update admission status

## File Structure

```
Coaching/
├── server/
│   ├── models/
│   │   └── Admission.js      # Database schema
│   ├── routes/
│   │   └── admission.js      # API routes
│   ├── server.js              # Express server
│   └── package.json
├── src/
│   └── components/
│       └── AdmissionForm.jsx  # Updated form (sends to API)
└── package.json
```

## Troubleshooting

**Connection Error:**
- Check MongoDB is running
- Verify connection string in `server/.env`
- Check firewall settings

**Port Already in Use:**
- Change PORT in `server/.env`
- Or stop process using port 5000

**Form Not Submitting:**
- Check browser console for errors
- Verify backend is running
- Check API_URL in frontend

## Next Steps

1. ✅ Set up MongoDB
2. ✅ Start backend server
3. ✅ Test form submission
4. ✅ View data in database
5. 🔒 Add authentication (recommended for production)
6. 📧 Add email notifications
7. 📊 Add analytics dashboard

---

**Need Help?** Check `SETUP-MONGODB.md` for detailed MongoDB setup instructions.

