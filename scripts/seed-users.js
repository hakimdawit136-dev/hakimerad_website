const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function seedUsers() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3307,
    user: process.env.MYSQL_USER || 'hakimerad_user',
    password: process.env.MYSQL_PASSWORD || 'hakimerad_pass',
    database: process.env.MYSQL_DATABASE || 'hakimerad_db',
  });

  try {
    console.log('Connected to database');

    // Hash passwords
    const adminPassword = await bcrypt.hash('Love&grace7432', 10);
    const testUserPassword = await bcrypt.hash('testuser123', 10);

    console.log('Passwords hashed successfully');

    // Insert or update admin user
    await connection.execute(
      `INSERT INTO users (id, name, email, password, role, emailVerified, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, NOW(), NOW(), NOW())
       ON DUPLICATE KEY UPDATE 
       password = VALUES(password),
       role = VALUES(role),
       updated_at = NOW()`,
      ['admin-user-001', 'Admin User', 'admin@hakimerad.health.et', adminPassword, 'ADMIN']
    );

    console.log('Admin user created/updated successfully');

    // Insert or update test user
    await connection.execute(
      `INSERT INTO users (id, name, email, password, role, emailVerified, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, NOW(), NOW(), NOW())
       ON DUPLICATE KEY UPDATE 
       password = VALUES(password),
       role = VALUES(role),
       updated_at = NOW()`,
      ['test-user-001', 'Test User', 'testuser@example.com', testUserPassword, 'USER']
    );

    console.log('Test user created/updated successfully');

    // Verify users
    const [users] = await connection.execute(
      'SELECT id, name, email, role FROM users WHERE email IN (?, ?)',
      ['admin@hakimerad.health.et', 'testuser@example.com']
    );

    console.log('Users in database:', users);

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

seedUsers().catch(console.error);
