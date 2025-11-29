-- BuildMatrix Database Seed Data
-- Sample data for development and testing

USE buildmatrix;

-- Insert sample project managers
INSERT INTO users (name, email, password, role) VALUES
('John Manager', 'pm1@buildmatrix.com', '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', 'project_manager'),
('Sarah Manager', 'pm2@buildmatrix.com', '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', 'project_manager')
ON DUPLICATE KEY UPDATE name=name;

-- Insert sample employees
INSERT INTO users (name, email, password, role) VALUES
('Mike Worker', 'emp1@buildmatrix.com', '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', 'employee'),
('Lisa Worker', 'emp2@buildmatrix.com', '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', 'employee'),
('Tom Worker', 'emp3@buildmatrix.com', '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', 'employee')
ON DUPLICATE KEY UPDATE name=name;

-- Insert sample projects
INSERT INTO projects (name, description, start_date, end_date, project_manager_id, status) VALUES
('Office Building Construction', 'New 5-story office building in downtown', '2024-01-15', '2024-12-31', 2, 'active'),
('Residential Complex', '50-unit residential complex', '2024-02-01', '2025-06-30', 3, 'active'),
('Shopping Mall Renovation', 'Complete renovation of existing mall', '2024-03-01', '2024-11-30', 2, 'planning')
ON DUPLICATE KEY UPDATE name=name;

-- Insert sample inventory items
INSERT INTO inventory (name, description, quantity, unit, category) VALUES
('Cement', 'Portland cement bags', 500, 'bags', 'Materials'),
('Steel Rebar', 'Reinforcement steel bars', 2000, 'kg', 'Materials'),
('Bricks', 'Standard red bricks', 10000, 'pieces', 'Materials'),
('Concrete Mixer', 'Portable concrete mixer', 3, 'units', 'Equipment'),
('Safety Helmets', 'Construction safety helmets', 50, 'pieces', 'Safety'),
('Drill Machine', 'Electric drill machine', 5, 'units', 'Tools')
ON DUPLICATE KEY UPDATE name=name;

-- Insert sample tasks
INSERT INTO tasks (title, description, project_id, employee_id, status, due_date) VALUES
('Foundation Work', 'Complete foundation excavation and pouring', 1, 4, 'in_progress', '2024-02-15'),
('Frame Installation', 'Install steel frame structure', 1, 5, 'pending', '2024-03-01'),
('Electrical Wiring', 'Install electrical wiring for first floor', 1, 4, 'pending', '2024-04-15'),
('Plumbing Installation', 'Install plumbing for residential units', 2, 6, 'in_progress', '2024-03-20'),
('Wall Construction', 'Build walls for units 1-10', 2, 5, 'completed', '2024-02-28')
ON DUPLICATE KEY UPDATE title=title;

-- Insert sample material requests
INSERT INTO material_requests (project_id, inventory_id, quantity, notes, status) VALUES
(1, 1, 100, 'Need for foundation work', 'pending'),
(1, 2, 500, 'For frame installation', 'approved'),
(2, 3, 2000, 'For wall construction', 'fulfilled'),
(2, 1, 50, 'Additional cement needed', 'pending')
ON DUPLICATE KEY UPDATE project_id=project_id;

