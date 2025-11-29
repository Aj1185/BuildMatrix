import { apiService } from './api';
import { LoginResponse, User, Role } from '../types';

export const authService = {
  /**
   * Login user with email and password
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await apiService.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password');
    }
  },

  /**
   * Register new user
   */
  register: async (userData: {
    email: string;
    password: string;
    username: string;
    role: Role;
  }): Promise<LoginResponse> => {
    try {
      const response = await apiService.post<LoginResponse>('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await apiService.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw new Error('Failed to get user profile');
    }
  },

  /**
   * Refresh authentication token
   */
  refreshToken: async (): Promise<{ token: string }> => {
    try {
      const response = await apiService.post<{ token: string }>('/auth/refresh');
      return response.data;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw new Error('Failed to refresh token');
    }
  },

  /**
   * Verify if token is valid
   */
  verifyToken: async (token: string): Promise<boolean> => {
    try {
      const response = await apiService.post<{ valid: boolean }>('/auth/verify', { token });
      return response.data.valid;
    } catch (error) {
      return false;
    }
  },
};

export default authService;
