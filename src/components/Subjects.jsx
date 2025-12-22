import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFlask, FaMicroscope, FaAtom, FaVial, FaCalculator, FaDna, FaGraduationCap, FaUniversity, FaCheckCircle } from 'react-icons/fa'

const Subjects = () => {
  const [hoveredCard, setHoveredCard] = useState(null)

  const subjects = [
    {
      id: 'ssc',
      title: 'SSC (বিজ্ঞান)',
      icon: FaFlask,
      headerIcon: FaGraduationCap,
      subjects: [
        { icon: FaAtom, name: 'পদার্থবিজ্ঞান' },
        { icon: FaVial, name: 'রসায়ন' },
        { icon: FaCalculator, name: 'গণিত' },
        { icon: FaDna, name: 'জীববিজ্ঞান' },
      ],
      highlight: 'সম্পূর্ণ সিলেবাস কভার',
    },
    {
      id: 'hsc',
      title: 'HSC (বিজ্ঞান)',
      icon: FaMicroscope,
      headerIcon: FaUniversity,
      subjects: [
        { icon: FaAtom, name: 'পদার্থবিজ্ঞান' },
        { icon: FaVial, name: 'রসায়ন' },
        { icon: FaCalculator, name: 'গণিত' },
        { icon: FaDna, name: 'জীববিজ্ঞান' },
      ],
      highlight: 'উচ্চতর কনসেপ্ট ক্লিয়ার',
    },
  ]

  return (
    <section id="subjects" className="section subjects-section">
      <div className="section-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FaFlask /> বিষয়সমূহ
        </motion.h2>
        <p className="section-subtitle">
          আমরা SSC ও HSC বিজ্ঞান বিভাগের সকল বিষয়ে কোচিং প্রদান করি
        </p>
      </div>

      <div className="subjects-grid">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            className="subject-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            onHoverStart={() => setHoveredCard(subject.id)}
            onHoverEnd={() => setHoveredCard(null)}
            whileHover={{ y: -10 }}
          >
            <div className="subject-icon">
              <motion.div
                animate={hoveredCard === subject.id ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.6 }}
              >
                <subject.icon />
              </motion.div>
            </div>
            <h3 className="subject-title">{subject.title}</h3>
            <div className="subject-image">
              <motion.div
                animate={hoveredCard === subject.id ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <subject.headerIcon />
              </motion.div>
            </div>
            <ul className="subject-list">
              {subject.subjects.map((sub, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + idx * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <sub.icon />
                  {sub.name}
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="subject-highlight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + 0.4 }}
            >
              <FaCheckCircle /> {subject.highlight}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Subjects

