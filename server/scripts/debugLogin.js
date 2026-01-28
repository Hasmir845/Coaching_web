#!/usr/bin/env node

/**
 * Admin Login Debugging Script
 * This script will help you diagnose login issues
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Admin from '../models/Admin.js'

dotenv.config()

const checkAdminLogin = async () => {
  console.log('\n🔍 GeniusCare Admin Login Debug Script\n')
  console.log('=' .repeat(50))

  try {
    // Check MongoDB connection
    console.log('\n1️⃣  Checking MongoDB Connection...')
    const MONGODB_URI = process.env.MONGODB_URI
    
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI is not set in .env file')
      console.log('   Add MONGODB_URI to server/.env file')
      process.exit(1)
    }

    console.log('   📍 MongoDB URI:', MONGODB_URI.substring(0, 30) + '...')

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log('✅ MongoDB Connection: SUCCESS\n')

    // Check if admin exists
    console.log('2️⃣  Checking Admin Account...')
    const admin = await Admin.findOne({
      email: 'geniuscare@gmail.com'
    })

    if (!admin) {
      console.error('❌ Admin account not found!')
      console.log('\n📝 To create admin account, run:')
      console.log('   cd server')
      console.log('   node scripts/createAdmin.js\n')
      process.exit(1)
    }

    console.log('✅ Admin Account Found!')
    console.log('   📧 Email:', admin.email)
    console.log('   👤 Username:', admin.username)
    console.log('   👑 Role:', admin.role)
    console.log('   🟢 Active:', admin.isActive ? 'Yes' : 'No')
    console.log('   📅 Last Login:', admin.lastLogin || 'Never')

    // Check password
    console.log('\n3️⃣  Checking Password...')
    const testPassword = 'GeniusCare@2024'
    const isPasswordValid = await admin.comparePassword(testPassword)
    
    if (isPasswordValid) {
      console.log('✅ Default Password: VALID')
      console.log('   You can login with password: GeniusCare@2024')
    } else {
      console.log('❌ Default Password: INVALID')
      console.log('   The password has been changed.')
      console.log('   If you forgot the password:')
      console.log('   1. Delete the admin from MongoDB')
      console.log('   2. Run: node scripts/createAdmin.js')
    }

    // Check JWT Secret
    console.log('\n4️⃣  Checking JWT Configuration...')
    if (process.env.JWT_SECRET) {
      console.log('✅ JWT_SECRET is configured')
    } else {
      console.error('❌ JWT_SECRET is not set in .env file')
      console.log('   Add JWT_SECRET to server/.env file')
    }

    if (process.env.JWT_EXPIRES_IN) {
      console.log('✅ JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN)
    } else {
      console.log('⚠️  JWT_EXPIRES_IN not set, using default: 7d')
    }

    // Server configuration
    console.log('\n5️⃣  Server Configuration...')
    console.log('   🖥️  PORT:', process.env.PORT || 5000)
    console.log('   🌐 NODE_ENV:', process.env.NODE_ENV || 'development')
    console.log('   🔗 FRONTEND_URL:', process.env.FRONTEND_URL || 'Not set (using *)')

    // Summary
    console.log('\n' + '='.repeat(50))
    console.log('\n✅ All checks passed! You should be able to login.\n')
    
    console.log('📋 Login Steps:')
    console.log('   1. Press Ctrl+Shift+A to open admin panel')
    console.log('   2. Email: geniuscare@gmail.com')
    console.log('   3. Password: GeniusCare@2024')
    console.log('   4. Click Login\n')

    console.log('🔧 If login still fails:')
    console.log('   - Make sure the server is running: npm start')
    console.log('   - Check browser console for errors (F12)')
    console.log('   - Check server logs for error messages')
    console.log('   - Try clearing browser cache\n')

    process.exit(0)
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.log('\n🔧 Troubleshooting:')
    console.log('   1. Make sure MongoDB is running')
    console.log('   2. Check MONGODB_URI in server/.env')
    console.log('   3. Verify internet connection')
    console.log('   4. Check MongoDB credentials\n')
    process.exit(1)
  }
}

checkAdminLogin()
