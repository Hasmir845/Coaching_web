import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaPhone, FaMapMarkerAlt, FaFacebook, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { id: 'subjects', label: 'বিষয়সমূহ' },
    { id: 'features', label: 'কেন আমরা' },
    { id: 'fees', label: 'ভর্তি ফি' },
    { id: 'contact', label: 'যোগাযোগ' },
    { id: 'admin', label: 'Admin', isAdmin: true },
  ]

  const scrollToSection = (id) => {
    if (id === 'admin') {
      window.history.pushState({}, '', '/admin')
      window.dispatchEvent(new PopStateEvent('popstate'))
      return
    }
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <motion.div
          className="footer-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>
            <FaGraduationCap /> GeniusCare
          </h3>
          <p>নবম-দশম ও একাদশ-দ্বাদশ শ্রেনীর বিজ্ঞান বিভাগের নির্ভরযোগ্য কোচিং</p>
          <div className="social-links">
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaYoutube />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="footer-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h4>দ্রুত লিংক</h4>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.id)
                  }}
                  style={link.isAdmin ? { color: '#1976d2', fontWeight: '600' } : {}}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="footer-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4>যোগাযোগ</h4>
          <p>
            <FaPhone /> 01763233845 / 01605818260
          </p>
          <p>
            <FaMapMarkerAlt />সৃষ্টি ক্যাডেট কলেজের পাশে, কফিল হাউজ, চন্দ্রা, গাজীপুর
          </p>
        </motion.div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} GeniusCare একাডেমিক কোচিং | সকল অধিকার সংরক্ষিত</p>
      </div>
    </footer>
  )
}

export default Footer

