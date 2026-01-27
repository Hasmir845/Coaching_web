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
        { username: 'admin' },
        { email: 'admin@geniuscare.com' }
      ]
    })

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists')
      process.exit(0)
    }

    // Create default admin
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@geniuscare.com',
      password: process.env.ADMIN_PASSWORD || 'admin123', // Change this!
      role: 'superadmin',
      isActive: true,
    })

    console.log('✅ Admin user created successfully!')
    console.log('📧 Username: admin')
    console.log('📧 Email: admin@geniuscare.com')
    console.log('🔑 Password: ' + (process.env.ADMIN_PASSWORD || 'admin123'))
    console.log('⚠️  Please change the password after first login!')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin:', error)
    process.exit(1)
  }
}

createAdmin()

