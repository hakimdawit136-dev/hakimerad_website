const mysql = require('mysql2/promise');

async function verifyUsers() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3307,
    user: process.env.MYSQL_USER || 'hakimerad_user',
    password: process.env.MYSQL_PASSWORD || 'hakimerad_pass',
    database: process.env.MYSQL_DATABASE || 'hakimerad_db',
  });

  try {
    console.log('Connected to database');

    const [users] = await connection.execute(
      'SELECT id, name, email, role, password FROM users WHERE email IN (?, ?)',
      ['admin@hakimerad.health.et', 'testuser@example.com']
    );

    console.log('Users in database:');
    console.log(JSON.stringify(users, null, 2));

    if (users.length === 0) {
      console.log('ERROR: No users found in database!');
    } else {
      console.log(`Found ${users.length} users`);
    }
  } catch (error) {
    console.error('Error verifying users:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

verifyUsers().catch(console.error);
