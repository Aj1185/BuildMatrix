import { useAuth as useAuthContext } from '../contexts/AuthContext';

/**
 * Custom hook to access authentication context
 * Re-exports the useAuth hook from AuthContext for convenience
 * 
 * Usage:
 * const { user, token, role, isAuthenticated, login, logout } = useAuth();
 */
export const useAuth = () => {
  return useAuthContext();
};

/**
 * Helper hook to check if user has specific role
 */
export const useRole = () => {
  const { role, user } = useAuthContext();

  const isAdmin = () => role === 'admin';
  const isManager = () => role === 'manager';
  const isEmployee = () => role === 'employee';
  const hasRole = (checkRole: string) => role === checkRole;

  return {
    role,
    isAdmin,
    isManager,
    isEmployee,
    hasRole,
    user,
  };
};

export default useAuth;