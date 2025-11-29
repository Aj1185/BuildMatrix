import express from 'express'
import { authenticate, authorize } from '../middleware/auth.js'
import {
  getAllInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory
} from '../controllers/inventoryController.js'

const router = express.Router()

// All routes require authentication
router.use(authenticate)

// View inventory (accessible by all authenticated users)
router.get('/', getAllInventory)
router.get('/:id', getInventoryById)

// Admin-only routes for CRUD
router.post('/', authorize('admin'), createInventory)
router.put('/:id', authorize('admin'), updateInventory)
router.delete('/:id', authorize('admin'), deleteInventory)

export default router

