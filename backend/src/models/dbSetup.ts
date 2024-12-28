import pool from '../database/database';

const createTables = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
                                       id SERIAL PRIMARY KEY,
                                       username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

    CREATE TABLE IF NOT EXISTS playlists (
                                           id SERIAL PRIMARY KEY,
                                           user_id INT REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(100) NOT NULL,
      cover_image_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

    CREATE TABLE IF NOT EXISTS tracks (
                                        id SERIAL PRIMARY KEY,
                                        playlist_id INT REFERENCES playlists(id) ON DELETE CASCADE,
      title VARCHAR(100) NOT NULL,
      artist VARCHAR(100) NOT NULL,
      url VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  `;

  try {
    // Create tables
    await pool.query(createTableQuery);
    console.log('Database tables created successfully');

    // Insert admin user
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin';

    const createAdminQuery = `
      INSERT INTO users (username, email, password, created_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      ON CONFLICT (email) DO NOTHING;
    `;

    await pool.query(createAdminQuery, ['admin', adminEmail, adminPassword]);
    console.log('Default admin user created');
  } catch (error) {
    console.error('Error creating tables or admin user:', error);
  } finally {
    await pool.end();
  }
};

export { createTables };