import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

// Verify JWT token
export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please login.',
      })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token not provided',
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get admin from token
    const admin = await Admin.findById(decoded.id).select('-password')

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin not found',
      })
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Admin account is deactivated',
      })
    }

    // Attach admin to request
    req.admin = admin
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token',
      })
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Authentication token expired. Please login again.',
      })
    }
    res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message,
    })
  }
}

// Check if admin is superadmin
export const isSuperAdmin = (req, res, next) => {
  if (req.admin.role !== 'superadmin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Superadmin privileges required.',
    })
  }
  next()
}

