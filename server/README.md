# ScienceCare Backend Server

Backend API server for ScienceCare Coaching admission form.

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update with your MongoDB connection string:

```bash
cp ../.env.example .env
```

Edit `.env`:
```
MONGODB_URI=mongodb://localhost:27017/sciencecare
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
# Make sure MongoDB is running locally
mongod
```

**MongoDB Atlas (Cloud):**
- Get connection string from MongoDB Atlas
- Update `MONGODB_URI` in `.env`

### 4. Run Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Submit Admission Form
```
POST /api/admission/submit
Body: Admission form data
```

### Get All Admissions (Admin)
```
GET /api/admission/all?batch=ssc&status=pending&page=1&limit=10
```

### Get Single Admission
```
GET /api/admission/:id
```

### Update Admission Status
```
PATCH /api/admission/:id/status
Body: { "status": "approved" }
```

### Get Statistics
```
GET /api/admission/stats/overview
```

## Database Schema

The admission form stores:
- Personal information (name, phone, email, address)
- Academic information (batch, class, school, results, subjects)
- Parent/Guardian information
- Status (pending, approved, rejected)
- Timestamps (createdAt, updatedAt)

