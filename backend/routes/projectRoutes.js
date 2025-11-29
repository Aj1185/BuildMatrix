import express from 'express'
import { authenticate, authorize } from '../middleware/auth.js'
import {
  getAllProjects,
  getProjectById,
  getProjectsByManager,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js'

const router = express.Router()

// All routes require authentication
router.use(authenticate)

// Get projects by manager (accessible by project managers)
router.get('/manager/:managerId', getProjectsByManager)

// Admin-only routes
router.get('/', authorize('admin'), getAllProjects)
router.get('/:id', authorize('admin'), getProjectById)
router.post('/', authorize('admin'), createProject)
router.put('/:id', authorize('admin'), updateProject)
router.delete('/:id', authorize('admin'), deleteProject)

export default router

