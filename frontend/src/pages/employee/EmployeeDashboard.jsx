import { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { taskService } from '../../services/taskService'
import { useAuth } from '../../contexts/AuthContext'

const EmployeeDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const tasks = await taskService.getByEmployee(user.id)
      const completedTasks = tasks.filter(t => t.status === 'completed').length
      const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length
      setStats({
        totalTasks: tasks.length,
        completedTasks,
        pendingTasks
      })
    } catch (error) {
      console.error('Failed to fetch stats')
    }
  }

  return (
    <Container className="mt-4">
      <h1>Employee Dashboard</h1>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Tasks</Card.Title>
              <Card.Text className="display-4">{stats.totalTasks}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Completed</Card.Title>
              <Card.Text className="display-4">{stats.completedTasks}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Pending</Card.Title>
              <Card.Text className="display-4">{stats.pendingTasks}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default EmployeeDashboard

