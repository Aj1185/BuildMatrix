import React from 'react';

const EmployeeTasks: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <h1>My Tasks</h1>
        <p>View and manage your assigned tasks</p>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="dashboard-card">
            <h5>Active Tasks</h5>
            <div className="alert alert-info">
              <p className="mb-0">
                <strong>Coming Soon:</strong> This page will display all tasks assigned to you.
                You'll be able to view task details, update status, and mark tasks as complete.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="dashboard-card">
            <h5>Task Summary</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Pending</span>
                <span className="badge bg-warning">0</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>In Progress</span>
                <span className="badge bg-primary">0</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Completed</span>
                <span className="badge bg-success">0</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTasks;
