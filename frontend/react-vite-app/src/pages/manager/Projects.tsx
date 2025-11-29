import React from 'react';

const ManagerProjects: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <h1>Assigned Projects</h1>
        <p>View and manage your assigned construction projects</p>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="dashboard-card">
            <h5>Your Projects</h5>
            <div className="alert alert-info">
              <p className="mb-0">
                <strong>Coming Soon:</strong> This page will display all projects assigned to you as a manager.
                You'll be able to view project details, update progress, and manage team members.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerProjects;
