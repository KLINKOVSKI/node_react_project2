import { Router } from 'express';
import { AuthService } from '../services/auth.service';

const router = Router();
const authService = new AuthService();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await authService.register(email, password, name);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

export const authRouter = router;