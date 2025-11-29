import { Link, useNavigate } from 'react-router-dom'
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/dashboard">
          BuildMatrix
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user?.role === 'admin' && (
              <>
                <Nav.Link as={Link} to="/admin/dashboard">
                  Admin Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/employees">
                  Employees
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/projects">
                  Projects
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/inventory">
                  Inventory
                </Nav.Link>
              </>
            )}
            {user?.role === 'project_manager' && (
              <>
                <Nav.Link as={Link} to="/project-manager/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/project-manager/projects">
                  Projects
                </Nav.Link>
                <Nav.Link as={Link} to="/project-manager/material-requests">
                  Material Requests
                </Nav.Link>
              </>
            )}
            {user?.role === 'employee' && (
              <>
                <Nav.Link as={Link} to="/employee/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/employee/tasks">
                  My Tasks
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            <NavDropdown title={user?.name || 'User'} id="user-nav-dropdown">
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar

