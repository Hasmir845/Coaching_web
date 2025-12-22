import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaClock } from 'react-icons/fa'

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { label: 'দিন', value: timeLeft.days },
    { label: 'ঘন্টা', value: timeLeft.hours },
    { label: 'মিনিট', value: timeLeft.minutes },
    { label: 'সেকেন্ড', value: timeLeft.seconds },
  ]

  return (
    <motion.div
      className="countdown-timer"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="countdown-header">
        <FaClock />
        <h3>বিশেষ অফার শেষ হতে বাকি</h3>
      </div>
      <div className="countdown-grid">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={index}
            className="countdown-item"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          >
            <motion.div
              className="countdown-value"
              key={unit.value}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {unit.value.toString().padStart(2, '0')}
            </motion.div>
            <div className="countdown-label">{unit.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default CountdownTimer

