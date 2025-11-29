import pool from '../config/database.js'

export const getAllProjects = async (req, res) => {
  try {
    const [projects] = await pool.execute(`
      SELECT p.*, u.name as project_manager_name
      FROM projects p
      LEFT JOIN users u ON p.project_manager_id = u.id
      ORDER BY p.created_at DESC
    `)
    res.json(projects)
  } catch (error) {
    console.error('Get projects error:', error)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
}

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params
    const [projects] = await pool.execute(`
      SELECT p.*, u.name as project_manager_name
      FROM projects p
      LEFT JOIN users u ON p.project_manager_id = u.id
      WHERE p.id = ?
    `, [id])

    if (projects.length === 0) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.json(projects[0])
  } catch (error) {
    console.error('Get project error:', error)
    res.status(500).json({ error: 'Failed to fetch project' })
  }
}

export const getProjectsByManager = async (req, res) => {
  try {
    const { managerId } = req.params
    
    // Project managers can only view their own projects
    if (req.user.role === 'project_manager' && parseInt(managerId) !== req.user.id) {
      return res.status(403).json({ error: 'You can only view your own projects' })
    }
    
    const [projects] = await pool.execute(`
      SELECT p.*, u.name as project_manager_name
      FROM projects p
      LEFT JOIN users u ON p.project_manager_id = u.id
      WHERE p.project_manager_id = ?
      ORDER BY p.created_at DESC
    `, [managerId])
    res.json(projects)
  } catch (error) {
    console.error('Get projects by manager error:', error)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
}

export const createProject = async (req, res) => {
  try {
    const { name, description, start_date, end_date, project_manager_id } = req.body

    if (!name || !start_date) {
      return res.status(400).json({ error: 'Name and start date are required' })
    }

    const [result] = await pool.execute(
      'INSERT INTO projects (name, description, start_date, end_date, project_manager_id) VALUES (?, ?, ?, ?, ?)',
      [name, description || null, start_date, end_date || null, project_manager_id || null]
    )

    const [newProject] = await pool.execute(`
      SELECT p.*, u.name as project_manager_name
      FROM projects p
      LEFT JOIN users u ON p.project_manager_id = u.id
      WHERE p.id = ?
    `, [result.insertId])

    res.status(201).json(newProject[0])
  } catch (error) {
    console.error('Create project error:', error)
    res.status(500).json({ error: 'Failed to create project' })
  }
}

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, start_date, end_date, project_manager_id, status } = req.body

    // Check if project exists
    const [existing] = await pool.execute(
      'SELECT id FROM projects WHERE id = ?',
      [id]
    )

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Project not found' })
    }

    // Build update query dynamically
    const updates = []
    const values = []

    if (name) {
      updates.push('name = ?')
      values.push(name)
    }
    if (description !== undefined) {
      updates.push('description = ?')
      values.push(description)
    }
    if (start_date) {
      updates.push('start_date = ?')
      values.push(start_date)
    }
    if (end_date !== undefined) {
      updates.push('end_date = ?')
      values.push(end_date)
    }
    if (project_manager_id !== undefined) {
      updates.push('project_manager_id = ?')
      values.push(project_manager_id)
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
      `UPDATE projects SET ${updates.join(', ')} WHERE id = ?`,
      values
    )

    const [updated] = await pool.execute(`
      SELECT p.*, u.name as project_manager_name
      FROM projects p
      LEFT JOIN users u ON p.project_manager_id = u.id
      WHERE p.id = ?
    `, [id])

    res.json(updated[0])
  } catch (error) {
    console.error('Update project error:', error)
    res.status(500).json({ error: 'Failed to update project' })
  }
}

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params

    // Check if project exists
    const [existing] = await pool.execute(
      'SELECT id FROM projects WHERE id = ?',
      [id]
    )

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Project not found' })
    }

    await pool.execute('DELETE FROM projects WHERE id = ?', [id])
    res.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Delete project error:', error)
    res.status(500).json({ error: 'Failed to delete project' })
  }
}

