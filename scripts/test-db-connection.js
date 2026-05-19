const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: Number(process.env.MYSQL_PORT) || 3307,
      user: process.env.MYSQL_USER || 'hakimerad_user',
      password: process.env.MYSQL_PASSWORD || 'hakimerad_pass',
      database: process.env.MYSQL_DATABASE || 'hakimerad_db',
    });

    console.log('Database connection successful!');
    
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('Query test successful:', rows);

    await connection.end();
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw error;
  }
}

testConnection().catch(console.error);
