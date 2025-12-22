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
} from 'react-icons/fa'

const AdminPanel = () => {
  const [admissions, setAdmissions] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({ batch: '', status: '' })
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
      fetchAdmissions()
      const interval = setInterval(fetchAdmissions, 30000) // Refresh every 30 seconds
      return () => clearInterval(interval)
    }
  }, [isAuthenticated, filter])

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
        <button onClick={() => setIsAuthenticated(false)}>Logout</button>
      </div>

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
        <div className="loading">Loading...</div>
      ) : (
        <div className="admissions-list">
          {admissions.length === 0 ? (
            <p>কোন আবেদন পাওয়া যায়নি</p>
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
    </div>
  )
}

export default AdminPanel

