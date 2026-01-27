import express from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import { authenticate } from '../middleware/auth.js'
import { authLimiter } from '../middleware/security.js'

const router = express.Router()

// Generate JWT token
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not configured. Please set it in .env file.')
  }
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

// Admin Login (rate limiting disabled in development)
const loginRateLimit = process.env.NODE_ENV === 'production' ? authLimiter : (req, res, next) => next()

router.post('/login', loginRateLimit, async (req, res) => {
  try {
    const { username, password } = req.body

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      })
    }

    // Find admin and include password for comparison
    const admin = await Admin.findOne({
      $or: [{ username }, { email: username }],
    }).select('+password')

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      })
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated. Please contact administrator.',
      })
    }

    // Compare password
    const isPasswordValid = await admin.comparePassword(password)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      })
    }

    // Update last login
    admin.lastLogin = new Date()
    await admin.save()

    // Generate token
    const token = generateToken(admin._id)

    // Remove password from response
    const adminData = admin.toObject()
    delete adminData.password

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        admin: adminData,
        token,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    console.error('Error stack:', error.stack)
    
    // More specific error messages
    let errorMessage = 'Server error during login'
    if (error.message.includes('JWT_SECRET')) {
      errorMessage = 'Server configuration error. Please contact administrator.'
    } else if (error.message.includes('MongoDB') || error.message.includes('connection')) {
      errorMessage = 'Database connection error. Please try again later.'
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
})

// Get current admin info (protected route)
router.get('/me', authenticate, async (req, res) => {
  try {
    res.json({
      success: true,
      data: req.admin,
    })
  } catch (error) {
    console.error('Get admin info error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching admin information',
      error: error.message,
    })
  }
})

// Verify token
router.get('/verify', authenticate, async (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    data: {
      admin: req.admin,
    },
  })
})

// Logout (client-side should remove token)
router.post('/logout', authenticate, async (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful',
  })
})

export default router

