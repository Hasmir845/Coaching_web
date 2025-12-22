import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaUser, FaPhone, FaGraduationCap, FaCheckCircle } from 'react-icons/fa'

const EnrollmentModal = ({ batchType, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    batch: batchType || 'ssc',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    }, 500)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {!isSubmitted ? (
            <>
              <div className="modal-header">
                <h2>
                  <FaGraduationCap /> ভর্তি ফর্ম
                </h2>
                <motion.button
                  className="close-button"
                  onClick={onClose}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="enrollment-form">
                <div className="form-group">
                  <label>
                    <FaUser /> নাম
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="আপনার সম্পূর্ণ নাম"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaPhone /> মোবাইল নম্বর
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="01XXXXXXXXX"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FaGraduationCap /> ব্যাচ
                  </label>
                  <select
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    required
                  >
                    <option value="ssc">SSC ব্যাচ - ২০০০ টাকা</option>
                    <option value="hsc">HSC ব্যাচ - ২৫০০ টাকা</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>ঠিকানা (ঐচ্ছিক)</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="আপনার ঠিকানা"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="submit-enroll-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCheckCircle /> ভর্তি আবেদন করুন
                </motion.button>
              </form>
            </>
          ) : (
            <motion.div
              className="success-message"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <FaCheckCircle className="success-icon" />
              <h2>ধন্যবাদ!</h2>
              <p>আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো।</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default EnrollmentModal

