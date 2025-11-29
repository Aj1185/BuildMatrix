import express from 'express'
import { authenticate, authorize } from '../middleware/auth.js'
import {
  getAllEmployees,
  getEmployeeById,
  getEmployeesByRole,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js'

const router = express.Router()

// All routes require authentication
router.use(authenticate)

// All routes require admin role
router.use(authorize('admin'))

router.get('/', getAllEmployees)
router.get('/role/:role', getEmployeesByRole)
router.get('/:id', getEmployeeById)
router.post('/', createEmployee)
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

export default router

