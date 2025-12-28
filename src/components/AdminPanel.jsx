import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaGraduationCap,
  FaPhone,
  FaEnvelope,
  FaSchool,
  FaFilter,
  FaDownload,
  FaComments,
  FaUserCircle,
  FaHome,
} from 'react-icons/fa'

const AdminPanel = () => {
  const [admissions, setAdmissions] = useState([])
  const [contacts, setContacts] = useState([])
  const [stats, setStats] = useState(null)
  const [contactStats, setContactStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [contactLoading, setContactLoading] = useState(true)
  const [filter, setFilter] = useState({ batch: '', status: '' })
  const [contactFilter, setContactFilter] = useState({ batch: '', status: '' })
  const [activeTab, setActiveTab] = useState('admissions') // 'admissions' or 'contacts'
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  // Simple password protection (in production, use proper authentication)
  const ADMIN_PASSWORD = 'admin123' // Change this!

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      fetchAdmissions()
      fetchStats()
      fetchContacts()
      fetchContactStats()
    } else {
      alert('ভুল পাসওয়ার্ড!')
    }
  }

  const fetchAdmissions = async () => {
    try {
      const queryParams = new URLSearchParams()
      if (filter.batch) queryParams.append('batch', filter.batch)
      if (filter.status) queryParams.append('status', filter.status)

      const response = await fetch(
        `${API_URL}/api/admission/all?${queryParams.toString()}`
      )
      const result = await response.json()

      if (result.success) {
        setAdmissions(result.data)
      }
    } catch (error) {
      console.error('Error fetching admissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admission/stats/overview`)
      const result = await response.json()

      if (result.success) {
        setStats(result.data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchContacts = async () => {
    try {
      setContactLoading(true)
      const queryParams = new URLSearchParams()
      if (contactFilter.batch) queryParams.append('batch', contactFilter.batch)
      if (contactFilter.status) queryParams.append('status', contactFilter.status)

      const response = await fetch(
        `${API_URL}/api/contact/all?${queryParams.toString()}`
      )
      const result = await response.json()

      if (result.success) {
        setContacts(result.data)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setContactLoading(false)
    }
  }

  const fetchContactStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/contact/stats/overview`)
      const result = await response.json()

      if (result.success) {
        setContactStats(result.data)
      }
    } catch (error) {
      console.error('Error fetching contact stats:', error)
    }
  }

  const updateContactStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/contact/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      const result = await response.json()

      if (result.success) {
        fetchContacts()
        fetchContactStats()
        alert('স্ট্যাটাস আপডেট করা হয়েছে')
      }
    } catch (error) {
      console.error('Error updating contact status:', error)
      alert('স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে')
    }
  }

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/admission/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      const result = await response.json()

      if (result.success) {
        fetchAdmissions()
        fetchStats()
        alert('স্ট্যাটাস আপডেট করা হয়েছে')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'admissions') {
        fetchAdmissions()
      } else {
        fetchContacts()
      }
      const interval = setInterval(() => {
        if (activeTab === 'admissions') {
          fetchAdmissions()
        } else {
          fetchContacts()
        }
      }, 30000) // Refresh every 30 seconds
      return () => clearInterval(interval)
    }
  }, [isAuthenticated, filter, contactFilter, activeTab])

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="login-form"
        >
          <h2>Admin Login</h2>
          <input
            type="password"
            placeholder="পাসওয়ার্ড"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </motion.form>
      </div>
    )
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>
          <FaUsers /> Admin Panel
        </h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = '/'
            }}
            style={{
              padding: '12px 20px',
              background: 'linear-gradient(135deg, var(--primary-blue), var(--dark-blue))',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '10px',
              fontWeight: '600',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(25, 118, 210, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(25, 118, 210, 0.3)'
            }}
          >
            <FaHome /> Home
          </a>
          <button onClick={() => setIsAuthenticated(false)}>Logout</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={activeTab === 'admissions' ? 'active' : ''}
          onClick={() => setActiveTab('admissions')}
        >
          <FaGraduationCap /> ভর্তি আবেদন
        </button>
        <button
          className={activeTab === 'contacts' ? 'active' : ''}
          onClick={() => setActiveTab('contacts')}
        >
          <FaComments /> যোগাযোগ ({contactStats?.total || 0})
        </button>
      </div>

      {activeTab === 'admissions' ? (
        <>
          {stats && (
            <div className="stats-grid">
              <div className="stat-card">
                <FaUsers />
                <h3>মোট আবেদন</h3>
                <p>{stats.total}</p>
              </div>
              <div className="stat-card pending">
                <FaClock />
                <h3>Pending</h3>
                <p>{stats.pending}</p>
              </div>
              <div className="stat-card approved">
                <FaCheckCircle />
                <h3>Approved</h3>
                <p>{stats.approved}</p>
              </div>
              <div className="stat-card rejected">
                <FaTimesCircle />
                <h3>Rejected</h3>
                <p>{stats.rejected}</p>
              </div>
              <div className="stat-card">
                <FaGraduationCap />
                <h3>SSC</h3>
                <p>{stats.byBatch.ssc}</p>
              </div>
              <div className="stat-card">
                <FaGraduationCap />
                <h3>HSC</h3>
                <p>{stats.byBatch.hsc}</p>
              </div>
            </div>
          )}

          <div className="filters">
            <select
              value={filter.batch}
              onChange={(e) => setFilter({ ...filter, batch: e.target.value })}
            >
              <option value="">সব ব্যাচ</option>
              <option value="ssc">SSC</option>
              <option value="hsc">HSC</option>
            </select>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="">সব স্ট্যাটাস</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {loading ? (
            <div className="loading">লোড হচ্ছে</div>
          ) : (
            <div className="admissions-list">
              {admissions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <FaUsers style={{ fontSize: '4rem', color: '#ccc', marginBottom: '20px' }} />
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', margin: 0 }}>
                    কোন আবেদন পাওয়া যায়নি
                  </p>
                </div>
              ) : (
                admissions.map((admission) => (
                  <motion.div
                    key={admission._id}
                    className="admission-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="admission-header">
                      <div>
                        <h3>{admission.name}</h3>
                        <p>
                          <FaPhone /> {admission.phone}
                        </p>
                      </div>
                      <span className={`status-badge ${admission.status}`}>
                        {admission.status}
                      </span>
                    </div>
                    <div className="admission-details">
                      <p>
                        <FaGraduationCap /> {admission.batch.toUpperCase()} - Class{' '}
                        {admission.class}
                      </p>
                      <p>
                        <FaSchool /> {admission.school}
                      </p>
                      <p>
                        <strong>পিতার নাম:</strong> {admission.fatherName} (
                        {admission.fatherPhone})
                      </p>
                      {admission.subjectPreference.length > 0 && (
                        <p>
                          <strong>বিষয়:</strong>{' '}
                          {admission.subjectPreference.join(', ')}
                        </p>
                      )}
                      <p>
                        <strong>তারিখ:</strong>{' '}
                        {new Date(admission.createdAt).toLocaleDateString('bn-BD')}
                      </p>
                    </div>
                    <div className="admission-actions">
                      {admission.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateStatus(admission._id, 'approved')}
                            className="btn-approve"
                          >
                            <FaCheckCircle /> Approve
                          </button>
                          <button
                            onClick={() => updateStatus(admission._id, 'rejected')}
                            className="btn-reject"
                          >
                            <FaTimesCircle /> Reject
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </>
      ) : (
        <>
          {contactStats && (
            <div className="stats-grid">
              <div className="stat-card">
                <FaComments />
                <h3>মোট যোগাযোগ</h3>
                <p>{contactStats.total}</p>
              </div>
              <div className="stat-card pending">
                <FaClock />
                <h3>নতুন</h3>
                <p>{contactStats.new}</p>
              </div>
              <div className="stat-card approved">
                <FaCheckCircle />
                <h3>যোগাযোগ করা হয়েছে</h3>
                <p>{contactStats.contacted}</p>
              </div>
              <div className="stat-card rejected">
                <FaTimesCircle />
                <h3>সমাধান হয়েছে</h3>
                <p>{contactStats.resolved}</p>
              </div>
              <div className="stat-card">
                <FaGraduationCap />
                <h3>SSC</h3>
                <p>{contactStats.byBatch.ssc}</p>
              </div>
              <div className="stat-card">
                <FaGraduationCap />
                <h3>HSC</h3>
                <p>{contactStats.byBatch.hsc}</p>
              </div>
              <div className="stat-card">
                <FaUserCircle />
                <h3>আজ</h3>
                <p>{contactStats.today}</p>
              </div>
              <div className="stat-card">
                <FaUserCircle />
                <h3>এই সপ্তাহ</h3>
                <p>{contactStats.thisWeek}</p>
              </div>
            </div>
          )}

          <div className="filters">
            <select
              value={contactFilter.batch}
              onChange={(e) => setContactFilter({ ...contactFilter, batch: e.target.value })}
            >
              <option value="">সব ব্যাচ</option>
              <option value="ssc">SSC</option>
              <option value="hsc">HSC</option>
            </select>
            <select
              value={contactFilter.status}
              onChange={(e) => setContactFilter({ ...contactFilter, status: e.target.value })}
            >
              <option value="">সব স্ট্যাটাস</option>
              <option value="new">নতুন</option>
              <option value="contacted">যোগাযোগ করা হয়েছে</option>
              <option value="resolved">সমাধান হয়েছে</option>
            </select>
          </div>

          {contactLoading ? (
            <div className="loading">লোড হচ্ছে</div>
          ) : (
            <div className="admissions-list">
              {contacts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <FaComments style={{ fontSize: '4rem', color: '#ccc', marginBottom: '20px' }} />
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', margin: 0 }}>
                    কোন যোগাযোগ পাওয়া যায়নি
                  </p>
                </div>
              ) : (
                contacts.map((contact) => (
                  <motion.div
                    key={contact._id}
                    className="admission-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="admission-header">
                      <div>
                        <h3>{contact.name}</h3>
                        <p>
                          <FaPhone /> {contact.phone}
                        </p>
                      </div>
                      <span className={`status-badge ${contact.status}`}>
                        {contact.status === 'new' ? 'নতুন' : contact.status === 'contacted' ? 'যোগাযোগ করা হয়েছে' : 'সমাধান হয়েছে'}
                      </span>
                    </div>
                    <div className="admission-details">
                      <p>
                        <FaGraduationCap /> {contact.batch.toUpperCase()} ব্যাচ
                      </p>
                      {contact.message && (
                        <p>
                          <strong>বার্তা:</strong> {contact.message}
                        </p>
                      )}
                      <p>
                        <strong>তারিখ:</strong>{' '}
                        {new Date(contact.createdAt).toLocaleDateString('bn-BD', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="admission-actions">
                      <a
                        href={`tel:${contact.phone}`}
                        className="btn-approve"
                        style={{ 
                          textDecoration: 'none', 
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(135deg, #1976d2, #1565c0)'
                        }}
                      >
                        <FaPhone /> কল করুন
                      </a>
                      {contact.status === 'new' && (
                        <>
                          <button
                            onClick={() => updateContactStatus(contact._id, 'contacted')}
                            className="btn-approve"
                          >
                            <FaCheckCircle /> যোগাযোগ করা হয়েছে
                          </button>
                          <button
                            onClick={() => updateContactStatus(contact._id, 'resolved')}
                            className="btn-approve"
                            style={{ backgroundColor: '#28a745' }}
                          >
                            <FaCheckCircle /> সমাধান হয়েছে
                          </button>
                        </>
                      )}
                      {contact.status === 'contacted' && (
                        <button
                          onClick={() => updateContactStatus(contact._id, 'resolved')}
                          className="btn-approve"
                          style={{ backgroundColor: '#28a745' }}
                        >
                          <FaCheckCircle /> সমাধান হয়েছে
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdminPanel

