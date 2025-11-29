import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import employeeRoutes from './routes/employeeRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import materialRequestRoutes from './routes/materialRequestRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/material-requests', materialRequestRoutes)
app.use('/api/tasks', taskRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'BuildMatrix API is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

