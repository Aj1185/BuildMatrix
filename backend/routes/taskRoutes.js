import express from 'express'
import { authenticate, authorize } from '../middleware/auth.js'
import {
  getAllTasks,
  getTaskById,
  getTasksByEmployee,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask
} from '../controllers/taskController.js'

const router = express.Router()

// All routes require authentication
router.use(authenticate)

// Employees can view their own tasks
router.get('/employee/:employeeId', getTasksByEmployee)

// Admin and project managers can view all tasks
router.get('/', authorize('admin', 'project_manager'), getAllTasks)
// Employees can view their own tasks, admins/project managers can view any
router.get('/:id', getTaskById)

// Admin and project managers can create tasks
router.post('/', authorize('admin', 'project_manager'), createTask)

// Employees can update their own task status, admins/project managers can update any
router.patch('/:id/status', updateTaskStatus)

// Admin and project managers can update and delete tasks
router.put('/:id', authorize('admin', 'project_manager'), updateTask)
router.delete('/:id', authorize('admin', 'project_manager'), deleteTask)

export default router

