import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role, AuthContextType, LoginResponse } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local storage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const ROLE_KEY = 'auth_role';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRoleState] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);
        const storedRole = localStorage.getItem(ROLE_KEY);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setRoleState((storedRole as Role) || null);
        }
      } catch (error) {
        console.error('Failed to initialize auth from localStorage:', error);
        // Clear invalid data
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(ROLE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function - calls API and stores token
  const login = async (email: string, password: string): Promise<void> => {
    try {
      // TODO: Replace with actual API call
      // const response = await axios.post<LoginResponse>('/api/auth/login', { email, password });
      // const { token: newToken, user: newUser } = response.data;

      // Mock login for now - replace with actual API call
      const mockResponse: LoginResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 1,
          username: email.split('@')[0],
          email: email,
          role: 'admin', // This should come from API
          firstName: 'John',
          lastName: 'Doe',
        },
      };

      const { token: newToken, user: newUser } = mockResponse;

      // Store in state
      setToken(newToken);
      setUser(newUser);
      setRoleState(newUser.role);

      // Persist to localStorage
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      localStorage.setItem(ROLE_KEY, newUser.role);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  // Logout function - clears token and user data
  const logout = () => {
    setToken(null);
    setUser(null);
    setRoleState(null);

    // Clear localStorage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ROLE_KEY);
  };

  // Set role manually (for role selection screen)
  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem(ROLE_KEY, newRole);

    // Update user object if exists
    if (user) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    }
  };

  const isAuthenticated = !!token && !!user;

  const value: AuthContextType = {
    user,
    token,
    role,
    isAuthenticated,
    isLoading,
    login,
    logout,
    setRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};