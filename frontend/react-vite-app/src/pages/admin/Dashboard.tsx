import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user?.username}! Here's an overview of your system.</p>
      </div>

      {/* Stats Cards Row */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="stats-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <h6>Total Employees</h6>
            <h2>42</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stats-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <h6>Active Projects</h6>
            <h2>12</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stats-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <h6>Inventory Items</h6>
            <h2>156</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stats-card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <h6>Pending Requests</h6>
            <h2>8</h2>
          </div>
        </div>
      </div>

      {/* Content Cards Row */}
      <div className="row">
        <div className="col-lg-8">
          <div className="dashboard-card">
            <h5>Recent Activity</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>John Doe</strong> submitted a material request
                <span className="text-muted float-end">2 hours ago</span>
              </li>
              <li className="list-group-item">
                <strong>Project Alpha</strong> status updated to In Progress
                <span className="text-muted float-end">5 hours ago</span>
              </li>
              <li className="list-group-item">
                <strong>Jane Smith</strong> completed task "Foundation Work"
                <span className="text-muted float-end">1 day ago</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="dashboard-card">
            <h5>Quick Actions</h5>
            <div className="d-grid gap-2">
              <button className="btn btn-primary">Add New Employee</button>
              <button className="btn btn-outline-primary">Create Project</button>
              <button className="btn btn-outline-primary">Manage Inventory</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;