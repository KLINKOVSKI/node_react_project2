const API_BASE = 'https://api.jamendo.com/v3.0';
const CLIENT_ID = 'ba08b20a';

export const fetchTracks = async (limit = 50) => {
  const response = await fetch(
    `${API_BASE}/tracks/?client_id=${CLIENT_ID}&format=json&limit=${limit}&include=musicinfo&audioformat=mp32`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch tracks from Jamendo');
  }
  const data = await response.json();
  return data.results.map((track: any) => ({
    id: track.id,
    name: track.name,
    duration: track.duration,
    artist_name: track.artist_name,
    album_name: track.album_name,
    image: track.album_image,
    audio: track.audio
  }));
};