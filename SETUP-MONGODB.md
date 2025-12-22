# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud - Recommended)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (Free tier available)

### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `sciencecare`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sciencecare?retryWrites=true&w=majority
```

### Step 3: Update .env File
Create `server/.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sciencecare?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## Option 2: Local MongoDB

### Step 1: Install MongoDB
**Windows:**
1. Download from https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. MongoDB will run as a Windows service automatically

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Step 2: Verify Installation
```bash
mongod --version
```

### Step 3: Create .env File
Create `server/.env` file:
```
MONGODB_URI=mongodb://localhost:27017/sciencecare
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## Step 4: Start Backend Server

```bash
cd server
npm install
npm run dev
```

## Step 5: View Data in MongoDB

### Using MongoDB Compass (GUI)
1. Download from https://www.mongodb.com/products/compass
2. Connect using your connection string
3. Navigate to `sciencecare` database
4. View `admissions` collection

### Using MongoDB Shell
```bash
mongosh
use sciencecare
db.admissions.find().pretty()
```

## Troubleshooting

### Connection Error
- Check if MongoDB is running
- Verify connection string in .env
- Check firewall settings

### Port Already in Use
- Change PORT in .env file
- Or stop the process using port 5000

