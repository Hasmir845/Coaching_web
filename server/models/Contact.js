import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'নাম আবশ্যক'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'মোবাইল নম্বর আবশ্যক'],
      match: [/^01[3-9]\d{8}$/, 'সঠিক মোবাইল নম্বর দিন'],
    },
    batch: {
      type: String,
      required: [true, 'ব্যাচ নির্বাচন করুন'],
      enum: ['ssc', 'hsc'],
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    // Status to track if contact has been responded to
    status: {
      type: String,
      enum: ['new', 'contacted', 'resolved'],
      default: 'new',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
)

// Index for faster queries
contactSchema.index({ phone: 1 })
contactSchema.index({ batch: 1 })
contactSchema.index({ status: 1 })
contactSchema.index({ createdAt: -1 })

const Contact = mongoose.model('Contact', contactSchema)

export default Contact

