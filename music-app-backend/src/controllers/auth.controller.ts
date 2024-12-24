import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/user.model';

const router = express.Router();

// Secret key for JWT (store securely in an environment variable in production)
const JWT_SECRET = 'c1a2r3l4k5l6i7n8k9';

// User registration
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    // Create the new user
    const newUser = await createUser({ username, email, password }); // Store the plain password as provided
    res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, username, email } });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// User login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await findUserByEmail(email);
    if (!user || user.password_hash !== password) { // Plain text password comparison
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

export default router;
