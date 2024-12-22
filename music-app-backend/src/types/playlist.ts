import { PlaylistTrack } from './track';

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
  tracks: PlaylistTrack[];
  image?: string;
}

export interface CreatePlaylistDto {
  name: string;
  description?: string;
}

export interface UpdatePlaylistDto {
  name?: string;
  description?: string;
}