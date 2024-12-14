const API_KEY = 'ba08b20a';
const BASE_URL = 'https://api.jamendo.com/v3.0';

export const fetchTracks = async (limit = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tracks/?client_id=${API_KEY}&format=json&limit=${limit}&include=musicinfo&audioformat=mp32`
    );
    const data = await response.json();
    return data.results.map((track: any) => ({
      id: track.id,
      name: track.name,
      duration: track.duration,
      artist_name: track.artist_name,
      album_name: track.album_name,
      image: track.image,
      audio: track.audio
    }));
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return [];
  }
};