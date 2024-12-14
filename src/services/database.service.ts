import Dexie from 'dexie';

export class DatabaseService extends Dexie {
  users: Dexie.Table<any, number>;
  playlists: Dexie.Table<any, number>;
  tracks: Dexie.Table<any, number>;
  playlistTracks: Dexie.Table<any, number>;

  constructor() {
    super('MusicDB');
    
    this.version(1).stores({
      users: '++id, email',
      playlists: '++id, userId',
      tracks: '++id, title, artist',
      playlistTracks: '++id, playlistId, trackId'
    });
  }
}