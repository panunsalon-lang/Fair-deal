import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

// Parse DATABASE_URL: mysql://user:password@host:port/database?ssl=...
const url = new URL(dbUrl.replace('mysql://', 'http://'));
const host = url.hostname;
const user = url.username;
const password = decodeURIComponent(url.password);
const database = url.pathname.substring(1).split('?')[0];

console.log('Connecting to database...');

const port = url.port || 3306;
const connection = await mysql.createConnection({
  host,
  port,
  user,
  password,
  database,
  ssl: {
    rejectUnauthorized: false
  }
});

const adminUsername = 'royalsilver123';
const adminPassword = 'royaladmin@123321';
const adminEmail = 'admin@royalsilver.com';

// Hash the password
const passwordHash = await bcrypt.hash(adminPassword, 10);

try {
  // Check if admin exists
  const [existing] = await connection.execute(
    'SELECT id FROM adminCredentials WHERE username = ?',
    [adminUsername]
  );

  if (existing.length > 0) {
    // Update existing admin
    await connection.execute(
      'UPDATE adminCredentials SET passwordHash = ?, email = ? WHERE username = ?',
      [passwordHash, adminEmail, adminUsername]
    );
    console.log('✓ Admin credentials updated successfully');
  } else {
    // Insert new admin
    await connection.execute(
      'INSERT INTO adminCredentials (username, passwordHash, email, active) VALUES (?, ?, ?, 1)',
      [adminUsername, passwordHash, adminEmail]
    );
    console.log('✓ Admin credentials created successfully');
  }

  console.log('\n✓ Admin Login Credentials:');
  console.log(`  Username: ${adminUsername}`);
  console.log(`  Password: ${adminPassword}`);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
} finally {
  await connection.end();
}
