import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SelectRole from '../pages/SelectRole';
import Login from '../pages/Login';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminEmployees from '../pages/admin/Employees';
import AdminProjects from '../pages/admin/Projects';
import AdminInventory from '../pages/admin/Inventory';
import ManagerDashboard from '../pages/manager/Dashboard';
import ManagerProjects from '../pages/manager/Projects';
import RequestMaterials from '../pages/manager/RequestMaterials';
import EmployeeDashboard from '../pages/employee/Dashboard';
import EmployeeTasks from '../pages/employee/Tasks';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/layout/Layout';

// Unauthorized page component
const Unauthorized: React.FC = () => (
  <div className="container mt-5">
    <div className="alert alert-danger" role="alert">
      <h4 className="alert-heading">Unauthorized Access</h4>
      <p>You don't have permission to access this page.</p>
      <hr />
      <p className="mb-0">
        <a href="/login" className="alert-link">Return to Login</a>
      </p>
    </div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/select-role" replace />} />
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin routes - only accessible by admin role */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<Layout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/employees" element={<AdminEmployees />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/inventory" element={<AdminInventory />} />
          </Route>
        </Route>

        {/* Manager routes - only accessible by manager role */}
        <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
          <Route element={<Layout />}>
            <Route path="/manager/dashboard" element={<ManagerDashboard />} />
            <Route path="/manager/projects" element={<ManagerProjects />} />
            <Route path="/manager/materials" element={<RequestMaterials />} />
          </Route>
        </Route>

        {/* Employee routes - only accessible by employee role */}
        <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
          <Route element={<Layout />}>
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee/tasks" element={<EmployeeTasks />} />
          </Route>
        </Route>

        {/* Catch all - redirect to select role */}
        <Route path="*" element={<Navigate to="/select-role" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;