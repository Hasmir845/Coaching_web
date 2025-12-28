import React, { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Header from './components/Header'
import Subjects from './components/Subjects'
import Features from './components/Features'
import Fees from './components/Fees'
import BatchInfo from './components/BatchInfo'
import Testimonials from './components/Testimonials'
import Statistics from './components/Statistics'
import AdmissionForm from './components/AdmissionForm'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import EnrollmentModal from './components/EnrollmentModal'
import AdminPanel from './components/AdminPanel'
import './App.css'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState(null)
  const [isAdminPage, setIsAdminPage] = useState(false)

  useEffect(() => {
    // Check if current path is /admin
    const checkAdminPath = () => {
      const path = window.location.pathname
      setIsAdminPage(path === '/admin' || path === '/admin/')
    }

    checkAdminPath()
    
    // Listen for navigation changes
    window.addEventListener('popstate', checkAdminPath)
    
    return () => {
      window.removeEventListener('popstate', checkAdminPath)
    }
  }, [])

  const handleEnrollClick = (batchType) => {
    setSelectedBatch(batchType)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedBatch(null)
  }

  // Show Admin Panel if on /admin route
  if (isAdminPage) {
    return <AdminPanel />
  }

  return (
    <div className="App">
      <Navigation />
      <Header onEnrollClick={() => handleEnrollClick(null)} />
      <Statistics />
      <Subjects />
      <Features />
      <Fees onEnrollClick={handleEnrollClick} />
      <BatchInfo />
      <Testimonials />
      <AdmissionForm />
      <Contact />
      <Footer />
      <ScrollToTop />
      {showModal && (
        <EnrollmentModal 
          batchType={selectedBatch} 
          onClose={closeModal} 
        />
      )}
    </div>
  )
}

export default App

