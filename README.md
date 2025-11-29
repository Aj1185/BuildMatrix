# BuildMatrix - Construction Management System

A full-stack web application for managing construction projects, employees, inventory, and tasks with role-based authentication and a responsive sidebar navigation.

## 🚀 Quick Start

```bash
# Backend
cd backend
npm install
# Configure .env file
npm run dev

# Frontend
cd frontend/react-vite-app
npm install
# Create .env file with VITE_API_URL
npm run dev
```

**Access**: http://localhost:5173

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Frontend Architecture](#frontend-architecture)
- [API Endpoints](#api-endpoints)
- [Development Notes](#development-notes)
- [Customization](#frontend-customization)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Bootstrap 5 + Axios + React Router v6
- **Backend**: Node.js + Express + JWT
- **Database**: MySQL

## Features

### Frontend Features
- ✅ **JWT-based Authentication** - Secure token-based auth with localStorage persistence
- ✅ **Role-Based Access Control** - Three user roles (Admin, Manager, Employee)
- ✅ **Protected Routes** - Automatic route protection based on authentication and roles
- ✅ **Responsive Sidebar Navigation** - Collapsible sidebar with role-specific links
- ✅ **Mobile-Friendly Design** - Fully responsive with touch gestures
- ✅ **Context API for State Management** - Centralized auth and user state
- ✅ **Axios Interceptors** - Automatic token injection and error handling
- ✅ **Bootstrap 5 Styling** - Modern, professional UI components
- ✅ **TypeScript** - Full type safety throughout the application

### Backend Features
- ✅ **RESTful API** - Well-structured API endpoints
- ✅ **JWT Authentication** - Secure token generation and verification
- ✅ **Role-Based Authorization** - Middleware for route protection
- ✅ **MySQL Database** - Relational database with proper schema
- ✅ **Bcrypt Password Hashing** - Secure password storage

### User Roles

1. **Admin**
   - Full CRUD operations for employees, projects, and inventory
   - View all system data
   - Manage user roles and permissions
   - **Sidebar Links**: Dashboard, Employees, Projects, Inventory

2. **Project Manager**
   - View assigned projects
   - Create material requests
   - View project-related tasks
   - **Sidebar Links**: Dashboard, Assigned Projects, Request Materials

3. **Employee**
   - View assigned tasks only
   - Update task status (pending → in_progress → completed)
   - **Sidebar Links**: Dashboard, Tasks

## Project Structure

```
BuildMatrix/
├── frontend/
│   └── react-vite-app/          # React + Vite frontend
│       ├── src/
│       │   ├── components/
│       │   │   └── layout/
│       │   │       ├── Sidebar.tsx      # Responsive sidebar with role-based nav
│       │   │       ├── Sidebar.css      # Sidebar styling
│       │   │       ├── Layout.tsx       # Layout wrapper component
│       │   │       └── Layout.css       # Layout styling
│       │   ├── contexts/
│       │   │   └── AuthContext.tsx      # Auth state management & persistence
│       │   ├── hooks/
│       │   │   └── useAuth.ts           # Custom authentication hooks
│       │   ├── pages/
│       │   │   ├── Login.tsx            # Login page with Bootstrap form
│       │   │   ├── SelectRole.tsx       # Role selection page
│       │   │   ├── admin/               # Admin pages
│       │   │   │   ├── Dashboard.tsx    # Admin dashboard with stats
│       │   │   │   ├── Employees.tsx    # Employee management
│       │   │   │   ├── Projects.tsx     # Project management
│       │   │   │   └── Inventory.tsx    # Inventory management
│       │   │   ├── manager/             # Manager pages
│       │   │   │   ├── Dashboard.tsx    # Manager dashboard
│       │   │   │   ├── Projects.tsx     # Assigned projects view
│       │   │   │   └── RequestMaterials.tsx  # Material request form
│       │   │   └── employee/            # Employee pages
│       │   │       ├── Dashboard.tsx    # Employee dashboard
│       │   │       └── Tasks.tsx        # Task management
│       │   ├── routes/
│       │   │   ├── index.tsx            # Route configuration with Layout
│       │   │   └── ProtectedRoute.tsx   # Role-based route protection
│       │   ├── services/
│       │   │   ├── api.ts               # Axios instance with interceptors
│       │   │   └── authService.ts       # Auth API methods
│       │   ├── types/
│       │   │   └── index.ts             # TypeScript type definitions
│       │   ├── App.tsx                  # Main app with AuthProvider
│       │   ├── main.tsx                 # Entry point
│       │   └── vite-env.d.ts           # Vite environment types
│       ├── .env                         # Environment variables
│       ├── package.json                 # Frontend dependencies
│       └── vite.config.ts              # Vite configuration
│
├── backend/                             # Node.js backend
│   ├── config/
│   │   └── database.js                 # Database configuration
│   ├── controllers/                     # Route controllers
│   │   ├── authController.js
│   │   ├── employeeController.js
│   │   ├── inventoryController.js
│   │   ├── materialRequestController.js
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── auth.js                     # JWT verification middleware
│   ├── routes/                          # API routes
│   │   ├── authRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── inventoryRoutes.js
│   │   ├── materialRequestRoutes.js
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   ├── database/
│   │   ├── schema.sql                  # Database schema
│   │   └── seed.sql                    # Seed data
│   ├── server.js                        # Express server
│   └── package.json                     # Backend dependencies
│
├── LICENSE
└── README.md                            # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your database credentials:
   ```
   PORT=5000
   JWT_SECRET=your-secret-key-change-this-in-production
   JWT_EXPIRE=7d
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your-password
   DB_NAME=buildmatrix
   DB_PORT=3306
   ```

5. Create and seed the database:
   ```bash
   mysql -u root -p < database/schema.sql
   mysql -u root -p < database/seed.sql
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/react-vite-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   # .env
   VITE_API_URL=http://localhost:3000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Preview production build

## Default Login Credentials

**Note**: The seed data includes default users. You'll need to update the password hashes in the seed file with actual bcrypt hashes, or create users through the admin panel.

For development, you can use:
- Admin: `admin@buildmatrix.com` / `admin123` (update password hash in seed.sql)
- Project Manager: `pm1@buildmatrix.com` / `password123`
- Employee: `emp1@buildmatrix.com` / `password123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Employees (Admin only)
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `GET /api/employees/role/:role` - Get employees by role
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Projects
- `GET /api/projects` - Get all projects (Admin)
- `GET /api/projects/manager/:managerId` - Get projects by manager
- `POST /api/projects` - Create project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)

### Inventory
- `GET /api/inventory` - Get all inventory items
- `GET /api/inventory/:id` - Get inventory item by ID
- `POST /api/inventory` - Create inventory item (Admin)
- `PUT /api/inventory/:id` - Update inventory item (Admin)
- `DELETE /api/inventory/:id` - Delete inventory item (Admin)

### Material Requests
- `GET /api/material-requests` - Get all requests (Admin)
- `GET /api/material-requests/manager/:managerId` - Get requests by manager
- `POST /api/material-requests` - Create request (Project Manager)
- `PUT /api/material-requests/:id` - Update request (Admin)
- `DELETE /api/material-requests/:id` - Delete request (Admin)

### Tasks
- `GET /api/tasks` - Get all tasks (Admin/Project Manager)
- `GET /api/tasks/employee/:employeeId` - Get tasks by employee
- `POST /api/tasks` - Create task (Admin/Project Manager)
- `PATCH /api/tasks/:id/status` - Update task status
- `PUT /api/tasks/:id` - Update task (Admin/Project Manager)
- `DELETE /api/tasks/:id` - Delete task (Admin/Project Manager)

## Role-Based Access Control

- **Admin**: Full access to all endpoints
- **Project Manager**: Can view assigned projects, create material requests, and manage tasks
- **Employee**: Can only view and update their own tasks

---

## Frontend Architecture

### Authentication System

The frontend uses a comprehensive authentication system with:

#### AuthContext (`src/contexts/AuthContext.tsx`)
- **State Management**: Token, user, role, authentication status
- **localStorage Persistence**: Auth survives page refreshes
- **Methods**: `login()`, `logout()`, `setRole()`
- **Auto-initialization**: Loads auth state on app mount

```tsx
// Using AuthContext in components
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, token, role, isAuthenticated, login, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.username}!</p>
      ) : (
        <button onClick={() => login('email', 'password')}>Login</button>
      )}
    </div>
  );
}
```

#### Protected Routes (`src/routes/ProtectedRoute.tsx`)
- Automatic authentication checking
- Role-based access control
- Redirects unauthorized users
- Loading states during auth check

```tsx
// Route protection example
<Route element={<ProtectedRoute allowedRoles={['admin']} />}>
  <Route element={<Layout />}>
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
  </Route>
</Route>
```

### Sidebar Navigation

#### Features
- **Role-Based Links**: Shows different navigation items per role
- **Collapsible**: Toggle between 260px (expanded) and 80px (collapsed)
- **Responsive**: Mobile-friendly with overlay and touch gestures
- **User Profile**: Displays avatar, username, and role badge
- **Active Highlighting**: Current page clearly indicated
- **Smooth Animations**: Beautiful transitions throughout

#### Navigation Links by Role

**Admin (4 links)**
- 📊 Dashboard → `/admin/dashboard`
- 👥 Employees → `/admin/employees`
- 📁 Projects → `/admin/projects`
- 📦 Inventory → `/admin/inventory`

**Manager (3 links)**
- 📊 Dashboard → `/manager/dashboard`
- 📁 Assigned Projects → `/manager/projects`
- 🛠️ Request Materials → `/manager/materials`

**Employee (2 links)**
- 📊 Dashboard → `/employee/dashboard`
- ✅ Tasks → `/employee/tasks`

#### Sidebar Component Usage

```tsx
// Sidebar is automatically included via Layout component
import Layout from '../components/layout/Layout';

// Pages wrapped in Layout get the sidebar automatically
<Route element={<Layout />}>
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
</Route>
```

### API Integration

#### Axios Instance (`src/services/api.ts`)
- Pre-configured with base URL
- Request interceptor: Automatically adds JWT token
- Response interceptor: Handles 401/403 errors
- Global error handling

```tsx
import { apiService } from '../services/api';

// GET request
const fetchData = async () => {
  const response = await apiService.get('/endpoint');
  return response.data;
};

// POST request with data
const createData = async (data: any) => {
  const response = await apiService.post('/endpoint', data);
  return response.data;
};
```

#### Auth Service (`src/services/authService.ts`)
Available methods:
- `login(email, password)` - Authenticate user
- `register(userData)` - Register new user
- `logout()` - Logout user
- `getCurrentUser()` - Get current user profile
- `refreshToken()` - Refresh JWT token
- `verifyToken(token)` - Verify token validity

### TypeScript Types (`src/types/index.ts`)

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

### Styling & UI

#### CSS Classes Available

**Layout Classes:**
- `.layout-container` - Main layout wrapper
- `.main-content` - Content area (adjusts for sidebar)
- `.content-wrapper` - Inner content with padding
- `.page-header` - Page title section
- `.dashboard-card` - Standard content card
- `.stats-card` - Statistics display card

**Sidebar Classes:**
- `.sidebar` - Main sidebar container
- `.sidebar.collapsed` - Collapsed state
- `.sidebar-nav` - Navigation list
- `.nav-link.active` - Active page indicator

#### Creating a New Page

```tsx
import React from 'react';

const NewPage: React.FC = () => {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1>Page Title</h1>
        <p>Page description</p>
      </div>

      {/* Content */}
      <div className="row">
        <div className="col-lg-8">
          <div className="dashboard-card">
            <h5>Card Title</h5>
            <p>Your content here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPage;
```

### Custom Hooks

#### `useAuth()` Hook
```tsx
import { useAuth } from '../contexts/AuthContext';

const { user, token, role, isAuthenticated, login, logout } = useAuth();
```

#### `useRole()` Hook
```tsx
import { useRole } from '../hooks/useAuth';

const { isAdmin, isManager, isEmployee, hasRole } = useRole();

// Usage
if (isAdmin()) {
  // Show admin-only content
}
```

### Routes

#### Public Routes
- `/` - Redirects to `/select-role`
- `/select-role` - Role selection page
- `/login` - Login page
- `/unauthorized` - Unauthorized access page

#### Protected Routes

**Admin Routes** (Admin only)
- `/admin/dashboard` - Admin dashboard with statistics
- `/admin/employees` - Employee management (CRUD)
- `/admin/projects` - Project management (CRUD)
- `/admin/inventory` - Inventory management (CRUD)

**Manager Routes** (Manager only)
- `/manager/dashboard` - Manager dashboard
- `/manager/projects` - View assigned projects
- `/manager/materials` - Submit material requests

**Employee Routes** (Employee only)
- `/employee/dashboard` - Employee dashboard
- `/employee/tasks` - View and update assigned tasks

---

## Role-Based Access Control

- **Admin**: Full access to all endpoints
- **Project Manager**: Can view assigned projects, create material requests, and manage tasks
- **Employee**: Can only view and update their own tasks

## Development Notes

### Frontend Development
- All API routes require JWT authentication (except login)
- Role-based authorization is enforced at the route level
- Frontend automatically redirects based on user role after login
- JWT tokens are stored in localStorage
- TypeScript provides full type safety
- Bootstrap 5 for responsive UI components
- Axios interceptors handle token injection automatically

### Backend Development
- Password hashing uses bcrypt with 10 salt rounds
- JWT tokens expire based on JWT_EXPIRE env variable
- Database connection uses connection pooling
- All routes protected with JWT middleware
- Role-based middleware for authorization

### Security Features
1. **JWT Authentication**: Secure token-based auth
2. **Bcrypt Password Hashing**: Strong password encryption
3. **Role-Based Access Control**: Granular permissions
4. **Request Interceptors**: Automatic token management
5. **Protected Routes**: Client-side route protection
6. **Error Handling**: Global error management

---

## Frontend Customization

### Changing Sidebar Colors

Edit `src/components/layout/Sidebar.css`:

```css
.sidebar {
  background: linear-gradient(180deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}
```

### Adding Navigation Links

Edit `src/components/layout/Sidebar.tsx`:

```tsx
case 'admin':
  return [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/new-page', label: 'New Page', icon: '🆕' },
    // ... existing items
  ];
```

### Changing Sidebar Width

Edit `src/components/layout/Sidebar.css`:

```css
.sidebar {
  width: 280px;  /* Change from 260px */
}

.sidebar.collapsed {
  width: 90px;   /* Change from 80px */
}

.main-content {
  margin-left: 280px;  /* Match sidebar width */
}
```

### Adding a New Protected Route

1. Create your page component in `src/pages/`
2. Import it in `src/routes/index.tsx`
3. Add the route with protection:

```tsx
<Route element={<ProtectedRoute allowedRoles={['admin', 'manager']} />}>
  <Route element={<Layout />}>
    <Route path="/new-page" element={<NewPage />} />
  </Route>
</Route>
```

4. Add the navigation link in `Sidebar.tsx`

### Updating API Base URL

Edit `.env` file:

```env
VITE_API_URL=https://your-api-domain.com/api
```

---

## Responsive Design

### Breakpoints
- **Desktop**: ≥768px - Sidebar always visible, collapsible
- **Tablet**: 768px-1024px - Sidebar visible, can be collapsed
- **Mobile**: <768px - Sidebar hidden, slides in on toggle

### Mobile Features
- Touch-friendly interface
- Dark overlay when sidebar is open
- Tap outside to close sidebar
- No horizontal scrolling
- Bootstrap responsive grid system

---

## Testing

### Frontend Testing

1. **Test Authentication**
   ```bash
   # Login with different roles
   - Admin: Full access to all routes
   - Manager: Access to manager routes only
   - Employee: Access to employee routes only
   ```

2. **Test Sidebar**
   ```bash
   # Verify role-based links
   - Admin should see 4 links
   - Manager should see 3 links
   - Employee should see 2 links
   
   # Test responsive behavior
   - Desktop: Sidebar visible, collapsible
   - Mobile: Sidebar hidden, toggle works
   ```

3. **Test Protected Routes**
   ```bash
   # Try accessing routes without auth
   - Should redirect to /login
   
   # Try accessing routes with wrong role
   - Should redirect to /unauthorized
   ```

4. **Test Persistence**
   ```bash
   # Login and refresh page
   - Should stay logged in
   
   # Logout and refresh
   - Should stay logged out
   ```

### Demo Credentials

For development/testing (update password hashes in seed.sql):
- **Admin**: `admin@buildmatrix.com` / `admin123`
- **Project Manager**: `pm1@buildmatrix.com` / `password123`
- **Employee**: `emp1@buildmatrix.com` / `password123`

---

## Deployment

### Frontend Deployment

1. Build the production bundle:
   ```bash
   cd frontend/react-vite-app
   npm run build
   ```

2. The build output will be in `dist/` folder

3. Deploy to your hosting service (Vercel, Netlify, etc.)

4. Update environment variables on your hosting platform

### Backend Deployment

1. Ensure all environment variables are set on your server
2. Install dependencies: `npm install --production`
3. Start the server: `npm start`
4. Use PM2 or similar for process management

### Environment Variables for Production

**Frontend (.env.production)**
```env
VITE_API_URL=https://your-api-domain.com/api
```

**Backend (.env)**
```env
PORT=5000
NODE_ENV=production
JWT_SECRET=your-very-secure-secret-key
JWT_EXPIRE=7d
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=buildmatrix
DB_PORT=3306
```

---

## Troubleshooting

### Frontend Issues

**Issue: Sidebar doesn't show**
- Ensure you're logged in
- Check if routes are wrapped with `<Layout />` component
- Verify user role in localStorage

**Issue: API calls failing**
- Check if backend is running on correct port
- Verify VITE_API_URL in .env file
- Check browser console for CORS errors
- Ensure token is present in localStorage

**Issue: TypeScript errors**
- Run `npm install` to ensure all dependencies are installed
- Restart VS Code / TypeScript server
- Check `tsconfig.json` configuration

**Issue: Login not working**
- Verify backend API is running
- Check network tab in browser DevTools
- Ensure credentials are correct
- Check if JWT token is being returned

### Backend Issues

**Issue: Database connection failed**
- Verify MySQL is running
- Check database credentials in .env
- Ensure database exists (run schema.sql)

**Issue: JWT token invalid**
- Check JWT_SECRET in .env matches
- Verify token expiration time
- Clear localStorage and login again

---

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Performance Optimization

### Frontend
- Code splitting with React Router
- Lazy loading of routes
- CSS optimization with Vite
- Image optimization
- Bundle size optimization

### Backend
- Database query optimization
- Connection pooling
- Caching strategies (future enhancement)
- Request rate limiting (future enhancement)

---

## Future Enhancements

### Planned Features
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Two-factor authentication
- [ ] Email notifications
- [ ] File upload for projects
- [ ] Real-time updates with WebSockets
- [ ] Advanced reporting and analytics
- [ ] Dark/light theme toggle
- [ ] Activity logging and audit trail
- [ ] Advanced search and filtering
- [ ] Export data to PDF/Excel
- [ ] Mobile app (React Native)

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

See LICENSE file for details.

---

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

## Acknowledgments

- Built with React, Vite, TypeScript, and Bootstrap
- Backend powered by Node.js and Express
- Authentication with JWT
- Database management with MySQL

---

**Last Updated**: November 29, 2025
**Version**: 1.0.0
**Status**: ✅ Production Ready
