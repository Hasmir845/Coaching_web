# Vercel-এ Backend Deploy করার Guide

## 📋 Prerequisites

1. Vercel account (free account is enough)
2. MongoDB Atlas account (free tier available)
3. Git repository (GitHub/GitLab/Bitbucket)

## 🚀 Step-by-Step Deployment

### Step 1: Vercel CLI Install করুন

```bash
npm install -g vercel
```

### Step 2: Vercel-এ Login করুন

```bash
vercel login
```

### Step 3: Project Root-এ যান

```bash
cd E:\business\Coaching
```

### Step 4: Vercel Project Initialize করুন

```bash
vercel
```

প্রথমবার এটা চালালে কিছু প্রশ্ন করবে:
- **Set up and deploy?** → `Y`
- **Which scope?** → আপনার account select করুন
- **Link to existing project?** → `N` (প্রথমবার)
- **Project name?** → `sciencecare-coaching` (বা আপনার পছন্দমতো)
- **Directory?** → `.` (current directory)
- **Override settings?** → `N`

### Step 5: Environment Variables Set করুন

Vercel Dashboard-এ যান এবং Environment Variables add করুন:

1. **Vercel Dashboard** → আপনার project → **Settings** → **Environment Variables**

2. এই variables add করুন:
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/sciencecare
   NODE_ENV = production
   ```

   **Important:** MongoDB Atlas-এ:
   - Network Access-এ `0.0.0.0/0` add করুন (all IPs allow)
   - Database User create করুন এবং password set করুন

### Step 6: Deploy করুন

```bash
vercel --prod
```

অথবা Vercel Dashboard থেকে **Deployments** tab-এ **Redeploy** করুন।

## 🔄 Code Update করার সময়

### Method 1: Git Push (Recommended)

```bash
# Changes commit করুন
git add .
git commit -m "Update backend code"
git push origin main

# Vercel automatically deploy করবে (যদি Git integration থাকে)
```

### Method 2: Vercel CLI দিয়ে

```bash
# Production-এ deploy
vercel --prod

# Preview deploy (testing)
vercel
```

### Method 3: Vercel Dashboard

1. Vercel Dashboard-এ যান
2. আপনার project select করুন
3. **Deployments** tab-এ যান
4. **Redeploy** button click করুন

## 📁 Project Structure (Vercel-এর জন্য)

```
Coaching/
├── server/
│   ├── server.js          ← Main entry point
│   ├── models/
│   │   ├── Admission.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── admission.js
│   │   └── contact.js
│   └── package.json
├── vercel.json            ← Vercel configuration
└── package.json
```

## ⚙️ Vercel Configuration (vercel.json)

আমরা already `vercel.json` file তৈরি করেছি যা:
- Serverless function হিসেবে `server/server.js` run করবে
- `/api/*` routes handle করবে
- Production environment set করবে

## 🔍 Testing After Deployment

Deploy হওয়ার পর এই URL-এ test করুন:

```
https://your-project.vercel.app/api/health
```

Response পাওয়া উচিত:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## 🌐 Frontend-এ API URL Update করুন

`.env` file-এ (root directory-তে):

```env
VITE_API_URL=https://your-project.vercel.app
```

অথবা Vercel Dashboard-এ **Environment Variables**-এ add করুন:
```
VITE_API_URL = https://your-project.vercel.app
```

## 📝 Important Notes

1. **MongoDB Connection:**
   - MongoDB Atlas-এ connection string সঠিক আছে কিনা check করুন
   - Network Access-এ Vercel IPs allow আছে কিনা check করুন

2. **Environment Variables:**
   - Production environment-এ variables set করুন
   - Sensitive data (passwords, API keys) কখনো code-এ commit করবেন না

3. **Logs Check:**
   - Vercel Dashboard → **Deployments** → **Functions** → Logs check করুন
   - Error থাকলে logs-এ দেখাবে

4. **Cold Start:**
   - Serverless functions প্রথম request-এ কিছুটা slow হতে পারে (cold start)
   - এটি normal behavior

## 🐛 Troubleshooting

### Problem: MongoDB Connection Error
**Solution:**
- MongoDB Atlas-এ Network Access check করুন
- Connection string সঠিক আছে কিনা verify করুন
- Environment variable সঠিকভাবে set আছে কিনা check করুন

### Problem: 404 Error on API Routes
**Solution:**
- `vercel.json` file সঠিক আছে কিনা check করুন
- Routes `/api/*` pattern follow করছে কিনা verify করুন

### Problem: Module Not Found
**Solution:**
- `server/package.json`-এ সব dependencies আছে কিনা check করুন
- Vercel automatically `npm install` করবে

## 🔗 Useful Commands

```bash
# Vercel project info
vercel inspect

# Production logs দেখুন
vercel logs --prod

# Environment variables দেখুন
vercel env ls

# Environment variable add করুন
vercel env add MONGODB_URI production
```

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)

---

**Happy Deploying! 🚀**

