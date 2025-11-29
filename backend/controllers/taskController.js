import pool from '../config/database.js'

export const getAllTasks = async (req, res) => {
  try {
    const [tasks] = await pool.execute(`
      SELECT t.*, p.name as project_name, u.name as employee_name
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      LEFT JOIN users u ON t.employee_id = u.id
      ORDER BY t.created_at DESC
    `)
    res.json(tasks)
  } catch (error) {
    console.error('Get tasks error:', error)
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
}

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params
    const [tasks] = await pool.execute(`
      SELECT t.*, p.name as project_name, u.name as employee_name
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      LEFT JOIN users u ON t.employee_id = u.id
      WHERE t.id = ?
    `, [id])

    if (tasks.length === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }

    const task = tasks[0]
    
    // Allow employees to view their own tasks, admins and project managers can view any
    if (req.user.role === 'employee' && task.employee_id !== req.user.id) {
      return res.status(403).json({ error: 'You can only view your own tasks' })
    }

    res.json(task)
  } catch (error) {
    console.error('Get task error:', error)
    res.status(500).json({ error: 'Failed to fetch task' })
  }
}

export const getTasksByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params
    
    // Employees can only view their own tasks
    if (req.user.role === 'employee' && parseInt(employeeId) !== req.user.id) {
      return res.status(403).json({ error: 'You can only view your own tasks' })
    }
    
    const [tasks] = await pool.execute(`
      SELECT t.*, p.name as project_name
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      WHERE t.employee_id = ?
      ORDER BY t.created_at DESC
    `, [employeeId])
    res.json(tasks)
  } catch (error) {
    console.error('Get tasks by employee error:', error)
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, description, project_id, employee_id, due_date, status } = req.body

    if (!title || !project_id || !employee_id) {
      return res.status(400).json({ error: 'Title, project, and employee are required' })
    }

    const [result] = await pool.execute(
      'INSERT INTO tasks (title, description, project_id, employee_id, due_date, status) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description || null, project_id, employee_id, due_date || null, status || 'pending']
    )

    const [newTask] = await pool.execute(`
      SELECT t.*, p.name as project_name, u.name as employee_name
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      LEFT JOIN users u ON t.employee_id = u.id
      WHERE t.id = ?
    `, [result.insertId])

    res.status(201).json(newTask[0])
  } catch (error) {
    console.error('Create task error:', error)
    res.status(500).json({ error: 'Failed to create task' })
  }
}

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, project_id, employee_id, due_date, status } = req.body

    // Check if task exists
    const [existing] = await pool.execute(
      'SELECT id FROM tasks WHERE id = ?',
      [id]
    )

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }

    // Build update query dynamically
    const updates = []
    const values = []

    if (title) {
      updates.push('title = ?')
      values.push(title)
    }
    if (description !== undefined) {
      updates.push('description = ?')
      values.push(description)
    }
    if (project_id) {
      updates.push('project_id = ?')
      values.push(project_id)
    }
    if (employee_id) {
      updates.push('employee_id = ?')
      values.push(employee_id)
    }
    if (due_date !== undefined) {
      updates.push('due_date = ?')
      values.push(due_date)
    }
    if (status) {
      updates.push('status = ?')
      values.push(status)
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' })
    }

    values.push(id)
    await pool.execute(
      `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`,
      values
    )

    const [updated] = await pool.execute(`
      SELECT t.*, p.name as project_name, u.name as employee_name
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      LEFT JOIN users u ON t.employee_id = u.id
      WHERE t.id = ?
    `, [id])

    res.json(updated[0])
  } catch (error) {
    console.error('Update task error:', error)
    res.status(500).json({ error: 'Failed to update task' })
  }
}

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
      return res.status(400).json({ error: 'Status is required' })
    }

    // Check if task exists and belongs to the employee
    const [existing] = await pool.execute(
      'SELECT id, employee_id FROM tasks WHERE id = ?',
      [id]
    )

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }

    // Allow employees to update their own tasks, or admins/project managers to update any
    if (req.user.role === 'employee' && existing[0].employee_id !== req.user.id) {
      return res.status(403).json({ error: 'You can only update your own tasks' })
    }

    await pool.execute(
      'UPDATE tasks SET status = ? WHERE id = ?',
      [status, id]
    )

    const [updated] = await pool.execute(`
      SELECT t.*, p.name as project_name, u.name as employee_name
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      LEFT JOIN users u ON t.employee_id = u.id
      WHERE t.id = ?
    `, [id])

    res.json(updated[0])
  } catch (error) {
    console.error('Update task status error:', error)
    res.status(500).json({ error: 'Failed to update task status' })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params

    // Check if task exists
    const [existing] = await pool.execute(
      'SELECT id FROM tasks WHERE id = ?',
      [id]
    )

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Task not found' })
    }

    await pool.execute('DELETE FROM tasks WHERE id = ?', [id])
    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Delete task error:', error)
    res.status(500).json({ error: 'Failed to delete task' })
  }
}

