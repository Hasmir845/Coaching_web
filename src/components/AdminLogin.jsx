import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaLock, FaUser, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import '../styles/AdminLogin.css'

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState({
    show: false,
    type: 'success',
    title: '',
    message: '',
  })

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const showNotification = (type, title, message) => {
    setNotification({ show: true, type, title, message })
    setTimeout(() => {
      setNotification({ show: false, type: 'success', title: '', message: '' })
    }, 3000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!email.trim() || !password.trim()) {
      showNotification('error', 'ত্রুটি!', 'অনুগ্রহ করে সব তথ্য পূরণ করুন')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: email, 
          password 
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error' }))
        showNotification('error', 'লগইন ব্যর্থ!', errorData.message || 'অনুগ্রহ করে আপনার ইমেইল এবং পাসওয়ার্ড চেক করুন')
        setPassword('')
        setIsLoading(false)
        return
      }

      const result = await response.json()

      if (result.success && result.data && result.data.token) {
        localStorage.setItem('adminToken', result.data.token)
        showNotification('success', 'লগইন সফল!', 'আপনি সফলভাবে লগইন করেছেন')
        
        setTimeout(() => {
          onLoginSuccess()
        }, 500)
        
        setEmail('')
        setPassword('')
      } else {
        showNotification('error', 'লগইন ব্যর্থ!', result.message || 'ভুল ইমেইল বা পাসওয়ার্ড')
        setPassword('')
      }
    } catch (error) {
      console.error('Login error:', error)
      showNotification('error', 'ত্রুটি!', 'সার্ভারের সাথে সংযোগ করতে সমস্যা হয়েছে')
      setPassword('')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="admin-login-container">
      {/* Background Elements */}
      <div className="login-background">
        <motion.div
          className="login-shape login-shape-1"
          animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="login-shape login-shape-2"
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Notification Modal */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            className="notification-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNotification({ show: false, type: 'success', title: '', message: '' })}
          >
            <motion.div
              className={`notification-modal ${notification.type}`}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="notification-icon">
                {notification.type === 'success' ? (
                  <FaCheckCircle />
                ) : (
                  <FaExclamationTriangle />
                )}
              </div>
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
              <motion.button
                className="notification-close-btn"
                onClick={() => setNotification({ show: false, type: 'success', title: '', message: '' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ঠিক আছে
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Card */}
      <motion.div
        className="login-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="login-header" variants={itemVariants}>
          <div className="login-icon-wrapper">
            <FaLock className="login-icon" />
          </div>
          <h1>GeniusCare</h1>
          <p>Admin Panel</p>
        </motion.div>

        <motion.form onSubmit={handleLogin} variants={itemVariants} className="login-form">
          <div className="form-group">
            <label htmlFor="email">
              <FaUser /> ইমেইল বা ইউজারনেম
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FaLock /> পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              placeholder="আপনার পাসওয়ার্ড প্রবেশ করুন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <motion.button
            type="submit"
            className="login-btn"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ⟳
              </motion.div>
            ) : (
              'লগইন করুন'
            )}
          </motion.button>
        </motion.form>

        <motion.div className="login-footer" variants={itemVariants}>
          <p>শুধুমাত্র প্রশাসকদের জন্য সংরক্ষিত প্রবেশাধিকার</p>
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="floating-element floating-element-1"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="floating-element floating-element-2"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
    </div>
  )
}

export default AdminLogin
