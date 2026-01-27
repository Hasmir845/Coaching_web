import rateLimit from 'express-rate-limit'

// Rate limiting for API routes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Stricter rate limiting for auth routes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 login attempts per windowMs (increased for development)
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting in development mode
    return process.env.NODE_ENV === 'development'
  },
})

// Rate limiting for form submissions
export const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 form submissions per hour
  message: {
    success: false,
    message: 'Too many form submissions, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Security headers middleware
export const securityHeaders = (req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY')
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff')
  
  // XSS Protection
  res.setHeader('X-XSS-Protection', '1; mode=block')
  
  // Strict Transport Security (if using HTTPS)
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }
  
  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  )
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  next()
}

// Input validation middleware
export const validateInput = (req, res, next) => {
  // Check for SQL injection patterns
  const sqlInjectionPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|SCRIPT)\b)/gi
  
  // Check for XSS patterns
  const xssPattern = /<script|javascript:|onerror=|onload=/gi
  
  const checkString = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        if (sqlInjectionPattern.test(obj[key]) || xssPattern.test(obj[key])) {
          return false
        }
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (!checkString(obj[key])) return false
      }
    }
    return true
  }
  
  if (req.body && !checkString(req.body)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input detected',
    })
  }
  
  next()
}

