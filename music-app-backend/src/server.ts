// In server.ts

import express, { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import { errorHandler } from './Middleware/errorHandler.middleware';
import { authMiddleware } from './Middleware/auth.middleware';
import userRoutes from './routes/users.routes';
import playlistRoutes from './routes/playlists.routes';
import trackRoutes from './routes/tracks.routes';
import musicRoutes from './routes/music.routes';
import { createTables } from './models/dbSetup'; // Correct import
import { fetchTracks } from './services/jamendo.service';


dotenv.config(); // Load environment variables

// Initialize Express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// Initialize database
createTables()  // Call the function to create tables
    .then(() => console.log('✅ Database setup completed'))
    .catch((err) => console.error('❌ Database setup error:', err.message));

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Music App API!');
});

app.get('/api/tracks', async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 50;
    const tracks = await fetchTracks(limit);
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
});

// Public routes
app.use('/api/music', musicRoutes);
app.use('/api/users', userRoutes);

// Secured routes
app.use('/api/protected/playlists', authMiddleware, playlistRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler for undefined routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
