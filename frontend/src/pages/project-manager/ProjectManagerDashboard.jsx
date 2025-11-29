import { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { projectService } from '../../services/projectService'
import { useAuth } from '../../contexts/AuthContext'

const ProjectManagerDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    pendingRequests: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const projects = await projectService.getByManager(user.id)
      const activeProjects = projects.filter(p => p.status === 'active').length
      // TODO: Fetch pending material requests count
      setStats({
        totalProjects: projects.length,
        activeProjects,
        pendingRequests: 0
      })
    } catch (error) {
      console.error('Failed to fetch stats')
    }
  }

  return (
    <Container className="mt-4">
      <h1>Project Manager Dashboard</h1>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Projects</Card.Title>
              <Card.Text className="display-4">{stats.totalProjects}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Active Projects</Card.Title>
              <Card.Text className="display-4">{stats.activeProjects}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Pending Requests</Card.Title>
              <Card.Text className="display-4">{stats.pendingRequests}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProjectManagerDashboard

