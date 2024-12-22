import express, { Request, Response } from 'express';
import { addTrackToPlaylist, getTracksByPlaylistId } from '../models/track.model';

const router = express.Router();

// Add a track to a playlist
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { playlist_id, title, artist, url } = req.body;
    const track = await addTrackToPlaylist({ playlist_id, title, artist, url });
    res.status(201).json(track); // Send response, don't return it
  } catch (error) {
    console.error('Error adding track:', error);
    res.status(500).json({ error: 'Error adding track' });
  }
});

// Get tracks by playlist ID
router.get('/playlist/:playlist_id', async (req: Request<{ playlist_id: string }>, res: Response): Promise<void> => {
  try {
    const tracks = await getTracksByPlaylistId(Number(req.params.playlist_id));
    res.json(tracks);
  } catch (error) {
    console.error('Error retrieving tracks:', error);
    res.status(500).json({ error: 'Error retrieving tracks' });
  }
});

export default router;
