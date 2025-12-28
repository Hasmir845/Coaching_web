import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaTag, FaGift, FaGraduationCap, FaUniversity, FaUserPlus } from 'react-icons/fa'
import CountdownTimer from './CountdownTimer'

const Fees = ({ onEnrollClick }) => {
  const [hoveredCard, setHoveredCard] = useState(null)

  const feeCards = [
    {
      id: 'ssc',
      title: 'SSC ব্যাচ',
      icon: FaGraduationCap,
      regularFee: 2500,
      discount: 500,
      finalFee: 2000,
      badge: 'জনপ্রিয়',
      isPremium: false,
    },
    {
      id: 'hsc',
      title: 'HSC ব্যাচ',
      icon: FaUniversity,
      regularFee: 3000,
      discount: 500,
      finalFee: 2500,
      badge: 'প্রিমিয়াম',
      isPremium: true,
    },
  ]

  return (
    <section id="fees" className="section fees-section">
      <div className="section-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FaTag /> ভর্তি ফি ও বিশেষ অফার
        </motion.h2>
        <p className="section-subtitle">
          সীমিত সময়ের জন্য বিশেষ ছাড় - দ্রুত ভর্তি হোন!
        </p>
      </div>

      <CountdownTimer />

      <div className="fees-grid">
        {feeCards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`fee-card ${card.id}-card ${card.isPremium ? 'highlight-card' : ''}`}
            initial={{ opacity: 0, rotateY: card.isPremium ? 90 : -90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            onHoverStart={() => setHoveredCard(card.id)}
            onHoverEnd={() => setHoveredCard(null)}
            whileHover={{ y: -15, scale: 1.03 }}
          >
            <motion.div
              className={`fee-badge ${card.isPremium ? 'premium' : ''}`}
              animate={card.isPremium ? { rotate: [5, -5, 5] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {card.badge}
            </motion.div>

            <div className="fee-icon">
              <motion.div
                animate={hoveredCard === card.id ? { y: [-5, 5, -5] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <card.icon />
              </motion.div>
            </div>

            <h3 className="fee-title">{card.title}</h3>
            <div className="fee-details">
              <p className="regular-fee">
                <span className="fee-label">নিয়মিত ফি:</span>
                <span className="strikethrough">{card.regularFee.toLocaleString('bn-BD')} টাকা</span>
              </p>

              <motion.div
                className="offer-banner"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaGift />
                <p className="offer-text">
                  <strong>প্রথম ২০ জনের জন্য</strong>
                  <br />
                  <span className="discount">{card.discount} টাকা ছাড়</span>
                </p>
              </motion.div>

              <motion.div
                className="final-fee"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                <span className="fee-label-small">ভর্তি ফি মাত্র</span>
                <motion.span
                  className="fee-amount"
                  animate={hoveredCard === card.id ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {card.finalFee.toLocaleString('bn-BD')} টাকা
                </motion.span>
              </motion.div>

              <motion.a
                href="#contact"
                className="enroll-button"
                onClick={(e) => {
                  e.preventDefault()
                  onEnrollClick(card.id)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUserPlus /> এখনই ভর্তি হোন
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="urgency-banner"
        animate={{ borderColor: ['#f44336', '#ff6b35', '#f44336'] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaGift />
        <p>
          <strong>সতর্কতা:</strong> আসন সীমিত! প্রথম ২০ জনের জন্য বিশেষ ছাড়। আজই রেজিস্ট্রেশন সম্পন্ন করুন!
        </p>
      </motion.div>
    </section>
  )
}

export default Fees

