import express from 'express'
import { authenticate, authorize } from '../middleware/auth.js'
import {
  getAllMaterialRequests,
  getMaterialRequestById,
  getMaterialRequestsByManager,
  createMaterialRequest,
  updateMaterialRequest,
  deleteMaterialRequest
} from '../controllers/materialRequestController.js'

const router = express.Router()

// All routes require authentication
router.use(authenticate)

// Get requests by manager (accessible by project managers)
router.get('/manager/:managerId', getMaterialRequestsByManager)

// Admin can view all requests
router.get('/', authorize('admin'), getAllMaterialRequests)
router.get('/:id', authorize('admin', 'project_manager'), getMaterialRequestById)

// Project managers can create requests
router.post('/', authorize('project_manager'), createMaterialRequest)

// Admin can update and delete
router.put('/:id', authorize('admin'), updateMaterialRequest)
router.delete('/:id', authorize('admin'), deleteMaterialRequest)

export default router

