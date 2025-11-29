import { Container, Row, Col, Card } from 'react-bootstrap'

const AdminDashboard = () => {
  return (
    <Container className="mt-4">
      <h1>Admin Dashboard</h1>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Employees</Card.Title>
              <Card.Text>Manage employees</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Projects</Card.Title>
              <Card.Text>Manage projects</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Inventory</Card.Title>
              <Card.Text>Manage inventory</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard

