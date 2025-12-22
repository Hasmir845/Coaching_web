import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { FaUsers, FaGraduationCap, FaTrophy, FaStar } from 'react-icons/fa'

const Statistics = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const stats = [
    { icon: FaUsers, number: 500, suffix: '+', label: 'সফল শিক্ষার্থী' },
    { icon: FaGraduationCap, number: 10, suffix: '+', label: 'বছর অভিজ্ঞতা' },
    { icon: FaTrophy, number: 95, suffix: '%', label: 'পাসের হার' },
    { icon: FaStar, number: 4.8, suffix: '/5', label: 'রেটিং' },
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const Counter = ({ end, suffix, duration = 2 }) => {
    const [count, setCount] = React.useState(0)

    useEffect(() => {
      if (isInView) {
        let startTime = null
        const animate = (currentTime) => {
          if (!startTime) startTime = currentTime
          const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
          setCount(Math.floor(progress * end))
          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            setCount(end)
          }
        }
        requestAnimationFrame(animate)
      }
    }, [isInView, end, duration])

    return <span>{count}{suffix}</span>
  }

  return (
    <section className="statistics-section" ref={ref}>
      <div className="container">
        <motion.div
          className="statistics-grid"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="stat-icon">
                <stat.icon />
              </div>
              <div className="stat-number">
                <Counter end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Statistics

