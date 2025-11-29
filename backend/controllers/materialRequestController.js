import pool from '../config/database.js'

export const getAllMaterialRequests = async (req, res) => {
  try {
    const [requests] = await pool.execute(`
      SELECT mr.*, p.name as project_name, i.name as inventory_name
      FROM material_requests mr
      LEFT JOIN projects p ON mr.project_id = p.id
      LEFT JOIN inventory i ON mr.inventory_id = i.id
      ORDER BY mr.created_at DESC
    `)
    res.json(requests)
  } catch (error) {
    console.error('Get material requests error:', error)
    res.status(500).json({ error: 'Failed to fetch material requests' })
  }
}

export const getMaterialRequestById = async (req, res) => {
  try {
    const { id } = req.params
    const [requests] = await pool.execute(`
      SELECT mr.*, p.name as project_name, p.project_manager_id, i.name as inventory_name
      FROM material_requests mr
      LEFT JOIN projects p ON mr.project_id = p.id
      LEFT JOIN inventory i ON mr.inventory_id = i.id
      WHERE mr.id = ?
    `, [id])

    if (requests.length === 0) {
      return res.status(404).json({ error: 'Material request not found' })
    }

    const request = requests[0]
    
    // Project managers can only view their own requests
    if (req.user.role === 'project_manager' && request.project_manager_id !== req.user.id) {
      return res.status(403).json({ error: 'You can only view your own material requests' })
    }

    res.json(request)
  } catch (error) {
    console.error('Get material request error:', error)
    res.status(500).json({ error: 'Failed to fetch material request' })
  }
}

export const getMaterialRequestsByManager = async (req, res) => {
  try {
    const { managerId } = req.params
    
    // Project managers can only view their own requests
    if (req.user.role === 'project_manager' && parseInt(managerId) !== req.user.id) {
      return res.status(403).json({ error: 'You can only view your own material requests' })
    }
    
    const [requests] = await pool.execute(`
      SELECT mr.*, p.name as project_name, i.name as inventory_name
      FROM material_requests mr
      LEFT JOIN projects p ON mr.project_id = p.id
      LEFT JOIN inventory i ON mr.inventory_id = i.id
      WHERE p.project_manager_id = ?
      ORDER BY mr.created_at DESC
    `, [managerId])
    res.json(requests)
  } catch (error) {
    console.error('Get material requests by manager error:', error)
    res.status(500).json({ error: 'Failed to fetch material requests' })
  }
}

export const createMaterialRequest = async (req, res) => {
  try {
    const { project_id, inventory_id, quantity, notes } = req.body

    if (!project_id || !inventory_id || !quantity) {
      return res.status(400).json({ error: 'Project, inventory item, and quantity are required' })
    }

    // Verify that the project belongs to the project manager
    const [projects] = await pool.execute(
      'SELECT project_manager_id FROM projects WHERE id = ?',
      [project_id]
    )

    if (projects.length === 0) {
      return res.status(404).json({ error: 'Project not found' })
    }

    if (projects[0].project_manager_id !== req.user.id) {
      return res.status(403).json({ error: 'You can only create requests for your own projects' })
    }

    const [result] = await pool.execute(
      'INSERT INTO material_requests (project_id, inventory_id, quantity, notes, status) VALUES (?, ?, ?, ?, ?)',
      [project_id, inventory_id, quantity, notes || null, 'pending']
    )

    const [newRequest] = await pool.execute(`
      SELECT mr.*, p.name as project_name, i.name as inventory_name
      FROM material_requests mr
      LEFT JOIN projects p ON mr.project_id = p.id
      LEFT JOIN inventory i ON mr.inventory_id = i.id
      WHERE mr.id = ?
    `, [result.insertId])

    res.status(201).json(newRequest[0])
  } catch (error) {
    console.error('Create material request error:', error)
    res.status(500).json({ error: 'Failed to create material request' })
  }
}

export const updateMaterialRequest = async (req, res) => {
  try {
    const { id } = req.params
    const { status, quantity, notes } = req.body

    // Check if request exists
    const [existing] = await pool.execute(
      'SELECT id FROM material_requests WHERE id = ?',
      [id]
    )

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Material request not found' })
    }

    // Build update query dynamically
    const updates = []
    const values = []

    if (status) {
      updates.push('status = ?')
      values.push(status)
    }
    if (quantity !== undefined) {
      updates.push('quantity = ?')
      values.push(quantity)
    }
    if (notes !== undefined) {
      updates.push('notes = ?')
      values.push(notes)
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' })
    }

    values.push(id)
    await pool.execute(
      `UPDATE material_requests SET ${updates.join(', ')} WHERE id = ?`,
      values
    )

    const [updated] = await pool.execute(`
      SELECT mr.*, p.name as project_name, i.name as inventory_name
      FROM material_requests mr
      LEFT JOIN projects p ON mr.project_id = p.id
      LEFT JOIN inventory i ON mr.inventory_id = i.id
      WHERE mr.id = ?
    `, [id])

    res.json(updated[0])
  } catch (error) {
    console.error('Update material request error:', error)
    res.status(500).json({ error: 'Failed to update material request' })
  }
}

export const deleteMaterialRequest = async (req, res) => {
  try {
    const { id } = req.params

    // Check if request exists
    const [existing] = await pool.execute(
      'SELECT id FROM material_requests WHERE id = ?',
      [id]
    )

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Material request not found' })
    }

    await pool.execute('DELETE FROM material_requests WHERE id = ?', [id])
    res.json({ message: 'Material request deleted successfully' })
  } catch (error) {
    console.error('Delete material request error:', error)
    res.status(500).json({ error: 'Failed to delete material request' })
  }
}

