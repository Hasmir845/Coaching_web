import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Admin from '../models/Admin.js'

dotenv.config()

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [
        { email: 'geniuscare@gmail.com' }
      ]
    })

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists with email: geniuscare@gmail.com')
      process.exit(0)
    }

    // Create default admin with geniuscare@gmail.com
    const admin = await Admin.create({
      username: 'geniuscare',
      email: 'geniuscare@gmail.com',
      password: process.env.ADMIN_PASSWORD || 'GeniusCare@2024', // Change this!
      role: 'superadmin',
      isActive: true,
    })

    console.log('✅ Admin user created successfully!')
    console.log('📧 Username: geniuscare')
    console.log('📧 Email: geniuscare@gmail.com')
    console.log('🔑 Password: ' + (process.env.ADMIN_PASSWORD || 'GeniusCare@2024'))
    console.log('⚠️  Please change the password after first login!')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin:', error)
    process.exit(1)
  }
}

createAdmin()

