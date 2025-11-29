import pool from '../config/database.js'

export const getAllInventory = async (req, res) => {
  try {
    const [items] = await pool.execute(
      'SELECT * FROM inventory ORDER BY name'
    )
    res.json(items)
  } catch (error) {
    console.error('Get inventory error:', error)
    res.status(500).json({ error: 'Failed to fetch inventory' })
  }
}

export const getInventoryById = async (req, res) => {
  try {
    const { id } = req.params
    const [items] = await pool.execute(
      'SELECT * FROM inventory WHERE id = ?',
      [id]
    )

    if (items.length === 0) {
      return res.status(404).json({ error: 'Inventory item not found' })
    }

    res.json(items[0])
  } catch (error) {
    console.error('Get inventory item error:', error)
    res.status(500).json({ error: 'Failed to fetch inventory item' })
  }
}

export const createInventory = async (req, res) => {
  try {
    const { name, description, quantity, unit, category } = req.body

    if (!name || quantity === undefined) {
      return res.status(400).json({ error: 'Name and quantity are required' })
    }

    const [result] = await pool.execute(
      'INSERT INTO inventory (name, description, quantity, unit, category) VALUES (?, ?, ?, ?, ?)',
      [name, description || null, quantity, unit || null, category || null]
    )

    const [newItem] = await pool.execute(
      'SELECT * FROM inventory WHERE id = ?',
      [result.insertId]
    )

    res.status(201).json(newItem[0])
  } catch (error) {
    console.error('Create inventory error:', error)
    res.status(500).json({ error: 'Failed to create inventory item' })
  }
}

export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, quantity, unit, category } = req.body

    // Check if item exists
    const [existing] = await pool.execute(
      'SELECT id FROM inventory WHERE id = ?',
      [id]
    )

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Inventory item not found' })
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
    if (quantity !== undefined) {
      updates.push('quantity = ?')
      values.push(quantity)
    }
    if (unit !== undefined) {
      updates.push('unit = ?')
      values.push(unit)
    }
    if (category !== undefined) {
      updates.push('category = ?')
      values.push(category)
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' })
    }

    values.push(id)
    await pool.execute(
      `UPDATE inventory SET ${updates.join(', ')} WHERE id = ?`,
      values
    )

    const [updated] = await pool.execute(
      'SELECT * FROM inventory WHERE id = ?',
      [id]
    )

    res.json(updated[0])
  } catch (error) {
    console.error('Update inventory error:', error)
    res.status(500).json({ error: 'Failed to update inventory item' })
  }
}

export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params

    // Check if item exists
    const [existing] = await pool.execute(
      'SELECT id FROM inventory WHERE id = ?',
      [id]
    )

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Inventory item not found' })
    }

    await pool.execute('DELETE FROM inventory WHERE id = ?', [id])
    res.json({ message: 'Inventory item deleted successfully' })
  } catch (error) {
    console.error('Delete inventory error:', error)
    res.status(500).json({ error: 'Failed to delete inventory item' })
  }
}

