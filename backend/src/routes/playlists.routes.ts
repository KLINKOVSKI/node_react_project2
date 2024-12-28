import { Router } from 'express';
import { PlaylistService } from '../services/playlist.service';

const router = Router();
const playlistService = new PlaylistService();

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params; // Fetch the userId from route params
    const playlists = await playlistService.getUserPlaylists(userId);
    res.json(playlists);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, name, description } = req.body; // Fetch userId, name, and description from the request body
    const playlist = await playlistService.createPlaylist(userId, { name, description }); // Pass userId explicitly
    res.status(201).json(playlist);
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
});

export const playlistRouter = router;
export default router;
