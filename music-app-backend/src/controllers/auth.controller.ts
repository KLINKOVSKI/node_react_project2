import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, hashPassword } from '../models/user.model';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Secret key for JWT (keep this in a secure environment variable)
const JWT_SECRET = 'your_jwt_secret';

// User registration
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const password_hash = await hashPassword(password);
    const newUser = await createUser({ username, email, password_hash });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// User login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid email or password' });
      return; 
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

export default router;
