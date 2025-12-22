import React from 'react'
import { motion } from 'framer-motion'
import { FaClock, FaCalendarAlt, FaUsers, FaExclamationCircle } from 'react-icons/fa'

const BatchInfo = () => {
  const batchInfo = [
    {
      icon: FaCalendarAlt,
      title: 'নতুন ব্যাচ',
      description: 'নতুন ব্যাচ শীঘ্রই শুরু',
      status: 'শীঘ্রই',
    },
    {
      icon: FaUsers,
      title: 'আলাদা ব্যাচ',
      description: 'SSC ও HSC আলাদা আলাদা ব্যাচ',
      status: 'ব্যক্তিগত মনোযোগ',
    },
    {
      icon: FaExclamationCircle,
      title: 'সীমিত আসন',
      description: 'আসন সীমিত — দ্রুত ভর্তি চলবে',
      status: 'জরুরি',
      isUrgent: true,
    },
  ]

  return (
    <section className="section batch-section">
      <div className="section-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FaClock /> ব্যাচ সংক্রান্ত তথ্য
        </motion.h2>
      </div>

      <div className="batch-info-grid">
        {batchInfo.map((info, index) => (
          <motion.div
            key={index}
            className={`batch-info-card ${info.isUrgent ? 'highlight-batch' : ''}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <motion.div
              className="batch-icon"
              animate={info.isUrgent ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <info.icon />
            </motion.div>
            <h3>{info.title}</h3>
            <p>{info.description}</p>
            <motion.div
              className={`batch-status ${info.isUrgent ? 'urgent' : ''}`}
              animate={info.isUrgent ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {info.status}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default BatchInfo

