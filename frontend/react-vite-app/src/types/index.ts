export type Role = 'admin' | 'manager' | 'employee';

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  firstName?: string;
  lastName?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  role: Role | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setRole: (role: Role) => void;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  role: Role | null;
}