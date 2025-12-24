import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaIdCard,
  FaSchool,
  FaCheckCircle,
  FaPaperPlane,
} from 'react-icons/fa'

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    batch: '',
    class: '',
    school: '',
    fatherName: '',
    fatherPhone: '',
    motherName: '',
    previousResult: '',
    subjectPreference: [],
    emergencyContact: '',
    admissionDate: '',
  })

  const [showToast, setShowToast] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === 'checkbox') {
      const subjectPreference = formData.subjectPreference
      if (checked) {
        setFormData({
          ...formData,
          subjectPreference: [...subjectPreference, value],
        })
      } else {
        setFormData({
          ...formData,
          subjectPreference: subjectPreference.filter((sub) => sub !== value),
        })
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'নাম আবশ্যক'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'মোবাইল নম্বর আবশ্যক'
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)'
    }
    if (!formData.batch) {
      newErrors.batch = 'ব্যাচ নির্বাচন করুন'
    }
    if (!formData.class) {
      newErrors.class = 'ক্লাস নির্বাচন করুন'
    }
    if (!formData.school.trim()) {
      newErrors.school = 'স্কুলের নাম আবশ্যক'
    }
    if (!formData.fatherName.trim()) {
      newErrors.fatherName = 'পিতার নাম আবশ্যক'
    }
    if (!formData.fatherPhone.trim()) {
      newErrors.fatherPhone = 'পিতার মোবাইল নম্বর আবশ্যক'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        // Send data to backend API
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        const response = await fetch(`${API_URL}/api/admission/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        const result = await response.json()

        if (response.ok && result.success) {
          // Show toast confirmation
          setShowToast(true)

          // Auto-hide toast and reset form after 4 seconds
          setTimeout(() => {
            setShowToast(false)
            setFormData({
              name: '',
              phone: '',
              email: '',
              address: '',
              batch: '',
              class: '',
              school: '',
              fatherName: '',
              fatherPhone: '',
              motherName: '',
              previousResult: '',
              subjectPreference: [],
              emergencyContact: '',
              admissionDate: '',
            })
          }, 4000)
        } else {
          // Show error message
          alert(result.message || 'আবেদন জমা দেওয়ার সময় সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।')
        }
      } catch (error) {
        console.error('Form submission error:', error)
        alert('সার্ভারের সাথে সংযোগ করতে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const subjects = [
    { value: 'physics', label: 'পদার্থবিজ্ঞান' },
    { value: 'chemistry', label: 'রসায়ন' },
    { value: 'math', label: 'গণিত' },
    { value: 'biology', label: 'জীববিজ্ঞান' },
  ]



  return (
    <section id="admission" className="section admission-section">
      <div className="section-header">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FaGraduationCap /> এখনই ভর্তি হোন
        </motion.h2>
        <p className="section-subtitle">
          নিচের ফর্মটি পূরণ করে ভর্তি আবেদন করুন
        </p>
      </div>

      <motion.form
        className="admission-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Personal Information */}
        <div className="form-section">
          <h3 className="form-section-title">
            <FaUser /> ব্যক্তিগত তথ্য
          </h3>
          <div className="form-grid">
            <div className="form-group">
              <label>
                <FaUser /> শিক্ষার্থীর নাম <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="আপনার সম্পূর্ণ নাম"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>
                <FaPhone /> মোবাইল নম্বর <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label>
                <FaEnvelope /> ইমেইল (ঐচ্ছিক)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label>
                <FaMapMarkerAlt /> ঠিকানা
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="আপনার সম্পূর্ণ ঠিকানা"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="form-section">
          <h3 className="form-section-title">
            <FaSchool /> শিক্ষাগত তথ্য
          </h3>
          <div className="form-grid">
            <div className="form-group">
              <label>
                <FaGraduationCap /> ব্যাচ নির্বাচন করুন <span className="required">*</span>
              </label>
              <select
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className={errors.batch ? 'error' : ''}
              >
                <option value="">ব্যাচ নির্বাচন করুন</option>
                <option value="ssc">SSC ব্যাচ - ২০০০ টাকা</option>
                <option value="hsc">HSC ব্যাচ - ২৫০০ টাকা</option>
              </select>
              {errors.batch && <span className="error-message">{errors.batch}</span>}
            </div>

            <div className="form-group">
              <label>
                <FaIdCard /> বর্তমান ক্লাস <span className="required">*</span>
              </label>
              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                className={errors.class ? 'error' : ''}
              >
                <option value="">ক্লাস নির্বাচন করুন</option>
                <option value="9">ক্লাস ৯</option>
                <option value="10">ক্লাস ১০</option>
                <option value="11">ক্লাস ১১</option>
                <option value="12">ক্লাস ১২</option>
              </select>
              {errors.class && <span className="error-message">{errors.class}</span>}
            </div>

            <div className="form-group">
              <label>
                <FaSchool /> স্কুল/কলেজের নাম <span className="required">*</span>
              </label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="আপনার স্কুল/কলেজের নাম"
                className={errors.school ? 'error' : ''}
              />
              {errors.school && <span className="error-message">{errors.school}</span>}
            </div>

            <div className="form-group">
              <label>
                <FaGraduationCap /> পূর্ববর্তী পরীক্ষার ফলাফল
              </label>
              <input
                type="text"
                name="previousResult"
                value={formData.previousResult}
                onChange={handleChange}
                placeholder="GPA/মার্ক (ঐচ্ছিক)"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>
              <FaGraduationCap /> পছন্দের বিষয়সমূহ (একাধিক নির্বাচন করুন)
            </label>
            <div className="checkbox-group">
              {subjects.map((subject) => (
                <label key={subject.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={subject.value}
                    checked={formData.subjectPreference.includes(subject.value)}
                    onChange={handleChange}
                  />
                  <span>{subject.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Parent/Guardian Information */}
        <div className="form-section">
          <h3 className="form-section-title">
            <FaUser /> অভিভাবকের তথ্য
          </h3>
          <div className="form-grid">
            <div className="form-group">
              <label>
                <FaUser /> পিতার নাম <span className="required">*</span>
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="পিতার সম্পূর্ণ নাম"
                className={errors.fatherName ? 'error' : ''}
              />
              {errors.fatherName && (
                <span className="error-message">{errors.fatherName}</span>
              )}
            </div>

            <div className="form-group">
              <label>
                <FaPhone /> পিতার মোবাইল নম্বর <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="fatherPhone"
                value={formData.fatherPhone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className={errors.fatherPhone ? 'error' : ''}
              />
              {errors.fatherPhone && (
                <span className="error-message">{errors.fatherPhone}</span>
              )}
            </div>

            <div className="form-group">
              <label>
                <FaUser /> মাতার নাম
              </label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                placeholder="মাতার সম্পূর্ণ নাম"
              />
            </div>

            <div className="form-group">
              <label>
                <FaPhone /> জরুরি যোগাযোগ নম্বর
              </label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="form-section">
          <h3 className="form-section-title">
            <FaCalendarAlt /> অতিরিক্ত তথ্য
          </h3>
          <div className="form-grid">
            <div className="form-group">
              <label>
                <FaCalendarAlt /> ভর্তির পছন্দের তারিখ
              </label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="submit-admission-button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            'জমা দেওয়া হচ্ছে...'
          ) : (
            <>
              <FaPaperPlane /> ভর্তি আবেদন জমা দিন
            </>
          )}
        </motion.button>

        <p className="form-note">
          <FaCheckCircle /> আবশ্যক ক্ষেত্রগুলো (*) চিহ্নিত। আবেদন জমা দেওয়ার পর আমরা আপনার সাথে যোগাযোগ করবো।
        </p>

        {showToast && (
          <motion.div
            className="toast toast-success"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="toast-content">
              <FaCheckCircle className="toast-icon" />
              <div className="toast-text">
                <h4>আবেদন সফল!</h4>
                <p>আপনার ভর্তি আবেদন সফলভাবে জমা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো।</p>
              </div>
            </div>
            <button className="toast-close" onClick={() => setShowToast(false)} aria-label="ক্লোজ">✕</button>
          </motion.div>
        )}
      </motion.form>
    </section>
  )
}

export default AdmissionForm

