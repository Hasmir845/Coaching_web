import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import admissionRoutes from './routes/admission.js'
import contactRoutes from './routes/contact.js'
import authRoutes from './routes/auth.js'
import { securityHeaders, apiLimiter, validateInput } from './middleware/security.js'

dotenv.config()

const app = express()

// Security Headers
app.use(securityHeaders)

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*', // Change to your frontend URL in production
  credentials: true,
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

// Body parser middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Rate limiting for all API routes
app.use('/api', apiLimiter)

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully')
  })
  .catch((error) => {
    console.error('❌ MongoDB Connection Error:', error)
  })

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/admission', admissionRoutes)
app.use('/api/contact', contactRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// 🔴 Vercel-এর জন্য এইটা MUST
export default app

// Start server (for local development)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000
  
  // Check required environment variables
  if (!process.env.JWT_SECRET) {
    console.error('❌ ERROR: JWT_SECRET is not set in .env file!')
    console.error('Please add JWT_SECRET to your .env file')
    console.error('You can generate one using: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"')
    process.exit(1)
  }
  
  if (!process.env.MONGODB_URI) {
    console.error('❌ ERROR: MONGODB_URI is not set in .env file!')
    console.error('Please add MONGODB_URI to your .env file')
    process.exit(1)
  }
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`📡 API Health: http://localhost:${PORT}/api/health`)
    console.log(`✅ JWT_SECRET: ${process.env.JWT_SECRET ? 'Set' : 'Missing!'}`)
    console.log(`✅ MONGODB_URI: ${process.env.MONGODB_URI ? 'Set' : 'Missing!'}`)
  })
}
