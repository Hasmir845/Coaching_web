#!/usr/bin/env node

/**
 * Test Admin Login
 * This script tests if the login endpoint works
 */

import fetch from 'node-fetch'

const testAdminLogin = async () => {
  console.log('\n🧪 Testing Admin Login Endpoint\n')
  console.log('='.repeat(50))

  const API_URL = 'http://localhost:5000'
  const credentials = {
    username: 'geniuscare@gmail.com',
    password: 'GeniusCare@2024'
  }

  try {
    console.log('\n📍 Testing: POST /api/auth/login')
    console.log('📧 Email:', credentials.username)
    console.log('🔑 Password: ••••••••••••••\n')

    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      timeout: 5000
    })

    const data = await response.json()

    if (response.ok && data.success) {
      console.log('✅ LOGIN SUCCESSFUL!\n')
      console.log('📋 Response:')
      console.log('   Token:', data.data.token.substring(0, 30) + '...')
      console.log('   Admin Email:', data.data.admin.email)
      console.log('   Admin Role:', data.data.admin.role)
      console.log('\n✅ You can now login to the admin panel!')
    } else {
      console.log('❌ LOGIN FAILED\n')
      console.log('Error:', data.message)
      console.log('Details:', data.error || 'No details available')
    }

  } catch (error) {
    console.error('\n❌ Connection Error')
    console.error('Error:', error.message)
    console.log('\n🔧 Troubleshooting:')
    console.log('   1. Is the server running? (npm start in server directory)')
    console.log('   2. Is the server on port 5000?')
    console.log('   3. Check server logs for errors\n')
  }

  process.exit(0)
}

testAdminLogin()
