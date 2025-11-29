import bcrypt from 'bcryptjs'
import pool from '../config/database.js'

export const getAllEmployees = async (req, res) => {
  try {
    const [employees] = await pool.execute(
      'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
    )
    res.json(employees)
  } catch (error) {
    console.error('Get employees error:', error)
    res.status(500).json({ error: 'Failed to fetch employees' })
  }
}

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params
    const [employees] = await pool.execute(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [id]
    )

    if (employees.length === 0) {
      return res.status(404).json({ error: 'Employee not found' })
    }

    res.json(employees[0])
  } catch (error) {
    console.error('Get employee error:', error)
    res.status(500).json({ error: 'Failed to fetch employee' })
  }
}

export const getEmployeesByRole = async (req, res) => {
  try {
    const { role } = req.params
    const [employees] = await pool.execute(
      'SELECT id, name, email, role, created_at FROM users WHERE role = ? ORDER BY name',
      [role]
    )
    res.json(employees)
  } catch (error) {
    console.error('Get employees by role error:', error)
    res.status(500).json({ error: 'Failed to fetch employees' })
  }
}

export const createEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Check if email already exists
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    )

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    )

    const [newEmployee] = await pool.execute(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [result.insertId]
    )

    res.status(201).json(newEmployee[0])
  } catch (error) {
    console.error('Create employee error:', error)
    res.status(500).json({ error: 'Failed to create employee' })
  }
}

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, password, role } = req.body

    // Check if employee exists
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE id = ?',
      [id]
    )

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Employee not found' })
    }

    // Check if email is being changed and if it's already taken
    if (email) {
      const [emailCheck] = await pool.execute(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [email, id]
      )

      if (emailCheck.length > 0) {
        return res.status(400).json({ error: 'Email already exists' })
      }
    }

    // Build update query dynamically
    const updates = []
    const values = []

    if (name) {
      updates.push('name = ?')
      values.push(name)
    }
    if (email) {
      updates.push('email = ?')
      values.push(email)
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      updates.push('password = ?')
      values.push(hashedPassword)
    }
    if (role) {
      updates.push('role = ?')
      values.push(role)
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' })
    }

    values.push(id)
    await pool.execute(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    )

    const [updated] = await pool.execute(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [id]
    )

    res.json(updated[0])
  } catch (error) {
    console.error('Update employee error:', error)
    res.status(500).json({ error: 'Failed to update employee' })
  }
}

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params

    // Check if employee exists
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE id = ?',
      [id]
    )

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Employee not found' })
    }

    await pool.execute('DELETE FROM users WHERE id = ?', [id])
    res.json({ message: 'Employee deleted successfully' })
  } catch (error) {
    console.error('Delete employee error:', error)
    res.status(500).json({ error: 'Failed to delete employee' })
  }
}

