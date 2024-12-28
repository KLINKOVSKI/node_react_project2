import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/users.routes';
import playlistRoutes from './routes/playlists.routes';
import trackRoutes from './routes/tracks.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/tracks', trackRoutes);

export default app;
