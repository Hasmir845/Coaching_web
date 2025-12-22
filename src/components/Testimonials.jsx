import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'রাহুল ইসলাম',
      batch: 'SSC ২০২৩',
      rating: 5,
      text: 'ScienceCare কোচিং-এর শিক্ষকদের ধৈর্য্য ও যত্নের কারণে আমি SSC তে A+ পেয়েছি। বিশেষ করে গণিত ও পদার্থবিজ্ঞানে তাদের সহায়তা অসাধারণ ছিল।',
      image: '👨‍🎓',
    },
    {
      name: 'সুমাইয়া খাতুন',
      batch: 'HSC ২০২৩',
      rating: 5,
      text: 'নিয়মিত পরীক্ষা ও মডেল টেস্টের কারণে আমি পরীক্ষার জন্য খুব ভালোভাবে প্রস্তুত হয়েছিলাম। HSC তে GPA 5.00 পেয়েছি।',
      image: '👩‍🎓',
    },
    {
      name: 'আরিফ হাসান',
      batch: 'SSC ২০২২',
      rating: 5,
      text: 'সীমিত আসনের কারণে শিক্ষকরা প্রত্যেক শিক্ষার্থীর দিকে ব্যক্তিগত মনোযোগ দিতে পারতেন। এটি আমার জন্য খুবই উপকারী ছিল।',
      image: '👨‍🎓',
    },
    {
      name: 'ফাতেমা বেগম',
      batch: 'HSC ২০২২',
      rating: 5,
      text: 'দুর্বল শিক্ষার্থীদের জন্য বিশেষ ক্লাসের ব্যবস্থা ছিল। আমি রসায়নে খুব দুর্বল ছিলাম, কিন্তু শিক্ষকদের সহায়তায় এখন আমি ভালো করছি।',
      image: '👩‍🎓',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section testimonials-section">
      <div className="section-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FaQuoteLeft /> শিক্ষার্থীদের মতামত
        </motion.h2>
        <p className="section-subtitle">
          আমাদের সফল শিক্ষার্থীদের অভিজ্ঞতা
        </p>
      </div>

      <div className="testimonials-container">
        <motion.button
          className="testimonial-nav prev"
          onClick={prevTestimonial}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronLeft />
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="testimonial-card"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="testimonial-image">{testimonials[currentIndex].image}</div>
            <div className="testimonial-content">
              <div className="testimonial-rating">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="testimonial-text">"{testimonials[currentIndex].text}"</p>
              <div className="testimonial-author">
                <h4>{testimonials[currentIndex].name}</h4>
                <p>{testimonials[currentIndex].batch}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          className="testimonial-nav next"
          onClick={nextTestimonial}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronRight />
        </motion.button>
      </div>

      <div className="testimonial-indicators">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  )
}

export default Testimonials

