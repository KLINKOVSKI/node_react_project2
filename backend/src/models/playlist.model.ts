import pool from '../database/database';

export interface Playlist {
  id?: number;
  user_id: number;
  name: string;
  cover_image_url?: string;
}

export const createPlaylist = async (playlist: Playlist) => {
  const query = `
    INSERT INTO playlists (user_id, name, cover_image_url)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [playlist.user_id, playlist.name, playlist.cover_image_url];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getPlaylistsByUserId = async (user_id: number) => {
  const query = `SELECT * FROM playlists WHERE user_id = $1;`;
  const result = await pool.query(query, [user_id]);
  return result.rows;
};
