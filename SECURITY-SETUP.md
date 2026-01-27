# 🔒 Security Setup Guide

## Overview

Your website now has comprehensive security features including:
- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- Security headers
- Input validation
- Protected API routes

## 🚀 Setup Instructions

### Step 1: Install Dependencies

```bash
cd server
npm install
```

This will install:
- `jsonwebtoken` - For JWT token generation
- `bcryptjs` - For password hashing
- `express-rate-limit` - For rate limiting

### Step 2: Configure Environment Variables

Create `server/.env` file:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sciencecare

# JWT Secret (IMPORTANT: Generate a strong random string!)
# You can generate one using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-url.netlify.app

# Admin Password (for initial admin creation)
ADMIN_PASSWORD=your-secure-password-here

# Server Port
PORT=5000
```

### Step 3: Create Initial Admin User

```bash
cd server
node scripts/createAdmin.js
```

This will create a default admin user:
- **Username:** `admin`
- **Email:** `admin@sciencecare.com`
- **Password:** (from ADMIN_PASSWORD env variable or default: `admin123`)

⚠️ **IMPORTANT:** Change the password after first login!

### Step 4: Start the Server

```bash
cd server
npm start
```

## 🔐 Security Features

### 1. Authentication
- JWT token-based authentication
- Password hashing with bcrypt (12 rounds)
- Token expiration (7 days default)
- Automatic token verification

### 2. Rate Limiting
- **API Routes:** 100 requests per 15 minutes per IP
- **Auth Routes:** 5 login attempts per 15 minutes per IP
- **Form Submissions:** 10 submissions per hour per IP

### 3. Security Headers
- X-Frame-Options: DENY (prevents clickjacking)
- X-Content-Type-Options: nosniff
- X-XSS-Protection: enabled
- Strict-Transport-Security (HTTPS only)
- Content-Security-Policy
- Referrer-Policy

### 4. Input Validation
- SQL injection protection
- XSS attack prevention
- Input sanitization

### 5. Protected Routes
- All admin routes require authentication
- Public routes (form submissions) are rate-limited
- Token verification on every request

## 📝 API Endpoints

### Public Endpoints (Rate Limited)
- `POST /api/admission/submit` - Submit admission form
- `POST /api/contact/submit` - Submit contact form
- `GET /api/health` - Health check

### Protected Endpoints (Require Authentication)
- `GET /api/admission/all` - Get all admissions
- `GET /api/admission/stats/overview` - Get statistics
- `PATCH /api/admission/:id/status` - Update admission status
- `GET /api/contact/all` - Get all contacts
- `GET /api/contact/stats/overview` - Get contact statistics
- `PATCH /api/contact/:id/status` - Update contact status

### Authentication Endpoints
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin info
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout (client-side)

## 🔑 Frontend Authentication

The frontend now uses JWT tokens stored in localStorage:

1. **Login:** User enters username/email and password
2. **Token Storage:** JWT token is stored in localStorage
3. **API Requests:** Token is sent in Authorization header
4. **Auto-Logout:** If token expires, user is automatically logged out

## 🛡️ Best Practices

1. **Change Default Password:** Always change the default admin password
2. **Strong JWT Secret:** Use a strong, random JWT_SECRET (at least 32 characters)
3. **HTTPS Only:** Always use HTTPS in production
4. **Environment Variables:** Never commit `.env` file to Git
5. **Regular Updates:** Keep dependencies updated
6. **Monitor Logs:** Check server logs for suspicious activity

## 🚨 Security Checklist

- [ ] JWT_SECRET is set to a strong random string
- [ ] ADMIN_PASSWORD is changed from default
- [ ] MongoDB connection string is secure
- [ ] CORS is configured for your frontend URL only
- [ ] Environment variables are not committed to Git
- [ ] HTTPS is enabled in production
- [ ] Rate limiting is working
- [ ] All admin routes require authentication

## 🔧 Troubleshooting

### Problem: "Authentication required" error
**Solution:** Make sure you're logged in and token is valid

### Problem: "Token expired" error
**Solution:** Login again to get a new token

### Problem: Rate limit exceeded
**Solution:** Wait for the rate limit window to reset (15 minutes)

### Problem: Cannot create admin user
**Solution:** Check MongoDB connection and ensure MONGODB_URI is correct

## 📚 Additional Resources

- [JWT Documentation](https://jwt.io/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

**Stay Secure! 🔒**

