import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhoneAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    batch: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    alert('ধন্যবাদ! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো।')
    setFormData({ name: '', phone: '', batch: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="section-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FaPhoneAlt /> যোগাযোগ
        </motion.h2>
        <p className="section-subtitle">
          আমাদের সাথে যোগাযোগ করুন এবং ভর্তি সম্পর্কে জানুন
        </p>
      </div>

      <div className="contact-grid">
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -10 }}
        >
          <motion.div
            className="contact-icon"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <FaMapMarkerAlt />
          </motion.div>
          <h3>ঠিকানা</h3>
          <p>________________________________</p>
          <p className="contact-note">চন্দ্রা, গাজীপুর</p>
        </motion.div>

        <motion.div
          className="contact-card highlight-contact"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -10 }}
        >
          <motion.div
            className="contact-icon"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <FaPhone />
          </motion.div>
          <h3>মোবাইল</h3>
          <p className="phone-number">০১৭৬৩২৩৩৮৪৫ / ০১৬০৫৮১৮২৬০</p>
          <div className="contact-buttons">
            <motion.a
              href="tel:+8801763233845"
              className="call-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPhone /> কল করুন
            </motion.a>
            <motion.a
              href="https://wa.me/8801763233845"
              className="whatsapp-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp chat"
            >
              <FaWhatsapp /> WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="contact-form-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3>দ্রুত যোগাযোগ ফর্ম</h3>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="আপনার নাম"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="মোবাইল নম্বর"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <select
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            required
          >
            <option value="">ব্যাচ নির্বাচন করুন</option>
            <option value="ssc">SSC ব্যাচ</option>
            <option value="hsc">HSC ব্যাচ</option>
          </select>
          <textarea
            name="message"
            placeholder="বার্তা (ঐচ্ছিক)"
            value={formData.message}
            onChange={handleChange}
            rows="4"
          />
          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope /> পাঠান
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        className="contact-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p>ভর্তি সম্পর্কে আরও জানতে এখনই কল করুন!</p>
        <motion.a
          href="tel:+8801763233845"
          className="cta-button-large"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPhoneAlt /> এখনই কল করুন
        </motion.a>
      </motion.div>
    </section>
  )
}

export default Contact

