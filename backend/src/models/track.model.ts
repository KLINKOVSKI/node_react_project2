import pool from '../database/database';

export interface Track {
  id?: number;
  playlist_id: number;
  title: string;
  artist: string;
  url: string;
}

export const addTrackToPlaylist = async (track: Track) => {
  const query = `
    INSERT INTO tracks (playlist_id, title, artist, url)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [track.playlist_id, track.title, track.artist, track.url];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getTracksByPlaylistId = async (playlist_id: number) => {
  const query = `SELECT * FROM tracks WHERE playlist_id = $1;`;
  const result = await pool.query(query, [playlist_id]);
  return result.rows;
};
