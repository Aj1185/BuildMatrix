import { useState, useEffect } from 'react'
import { Container, Table, Card } from 'react-bootstrap'
import { projectService } from '../../services/projectService'
import { useAuth } from '../../contexts/AuthContext'

const ProjectManagerProjects = () => {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const data = await projectService.getByManager(user.id)
      setProjects(data)
    } catch (error) {
      console.error('Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Container className="mt-4">Loading...</Container>
  }

  return (
    <Container className="mt-4">
      <h1>My Projects</h1>
      {projects.length === 0 ? (
        <Card className="mt-4">
          <Card.Body>
            <Card.Text>No projects assigned to you.</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
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
                <td>{project.status || 'Active'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default ProjectManagerProjects

