import express from 'express'
import Contact from '../models/Contact.js'
import { authenticate } from '../middleware/auth.js'
import { formLimiter, validateInput } from '../middleware/security.js'

const router = express.Router()

// Submit contact form (public, but rate limited)
router.post('/submit', formLimiter, validateInput, async (req, res) => {
  try {
    const contactData = req.body

    // Validate required fields
    if (!contactData.name || !contactData.phone || !contactData.batch) {
      return res.status(400).json({
        success: false,
        message: 'সব আবশ্যক তথ্য প্রদান করুন',
      })
    }

    // Create new contact
    const contact = new Contact(contactData)
    await contact.save()

    res.status(201).json({
      success: true,
      message: 'ধন্যবাদ! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো।',
      data: {
        id: contact._id,
        name: contact.name,
        phone: contact.phone,
        batch: contact.batch,
      },
    })
  } catch (error) {
    console.error('Contact submission error:', error)
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)[0].message,
      })
    }

    res.status(500).json({
      success: false,
      message: 'সার্ভার ত্রুটি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।',
      error: error.message,
    })
  }
})

// Get all contacts (protected - admin only)
router.get('/all', authenticate, async (req, res) => {
  try {
    const { batch, status, page = 1, limit = 50 } = req.query

    const query = {}
    if (batch) query.batch = batch
    if (status) query.status = status

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v')

    const total = await Contact.countDocuments(query)

    res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    res.status(500).json({
      success: false,
      message: 'তথ্য লোড করতে সমস্যা হয়েছে',
      error: error.message,
    })
  }
})

// Get single contact by ID (protected - admin only)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).select('-__v')

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'যোগাযোগ পাওয়া যায়নি',
      })
    }

    res.json({
      success: true,
      data: contact,
    })
  } catch (error) {
    console.error('Get contact error:', error)
    res.status(500).json({
      success: false,
      message: 'তথ্য লোড করতে সমস্যা হয়েছে',
      error: error.message,
    })
  }
})

// Update contact status (protected - admin only)
router.patch('/:id/status', authenticate, validateInput, async (req, res) => {
  try {
    const { status } = req.body

    if (!['new', 'contacted', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'অবৈধ স্ট্যাটাস',
      })
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-__v')

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'যোগাযোগ পাওয়া যায়নি',
      })
    }

    res.json({
      success: true,
      message: 'স্ট্যাটাস আপডেট করা হয়েছে',
      data: contact,
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

// Get contact statistics (protected - admin only)
router.get('/stats/overview', authenticate, async (req, res) => {
  try {
    const total = await Contact.countDocuments()
    const newContacts = await Contact.countDocuments({ status: 'new' })
    const contacted = await Contact.countDocuments({ status: 'contacted' })
    const resolved = await Contact.countDocuments({ status: 'resolved' })
    const sscCount = await Contact.countDocuments({ batch: 'ssc' })
    const hscCount = await Contact.countDocuments({ batch: 'hsc' })

    // Get today's contacts
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayCount = await Contact.countDocuments({
      createdAt: { $gte: today },
    })

    // Get this week's contacts
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const weekCount = await Contact.countDocuments({
      createdAt: { $gte: weekAgo },
    })

    res.json({
      success: true,
      data: {
        total,
        new: newContacts,
        contacted,
        resolved,
        byBatch: {
          ssc: sscCount,
          hsc: hscCount,
        },
        today: todayCount,
        thisWeek: weekCount,
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

