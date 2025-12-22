import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaChalkboardTeacher,
  FaLightbulb,
  FaClipboardCheck,
  FaHandsHelping,
  FaUserFriends,
} from 'react-icons/fa'

const Features = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null)

  const features = [
    {
      icon: FaChalkboardTeacher,
      title: 'অভিজ্ঞ শিক্ষক',
      description: 'অভিজ্ঞ ও যত্নশীল শিক্ষক',
      highlight: '১০+ বছর অভিজ্ঞতা',
    },
    {
      icon: FaLightbulb,
      title: 'সহজ শিক্ষা',
      description: 'সহজভাবে কনসেপ্ট ক্লিয়ার',
      highlight: 'ব্যবহারিক উদাহরণ',
    },
    {
      icon: FaClipboardCheck,
      title: 'নিয়মিত পরীক্ষা',
      description: 'নিয়মিত সাপ্তাহিক পরীক্ষা ও মডেল টেস্ট',
      highlight: 'সাপ্তাহিক মূল্যায়ন',
    },
    {
      icon: FaHandsHelping,
      title: 'বিশেষ যত্ন',
      description: 'দুর্বল শিক্ষার্থীদের জন্য বিশেষ যত্ন',
      highlight: 'ব্যক্তিগত গাইডেন্স',
    },
    {
      icon: FaUserFriends,
      title: 'সীমিত আসন',
      description: 'সীমিত আসন — ব্যক্তিগত মনোযোগ নিশ্চিত',
      highlight: 'জনপ্রিয় ব্যাচ',
      isHighlight: true,
    },
  ]

  return (
    <section id="features" className="section features-section">
      <div className="section-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FaChalkboardTeacher /> কেন আমাদের কোচিং
        </motion.h2>
        <p className="section-subtitle">
          আমাদের বিশেষত্ব যা আপনাকে সাফল্যের দিকে এগিয়ে নিয়ে যাবে
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`feature-item ${feature.isHighlight ? 'highlight-feature' : ''}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onHoverStart={() => setHoveredFeature(index)}
            onHoverEnd={() => setHoveredFeature(null)}
            whileHover={{ y: -10 }}
          >
            <div className="feature-icon-wrapper">
              <motion.div
                className="feature-icon"
                animate={
                  hoveredFeature === index
                    ? { rotate: 360, scale: 1.1 }
                    : { rotate: 0, scale: 1 }
                }
                transition={{ duration: 0.6 }}
              >
                <feature.icon />
              </motion.div>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <motion.div
              className={`feature-highlight ${feature.isHighlight ? 'highlight-badge' : ''}`}
              animate={feature.isHighlight ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {feature.isHighlight && <FaChalkboardTeacher />}
              {feature.highlight}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Features

