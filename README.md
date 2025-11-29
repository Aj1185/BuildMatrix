# BuildMatrix - Construction Management System

A full-stack web application for managing construction projects, employees, inventory, and tasks.

## Tech Stack

- **Frontend**: React + Vite + Bootstrap
- **Backend**: Node.js + Express + JWT
- **Database**: MySQL

## Features

### User Roles

1. **Admin**
   - Full CRUD operations for employees, projects, and inventory
   - View all system data
   - Manage user roles and permissions

2. **Project Manager**
   - View assigned projects
   - Create material requests
   - View project-related tasks

3. **Employee**
   - View assigned tasks only
   - Update task status (pending → in_progress → completed)

## Project Structure

```
BuildMatrix/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # React contexts (Auth)
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service files
│   │   └── App.jsx          # Main app component
│   ├── package.json
│   └── vite.config.js
│
├── backend/                 # Node.js backend application
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Express middleware
│   ├── routes/              # API routes
│   ├── database/            # Database schema and seeds
│   ├── server.js            # Express server
│   └── package.json
│
└── README.md
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
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

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

## Development Notes

- All API routes require JWT authentication (except login)
- Role-based authorization is enforced at the route level
- Frontend automatically redirects based on user role after login
- JWT tokens are stored in localStorage
- Password hashing uses bcrypt with 10 salt rounds

## License

See LICENSE file for details.
