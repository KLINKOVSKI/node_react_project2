import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'klinkify',
  password: 'KLINKOV11',
  port: 5432,
});

// Create a new user
export const createUser = async ({ username, email, password }: { username: string, email: string, password: string }) => {
  const result = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, password] // Save the plain-text password directly
  );
  return result.rows[0];
};

// Find a user by email
export const findUserByEmail = async (email: string) => {
  const query = 'SELECT * FROM users WHERE email = $1;';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
