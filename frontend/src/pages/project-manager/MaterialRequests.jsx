import { useState, useEffect } from 'react'
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap'
import { materialRequestService } from '../../services/materialRequestService'
import { inventoryService } from '../../services/inventoryService'
import { projectService } from '../../services/projectService'
import { useAuth } from '../../contexts/AuthContext'

const MaterialRequests = () => {
  const { user } = useAuth()
  const [requests, setRequests] = useState([])
  const [inventoryItems, setInventoryItems] = useState([])
  const [projects, setProjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    project_id: '',
    inventory_id: '',
    quantity: 0,
    notes: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchRequests()
    fetchInventoryItems()
    fetchProjects()
  }, [])

  const fetchRequests = async () => {
    try {
      const data = await materialRequestService.getByManager(user.id)
      setRequests(data)
    } catch (error) {
      setError('Failed to fetch material requests')
    }
  }

  const fetchInventoryItems = async () => {
    try {
      const data = await inventoryService.getAll()
      setInventoryItems(data)
    } catch (error) {
      console.error('Failed to fetch inventory items')
    }
  }

  const fetchProjects = async () => {
    try {
      const data = await projectService.getByManager(user.id)
      setProjects(data)
    } catch (error) {
      console.error('Failed to fetch projects')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await materialRequestService.create(formData)
      setShowModal(false)
      setFormData({ project_id: '', inventory_id: '', quantity: 0, notes: '' })
      fetchRequests()
    } catch (error) {
      setError(error.message || 'Failed to create request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Material Requests</h1>
        <Button onClick={() => setShowModal(true)}>New Request</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Project</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.project_name}</td>
              <td>{request.inventory_name}</td>
              <td>{request.quantity}</td>
              <td>{request.status || 'Pending'}</td>
              <td>{request.notes}</td>
              <td>{request.created_at}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => { setShowModal(false); setFormData({ project_id: '', inventory_id: '', quantity: 0, notes: '' }) }}>
        <Modal.Header closeButton>
          <Modal.Title>New Material Request</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Project</Form.Label>
              <Form.Select
                value={formData.project_id}
                onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                required
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Item</Form.Label>
              <Form.Select
                value={formData.inventory_id}
                onChange={(e) => setFormData({ ...formData, inventory_id: e.target.value })}
                required
              >
                <option value="">Select Item</option>
                {inventoryItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.quantity} {item.unit} available)
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                required
                min="1"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowModal(false); setFormData({ project_id: '', inventory_id: '', quantity: 0, notes: '' }) }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default MaterialRequests

