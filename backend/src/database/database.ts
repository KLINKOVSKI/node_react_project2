import { Pool } from 'pg';
import { config } from '../config';

const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.name,
  password: config.db.password,
  port: config.db.port,
});

export const setupDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database');
    client.release();
    return pool;
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
};

export default pool;