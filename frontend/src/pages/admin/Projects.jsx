import { useState, useEffect } from 'react'
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap'
import { projectService } from '../../services/projectService'
import { employeeService } from '../../services/employeeService'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [projectManagers, setProjectManagers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    project_manager_id: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProjects()
    fetchProjectManagers()
  }, [])

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAll()
      setProjects(data)
    } catch (error) {
      setError('Failed to fetch projects')
    }
  }

  const fetchProjectManagers = async () => {
    try {
      const data = await employeeService.getByRole('project_manager')
      setProjectManagers(data)
    } catch (error) {
      console.error('Failed to fetch project managers')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (editingProject) {
        await projectService.update(editingProject.id, formData)
      } else {
        await projectService.create(formData)
      }
      setShowModal(false)
      setEditingProject(null)
      setFormData({ name: '', description: '', start_date: '', end_date: '', project_manager_id: '' })
      fetchProjects()
    } catch (error) {
      setError(error.message || 'Operation failed')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      name: project.name,
      description: project.description || '',
      start_date: project.start_date || '',
      end_date: project.end_date || '',
      project_manager_id: project.project_manager_id || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.delete(id)
        fetchProjects()
      } catch (error) {
        setError('Failed to delete project')
      }
    }
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Projects</h1>
        <Button onClick={() => setShowModal(true)}>Add Project</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Project Manager</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.start_date}</td>
              <td>{project.end_date}</td>
              <td>{project.project_manager_name || 'N/A'}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(project)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(project.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => { setShowModal(false); setEditingProject(null); setFormData({ name: '', description: '', start_date: '', end_date: '', project_manager_id: '' }) }}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProject ? 'Edit Project' : 'Add Project'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Manager</Form.Label>
              <Form.Select
                value={formData.project_manager_id}
                onChange={(e) => setFormData({ ...formData, project_manager_id: e.target.value })}
              >
                <option value="">Select Project Manager</option>
                {projectManagers.map((pm) => (
                  <option key={pm.id} value={pm.id}>
                    {pm.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowModal(false); setEditingProject(null); setFormData({ name: '', description: '', start_date: '', end_date: '', project_manager_id: '' }) }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default Projects

