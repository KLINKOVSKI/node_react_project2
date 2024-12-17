import axios from 'axios';

const JAMENDO_API_KEY = 'ba08b20a';
const BASE_URL = 'https://api.jamendo.com/v3.0';

export interface JamendoTrack {
  id: string;
  name: string;
  artist_name: string;
  audio: string;
  image: string;
  duration: number;
}

export const getMusicTracks = async (limit = 20): Promise<JamendoTrack[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/tracks/`, {
      params: {
        client_id: JAMENDO_API_KEY,
        format: 'json',
        limit,
        include: 'musicinfo',
        audioformat: 'mp32',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return [];
  }
};