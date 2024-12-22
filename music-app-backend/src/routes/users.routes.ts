import express, { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../models/user.model';
import { authMiddleware } from '../Middleware/auth.middleware';
import { User } from '../types/user';

const router = express.Router();

// Create a new user
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password_hash } = req.body;
    const user = await createUser({ username, email, password_hash });
    res.status(201).json(user); // Send a response, don't return it
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Get user by email (protected)
router.get('/:email', (req: Request, res: Response) => {
  const user = res.locals.user; // Access user from res.locals
  console.log('Authenticated user:', user);
  
  res.send({ 
    message: `Fetching user with email: ${req.params.email}`,
    user,
  });
});

export default router;
