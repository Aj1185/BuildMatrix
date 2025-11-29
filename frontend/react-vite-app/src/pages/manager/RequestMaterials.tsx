import React, { useState } from 'react';

const RequestMaterials: React.FC = () => {
  const [materialName, setMaterialName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement material request submission
    alert('Material request submitted successfully!');
    setMaterialName('');
    setQuantity('');
    setPriority('medium');
  };

  return (
    <div>
      <div className="page-header">
        <h1>Request Materials</h1>
        <p>Submit material requests for your construction projects</p>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="dashboard-card">
            <h5>New Material Request</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="materialName" className="form-label">
                  Material Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="materialName"
                  value={materialName}
                  onChange={(e) => setMaterialName(e.target.value)}
                  placeholder="Enter material name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="priority" className="form-label">
                  Priority
                </label>
                <select
                  className="form-select"
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="dashboard-card">
            <h5>Recent Requests</h5>
            <p className="text-muted">No recent requests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestMaterials;
