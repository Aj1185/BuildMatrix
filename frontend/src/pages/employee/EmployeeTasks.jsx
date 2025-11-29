import { useState, useEffect } from 'react'
import { Container, Table, Card, Badge, Button } from 'react-bootstrap'
import { taskService } from '../../services/taskService'
import { useAuth } from '../../contexts/AuthContext'

const EmployeeTasks = () => {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const data = await taskService.getByEmployee(user.id)
      setTasks(data)
    } catch (error) {
      console.error('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await taskService.updateStatus(taskId, newStatus)
      fetchTasks()
    } catch (error) {
      console.error('Failed to update task status')
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      in_progress: 'info',
      completed: 'success',
      cancelled: 'danger'
    }
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>
  }

  if (loading) {
    return <Container className="mt-4">Loading...</Container>
  }

  return (
    <Container className="mt-4">
      <h1>My Tasks</h1>
      {tasks.length === 0 ? (
        <Card className="mt-4">
          <Card.Body>
            <Card.Text>No tasks assigned to you.</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Project</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.project_name}</td>
                <td>{getStatusBadge(task.status)}</td>
                <td>{task.due_date || 'N/A'}</td>
                <td>
                  {task.status === 'pending' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleUpdateStatus(task.id, 'in_progress')}
                    >
                      Start
                    </Button>
                  )}
                  {task.status === 'in_progress' && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleUpdateStatus(task.id, 'completed')}
                    >
                      Complete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default EmployeeTasks

