import Dexie, { type Table } from 'dexie';

export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface Playlist {
  id?: number;
  userId: number;
  name: string;
  createdAt: Date;
}

export interface Track {
  id?: number;
  title: string;
  artist: string;
  url: string;
  duration: number;
  artwork?: string;
}

export interface PlaylistTrack {
  id?: number;
  playlistId: number;
  trackId: number;
  order: number;
}

export class MusicDB extends Dexie {
  users!: Table<User>;
  playlists!: Table<Playlist>;
  tracks!: Table<Track>;
  playlistTracks!: Table<PlaylistTrack>;

  constructor() {
    super('MusicDB');
    this.version(1).stores({
      users: '++id, email',
      playlists: '++id, userId',
      tracks: '++id, title, artist',
      playlistTracks: '++id, playlistId, trackId',
    });
  }
}

export const db = new MusicDB();