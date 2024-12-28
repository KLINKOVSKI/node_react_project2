import { Router } from 'express';
import { fetchTracks } from '../services/jamendo.service';

const router = Router();


router.get('/tracks', async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const tracks = await fetchTracks(Number(limit));
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { query, limit = 20 } = req.query;
    const tracks = await fetchTracks(Number(query));
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

export const musicRouter = router;
export default router;