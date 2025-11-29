import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Sidebar.css';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const Sidebar: React.FC = () => {
  const { user, role, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Define navigation items based on role
  const getNavItems = (): NavItem[] => {
    switch (role) {
      case 'admin':
        return [
          { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
          { path: '/admin/employees', label: 'Employees', icon: '👥' },
          { path: '/admin/projects', label: 'Projects', icon: '📁' },
          { path: '/admin/inventory', label: 'Inventory', icon: '📦' },
        ];
      case 'manager':
        return [
          { path: '/manager/dashboard', label: 'Dashboard', icon: '📊' },
          { path: '/manager/projects', label: 'Assigned Projects', icon: '📁' },
          { path: '/manager/materials', label: 'Request Materials', icon: '🛠️' },
        ];
      case 'employee':
        return [
          { path: '/employee/dashboard', label: 'Dashboard', icon: '📊' },
          { path: '/employee/tasks', label: 'Tasks', icon: '✅' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="d-flex align-items-center justify-content-between">
            {!isCollapsed && (
              <div className="sidebar-brand">
                <h4 className="mb-0">BuildMatrix</h4>
              </div>
            )}
            <button
              className="btn btn-link sidebar-toggle"
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              {isCollapsed ? '☰' : '✕'}
            </button>
          </div>
        </div>

        {/* User Info */}
        {!isCollapsed && (
          <div className="sidebar-user">
            <div className="user-avatar">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-info">
              <div className="user-name">{user?.username || 'User'}</div>
              <div className="user-role">
                <span className={`badge bg-${getRoleBadgeColor(role)}`}>
                  {role?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <ul className="nav flex-column">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  title={item.label}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!isCollapsed && <span className="nav-label">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button
            className="btn btn-outline-light w-100"
            onClick={handleLogout}
            title="Logout"
          >
            <span className="nav-icon">🚪</span>
            {!isCollapsed && <span className="ms-2">Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div
          className="sidebar-overlay d-md-none"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

// Helper function to get badge color based on role
const getRoleBadgeColor = (role: string | null): string => {
  switch (role) {
    case 'admin':
      return 'danger';
    case 'manager':
      return 'warning';
    case 'employee':
      return 'info';
    default:
      return 'secondary';
  }
};

export default Sidebar;
