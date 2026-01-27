import express from 'express'
import Admission from '../models/Admission.js'
import { authenticate } from '../middleware/auth.js'
import { formLimiter, validateInput } from '../middleware/security.js'

const router = express.Router()

// Submit admission form (public, but rate limited)
router.post('/submit', formLimiter, validateInput, async (req, res) => {
  try {
    const admissionData = req.body

    // Check if student already exists with same phone number
    const existingAdmission = await Admission.findOne({
      phone: admissionData.phone,
      batch: admissionData.batch,
    })

    if (existingAdmission) {
      return res.status(400).json({
        success: false,
        message: 'এই নম্বর দিয়ে ইতিমধ্যে আবেদন করা হয়েছে',
      })
    }

    // Create new admission
    const admission = new Admission(admissionData)
    await admission.save()

    res.status(201).json({
      success: true,
      message: 'আবেদন সফলভাবে জমা দেওয়া হয়েছে',
      data: {
        id: admission._id,
        name: admission.name,
        phone: admission.phone,
        batch: admission.batch,
      },
    })
  } catch (error) {
    console.error('Admission submission error:', error)
    res.status(500).json({
      success: false,
      message: 'সার্ভার ত্রুটি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।',
      error: error.message,
    })
  }
})

// Get all admissions (protected - admin only)
router.get('/all', authenticate, async (req, res) => {
  try {
    const { batch, status, page = 1, limit = 10 } = req.query

    const query = {}
    if (batch) query.batch = batch
    if (status) query.status = status

    const admissions = await Admission.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v')

    const total = await Admission.countDocuments(query)

    res.json({
      success: true,
      data: admissions,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get admissions error:', error)
    res.status(500).json({
      success: false,
      message: 'তথ্য লোড করতে সমস্যা হয়েছে',
      error: error.message,
    })
  }
})

// Get single admission by ID (protected - admin only)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id).select('-__v')

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'আবেদন পাওয়া যায়নি',
      })
    }

    res.json({
      success: true,
      data: admission,
    })
  } catch (error) {
    console.error('Get admission error:', error)
    res.status(500).json({
      success: false,
      message: 'তথ্য লোড করতে সমস্যা হয়েছে',
      error: error.message,
    })
  }
})

// Update admission status (protected - admin only)
router.patch('/:id/status', authenticate, validateInput, async (req, res) => {
  try {
    const { status } = req.body

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'অবৈধ স্ট্যাটাস',
      })
    }

    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-__v')

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'আবেদন পাওয়া যায়নি',
      })
    }

    res.json({
      success: true,
      message: 'স্ট্যাটাস আপডেট করা হয়েছে',
      data: admission,
    })
  } catch (error) {
    console.error('Update status error:', error)
    res.status(500).json({
      success: false,
      message: 'স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে',
      error: error.message,
    })
  }
})

// Get statistics (protected - admin only)
router.get('/stats/overview', authenticate, async (req, res) => {
  try {
    const total = await Admission.countDocuments()
    const pending = await Admission.countDocuments({ status: 'pending' })
    const approved = await Admission.countDocuments({ status: 'approved' })
    const rejected = await Admission.countDocuments({ status: 'rejected' })
    const sscCount = await Admission.countDocuments({ batch: 'ssc' })
    const hscCount = await Admission.countDocuments({ batch: 'hsc' })

    res.json({
      success: true,
      data: {
        total,
        pending,
        approved,
        rejected,
        byBatch: {
          ssc: sscCount,
          hsc: hscCount,
        },
      },
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({
      success: false,
      message: 'পরিসংখ্যান লোড করতে সমস্যা হয়েছে',
      error: error.message,
    })
  }
})

export default router

