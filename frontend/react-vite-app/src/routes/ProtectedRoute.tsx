import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Role } from '../types';

interface ProtectedRouteProps {
  allowedRoles?: Role[];
  requireAuth?: boolean;
}

/**
 * ProtectedRoute component for role-based route protection
 * 
 * @param allowedRoles - Array of roles that can access this route
 * @param requireAuth - If true, only checks authentication (not role)
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  allowedRoles,
  requireAuth = true 
}) => {
  const { isAuthenticated, role, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to login, save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (allowedRoles && allowedRoles.length > 0) {
    if (!role || !allowedRoles.includes(role)) {
      // User doesn't have the required role
      // Redirect to their appropriate dashboard or unauthorized page
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User is authenticated and has required role
  return <Outlet />;
};

export default ProtectedRoute;