-- Seed Admin and Test Users
-- Passwords are hashed using bcrypt (cost factor 10)

-- Admin User
-- Email: admin@hakimerad.health.et
-- Password: Love&grace7432
INSERT INTO users (id, name, email, password, role, emailVerified, created_at, updated_at)
VALUES (
  'admin-user-001',
  'Admin User',
  'admin@hakimerad.health.et',
  '$2a$10$X8wZ2Z2Z2Z2Z2Z2Z2Z2Z2uX8wZ2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2Z2', -- This is a placeholder, will be replaced with actual hash
  'ADMIN',
  NOW(),
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE role = 'ADMIN';

-- Test User
-- Email: testuser@example.com
-- Password: testuser123
INSERT INTO users (id, name, email, password, role, emailVerified, created_at, updated_at)
VALUES (
  'test-user-001',
  'Test User',
  'testuser@example.com',
  '$2a$10$Y9yZ3Z3Z3Z3Z3Z3Z3Z3Z3uY9yZ3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3', -- This is a placeholder, will be replaced with actual hash
  'USER',
  NOW(),
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE role = 'USER';
