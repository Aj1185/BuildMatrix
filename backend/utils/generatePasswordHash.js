// Utility script to generate bcrypt password hashes
// Run with: node utils/generatePasswordHash.js

import bcrypt from 'bcryptjs'

const password = process.argv[2] || 'password123'

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err)
    return
  }
  console.log(`Password: ${password}`)
  console.log(`Hash: ${hash}`)
  console.log(`\nSQL: '$2a$10$...' should be replaced with: '${hash}'`)
})

