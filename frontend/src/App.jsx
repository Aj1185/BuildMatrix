import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/routing/PrivateRoute'
import Navbar from './components/layout/Navbar'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProjectManagerDashboard from './pages/project-manager/ProjectManagerDashboard'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import Employees from './pages/admin/Employees'
import Projects from './pages/admin/Projects'
import Inventory from './pages/admin/Inventory'
import ProjectManagerProjects from './pages/project-manager/ProjectManagerProjects'
import MaterialRequests from './pages/project-manager/MaterialRequests'
import EmployeeTasks from './pages/employee/EmployeeTasks'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute requiredRole="admin">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/employees"
              element={
                <PrivateRoute requiredRole="admin">
                  <Employees />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <PrivateRoute requiredRole="admin">
                  <Projects />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/inventory"
              element={
                <PrivateRoute requiredRole="admin">
                  <Inventory />
                </PrivateRoute>
              }
            />
            {/* Project Manager Routes */}
            <Route
              path="/project-manager/dashboard"
              element={
                <PrivateRoute requiredRole="project_manager">
                  <ProjectManagerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/project-manager/projects"
              element={
                <PrivateRoute requiredRole="project_manager">
                  <ProjectManagerProjects />
                </PrivateRoute>
              }
            />
            <Route
              path="/project-manager/material-requests"
              element={
                <PrivateRoute requiredRole="project_manager">
                  <MaterialRequests />
                </PrivateRoute>
              }
            />
            {/* Employee Routes */}
            <Route
              path="/employee/dashboard"
              element={
                <PrivateRoute requiredRole="employee">
                  <EmployeeDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/employee/tasks"
              element={
                <PrivateRoute requiredRole="employee">
                  <EmployeeTasks />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

