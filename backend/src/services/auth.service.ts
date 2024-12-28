import pool from '../database/database';

export class AuthService {
  // Login user
  async login(email: string, password: string) {
    const query = 'SELECT * FROM users WHERE email = $1 AND password_hash = $2';
    const values = [email, password];

    const { rows } = await pool.query(query, values);
    const user = rows[0];

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Return user data without the password hash
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.created_at
    };
  }

  // Register user
  async register(username: string, email: string, password: string) {
    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const checkUserValues = [email];

    const { rows: existingUsers } = await pool.query(checkUserQuery, checkUserValues);
    if (existingUsers.length > 0) {
      throw new Error('User already exists');
    }

    const insertQuery = `
      INSERT INTO users (username, email, password_hash) 
      VALUES ($1, $2, $3) RETURNING id, username, email, created_at
    `;
    const insertValues = [username, email, password];

    const { rows } = await pool.query(insertQuery, insertValues);
    const newUser = rows[0];

    // Return user data without the password hash
    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.created_at
    };
  }
}
