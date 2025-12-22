import React from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaUsers, FaTrophy, FaPhone } from 'react-icons/fa'
import { FaBookReader } from 'react-icons/fa'

const Header = ({ onEnrollClick }) => {
  const badges = [
    { icon: FaStar, text: 'অভিজ্ঞ শিক্ষক' },
    { icon: FaUsers, text: 'সীমিত আসন' },
    { icon: FaTrophy, text: 'প্রমাণিত সাফল্য' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <header className="header" id="home">
      <div className="floating-shapes">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`shape shape-${i + 1}`}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -30, 20, 0],
              rotate: [0, 120, 240, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="header-content">
        <motion.div
          className="header-text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="main-title" variants={itemVariants}>
            ScienceCare একাডেমিক কোচিং
          </motion.h1>
          <motion.p className="subtitle" variants={itemVariants}>
            SSC ও HSC বিজ্ঞান বিভাগের নির্ভরযোগ্য কোচিং
          </motion.p>

          <motion.div className="header-badges" variants={itemVariants}>
            {badges.map((badge, index) => (
              <motion.span
                key={index}
                className="badge"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <badge.icon />
                {badge.text}
              </motion.span>
            ))}
          </motion.div>

          <motion.a
            href="#contact"
            className="cta-button"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById('contact')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
          >
            <FaPhone /> এখনই যোগাযোগ করুন
          </motion.a>
        </motion.div>

        <motion.div
          className="header-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="image-placeholder">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FaBookReader className="placeholder-icon" />
            </motion.div>
            <p>এখানে আপনার প্রতিষ্ঠানের ছবি যোগ করুন</p>
          </div>
        </motion.div>
      </div>
    </header>
  )
}

export default Header

