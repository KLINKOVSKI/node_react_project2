import express from 'express';
import { createPlaylist, getPlaylistsByUserId } from '../models/playlist.model';

const router = express.Router();

// Create a new playlist
router.post('/', async (req, res) => {
  try {
    const { user_id, name, cover_image_url } = req.body;
    const playlist = await createPlaylist({ user_id, name, cover_image_url });
    res.status(201).json(playlist);
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: 'Error creating playlist' });
  }
});

// Get playlists by user ID
router.get('/user/:user_id', async (req, res) => {
  try {
    const playlists = await getPlaylistsByUserId(Number(req.params.user_id));
    res.json(playlists);
  } catch (error) {
    console.error('Error retrieving playlists:', error);
    res.status(500).json({ error: 'Error retrieving playlists' });
  }
});

export default router;
