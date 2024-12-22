import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'klinkify',
  password: 'KLINKOV11',
  port: 5432,
});

// Create a new user
export const createUser = async ({ username, email, password_hash }: { username: string, email: string, password_hash: string }) => {
  const result = await pool.query(
    'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
    [username, email, password_hash]
  );
  return result.rows[0];
};

// Hash the password
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const findUserByEmail = async (email: string) => {
  const query = `SELECT * FROM users WHERE email = $1;`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
