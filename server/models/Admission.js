import mongoose from 'mongoose'

const admissionSchema = new mongoose.Schema(
  {
    // Personal Information
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
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
    },

    // Academic Information
    batch: {
      type: String,
      required: [true, 'ব্যাচ নির্বাচন করুন'],
      enum: ['ssc', 'hsc'],
    },
    class: {
      type: String,
      required: [true, 'ক্লাস নির্বাচন করুন'],
      enum: ['9', '10', '11', '12'],
    },
    school: {
      type: String,
      required: [true, 'স্কুলের নাম আবশ্যক'],
      trim: true,
    },
    previousResult: {
      type: String,
      trim: true,
    },
    subjectPreference: {
      type: [String],
      enum: ['physics', 'chemistry', 'math', 'biology'],
      default: [],
    },

    // Parent/Guardian Information
    fatherName: {
      type: String,
      required: [true, 'পিতার নাম আবশ্যক'],
      trim: true,
    },
    fatherPhone: {
      type: String,
      required: [true, 'পিতার মোবাইল নম্বর আবশ্যক'],
      match: [/^01[3-9]\d{8}$/, 'সঠিক মোবাইল নম্বর দিন'],
    },
    motherName: {
      type: String,
      trim: true,
    },
    emergencyContact: {
      type: String,
      trim: true,
    },

    // Additional Information
    admissionDate: {
      type: Date,
    },

    // Status
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
)

// Index for faster queries
admissionSchema.index({ phone: 1 })
admissionSchema.index({ batch: 1 })
admissionSchema.index({ status: 1 })
admissionSchema.index({ createdAt: -1 })

const Admission = mongoose.model('Admission', admissionSchema)

export default Admission

