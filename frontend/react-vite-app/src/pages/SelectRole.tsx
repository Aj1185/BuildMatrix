import React from 'react';

const SelectRole: React.FC = () => {
    const handleRoleSelection = (role: string) => {
        // Logic to handle role selection and redirect to the appropriate dashboard
        console.log(`Selected role: ${role}`);
    };

    return (
        <div>
            <h1>Select Your Role</h1>
            <button onClick={() => handleRoleSelection('admin')}>Admin</button>
            <button onClick={() => handleRoleSelection('manager')}>Manager</button>
            <button onClick={() => handleRoleSelection('employee')}>Employee</button>
        </div>
    );
};

export default SelectRole;