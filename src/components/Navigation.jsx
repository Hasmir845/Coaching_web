import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap } from 'react-icons/fa'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'subjects', label: 'বিষয়সমূহ' },
    { id: 'features', label: 'কেন আমরা' },
    { id: 'fees', label: 'ভর্তি ফি' },
    { id: 'admission', label: 'ভর্তি হোন', highlight: true },
    { id: 'contact', label: 'যোগাযোগ' },
  ]

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGraduationCap className="logo-icon" />
          <span>GeniusCare</span>
        </motion.div>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.id)
                }}
                className={item.highlight ? 'highlight-nav' : ''}
              >
                {item.label}
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.button
          className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.button>
      </div>
    </motion.nav>
  )
}

export default Navigation

