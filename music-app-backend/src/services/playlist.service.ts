import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import { Playlist, CreatePlaylistDto, UpdatePlaylistDto } from '../types/playlist';
import { TrackService } from './track.service';
import { NotFoundError, UnauthorizedError } from '../utils/errors';
import pool from '../database/database';

export class PlaylistService {
  private db: Pool;
  private trackService: TrackService;

  constructor() {
    this.db = pool;
    this.trackService = new TrackService();
  }

  public async getUserPlaylists(userId: string): Promise<Playlist[]> {
    const result = await this.db.query(
      'SELECT * FROM playlists WHERE owner_id = $1 ORDER BY created_at DESC',
      [this.getCurrentUserId()]
    );
    return result.rows;
  }

 public async createPlaylist(data: CreatePlaylistDto, p0: { name: any; description: any; }): Promise<Playlist> {
  const id = uuidv4(); // Generate a unique ID for the playlist
  const ownerId = this.getCurrentUserId(); // Retrieve the current user's ID
  const now = new Date(); // Timestamp for creation and update

  // Validate that name exists
  if (!data.name) {
    throw new Error('Playlist name is required.');
  }

  // Insert playlist into the database
  const result = await this.db.query(
    'INSERT INTO playlists (id, name, description, owner_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [id, data.name, data.description || null, ownerId, now, now] // Use `null` if no description is provided
  );

  // Check if the query succeeded
  if (result.rows.length === 0) {
    throw new Error('Failed to create playlist.');
  }

  // Return the created playlist
  return result.rows[0];
}

  

  public async getPlaylist(id: string): Promise<Playlist> {
    const result = await this.db.query(
      'SELECT * FROM playlists WHERE id = $1',
      [id]
    );

    if (!result.rows.length) {
      throw new NotFoundError('Playlist not found');
    }

    const playlist = result.rows[0];
    const tracks = await this.getPlaylistTracks(id);
    return { ...playlist, tracks };
  }

  public async updatePlaylist(id: string, data: UpdatePlaylistDto): Promise<Playlist> {
    const playlist = await this.getPlaylist(id);
    this.validateOwnership(playlist);

    const result = await this.db.query(
      'UPDATE playlists SET name = $1, description = $2, updated_at = $3 WHERE id = $4 RETURNING *',
      [data.name || playlist.name, data.description || playlist.description, new Date(), id]
    );

    return result.rows[0];
  }

  public async deletePlaylist(id: string): Promise<void> {
    const playlist = await this.getPlaylist(id);
    this.validateOwnership(playlist);

    await this.db.query('DELETE FROM playlists WHERE id = $1', [id]);
  }

  public async addTrackToPlaylist(playlistId: string, trackId: string): Promise<Playlist> {
    const playlist = await this.getPlaylist(playlistId);
    this.validateOwnership(playlist);

    const track = await this.trackService.getTrack(trackId);
    await this.db.query(
      'INSERT INTO playlist_tracks (playlist_id, track_id, added_at, added_by) VALUES ($1, $2, $3, $4)',
      [playlistId, trackId, new Date(), this.getCurrentUserId()]
    );

    return this.getPlaylist(playlistId);
  }

  public async removeTrackFromPlaylist(playlistId: string, trackId: string): Promise<Playlist> {
    const playlist = await this.getPlaylist(playlistId);
    this.validateOwnership(playlist);

    await this.db.query(
      'DELETE FROM playlist_tracks WHERE playlist_id = $1 AND track_id = $2',
      [playlistId, trackId]
    );

    return this.getPlaylist(playlistId);
  }

  private async getPlaylistTracks(playlistId: string) {
    const result = await this.db.query(
      'SELECT * FROM playlist_tracks WHERE playlist_id = $1 ORDER BY added_at DESC',
      [playlistId]
    );
    return Promise.all(result.rows.map(async (row) => ({
      ...(await this.trackService.getTrack(row.track_id)),
      added_at: row.added_at,
      added_by: row.added_by
    })));
  }

  private validateOwnership(playlist: Playlist) {
    if (playlist.owner_id !== this.getCurrentUserId()) {
      throw new UnauthorizedError('You do not have permission to modify this playlist');
    }
  }

  private getCurrentUserId(): string {
    // This would normally come from the JWT token in the request
    // For now, we'll return a placeholder
    return 'current-user-id';
  }
}

