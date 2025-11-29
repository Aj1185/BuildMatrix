# BuildMatrix - React + Vite Authentication System

A complete authentication and role-based access control system built with React, TypeScript, Vite, and Bootstrap.

## Features

- ✅ **Authentication Context** - Centralized auth state management with token and user data
- ✅ **Role-Based Access Control** - Support for admin, manager, and employee roles
- ✅ **Protected Routes** - Automatic route protection based on authentication and roles
- ✅ **localStorage Persistence** - Auth state persists across browser sessions
- ✅ **Axios Integration** - Pre-configured API client with interceptors
- ✅ **Bootstrap 5** - Modern, responsive UI components
- ✅ **TypeScript** - Full type safety throughout the application

## Project Structure

```
react-vite-app/
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx         # Authentication context provider
│   ├── hooks/
│   │   └── useAuth.ts              # Custom auth hooks
│   ├── routes/
│   │   ├── index.tsx               # Main route configuration
│   │   └── ProtectedRoute.tsx      # Protected route wrapper
│   ├── pages/
│   │   ├── Login.tsx               # Login page
│   │   ├── SelectRole.tsx          # Role selection page
│   │   ├── admin/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Employees.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Inventory.tsx
│   │   ├── manager/
│   │   │   └── Dashboard.tsx
│   │   └── employee/
│   │       └── Dashboard.tsx
│   ├── services/
│   │   ├── api.ts                  # Axios instance & interceptors
│   │   └── authService.ts          # Auth API methods
│   ├── types/
│   │   └── index.ts                # TypeScript type definitions
│   ├── App.tsx                      # Main app component
│   └── main.tsx                     # Entry point
├── package.json
└── vite.config.ts
```

## Routes

### Public Routes
- `/` - Redirects to `/select-role`
- `/select-role` - Role selection screen
- `/login` - Login page
- `/unauthorized` - Unauthorized access page

### Protected Routes

#### Admin Only
- `/admin/dashboard` - Admin dashboard
- `/admin/employees` - Employee management
- `/admin/projects` - Project management
- `/admin/inventory` - Inventory management

#### Manager Only
- `/manager/dashboard` - Manager dashboard

#### Employee Only
- `/employee/dashboard` - Employee dashboard

## Installation

1. **Install dependencies:**
   ```bash
   cd frontend/react-vite-app
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.0.0",
    "bootstrap": "^5.3.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "vite": "^3.0.0",
    "typescript": "^4.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

## Usage Examples

### 1. Using AuthContext

```tsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, token, role, isAuthenticated, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password');
      // User is now authenticated
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.username}!</p>
          <p>Role: {role}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### 2. Using Role Checks

```tsx
import { useRole } from '../hooks/useAuth';

function MyComponent() {
  const { isAdmin, isManager, isEmployee, hasRole } = useRole();

  return (
    <div>
      {isAdmin() && <AdminPanel />}
      {isManager() && <ManagerPanel />}
      {isEmployee() && <EmployeePanel />}
      {hasRole('admin') && <SpecialFeature />}
    </div>
  );
}
```

### 3. Making API Calls

```tsx
import { apiService } from '../services/api';

// GET request
const fetchData = async () => {
  try {
    const response = await apiService.get('/endpoint');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// POST request
const createData = async (data: any) => {
  try {
    const response = await apiService.post('/endpoint', data);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### 4. Creating Protected Routes

```tsx
// In routes/index.tsx
<Route element={<ProtectedRoute allowedRoles={['admin']} />}>
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/admin/employees" element={<AdminEmployees />} />
</Route>

// For multiple roles
<Route element={<ProtectedRoute allowedRoles={['admin', 'manager']} />}>
  <Route path="/reports" element={<Reports />} />
</Route>

// Just check authentication (any role)
<Route element={<ProtectedRoute requireAuth={true} />}>
  <Route path="/profile" element={<Profile />} />
</Route>
```

## AuthContext API

### State
- `user: User | null` - Current user object
- `token: string | null` - JWT authentication token
- `role: Role | null` - Current user role ('admin' | 'manager' | 'employee')
- `isAuthenticated: boolean` - Whether user is logged in
- `isLoading: boolean` - Loading state during initialization

### Methods
- `login(email: string, password: string): Promise<void>` - Authenticate user
- `logout(): void` - Clear auth state and logout
- `setRole(role: Role): void` - Manually set user role

## Type Definitions

```typescript
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
```

## Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:3000/api
```

## Security Features

1. **Token Storage** - JWT tokens stored in localStorage
2. **Request Interceptors** - Automatically adds auth token to requests
3. **Response Interceptors** - Handles 401/403 errors globally
4. **Route Protection** - Prevents unauthorized access to protected routes
5. **Role-Based Access** - Granular control over route access by role

## API Integration

The authentication system is ready to integrate with your backend:

1. **Update the API URL** in `.env` or `src/services/api.ts`
2. **Modify the login function** in `AuthContext.tsx` to call your actual API
3. **Adjust the User interface** in `types/index.ts` to match your backend response

```tsx
// In AuthContext.tsx, replace the mock login with:
const login = async (email: string, password: string): Promise<void> => {
  try {
    const response = await authService.login(email, password);
    const { token: newToken, user: newUser } = response;

    setToken(newToken);
    setUser(newUser);
    setRoleState(newUser.role);

    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    localStorage.setItem(ROLE_KEY, newUser.role);
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
```

## Testing

Demo credentials (when using mock authentication):
- **Admin:** admin@example.com / admin
- **Manager:** manager@example.com / manager
- **Employee:** employee@example.com / employee

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Configure environment variables
3. ✅ Connect to your backend API
4. ✅ Customize UI components
5. ✅ Add additional routes as needed
6. ✅ Implement additional features (password reset, profile management, etc.)

## License

MIT
