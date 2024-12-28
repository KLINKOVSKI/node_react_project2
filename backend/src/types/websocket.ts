export enum WebSocketEventType {
  TRACK_PROGRESS = 'TRACK_PROGRESS',
  PLAYLIST_UPDATE = 'PLAYLIST_UPDATE',
  USER_ACTIVITY = 'USER_ACTIVITY'
}

export interface WebSocketMessage {
  type: WebSocketEventType;
  data: any;
}

export interface TrackProgressData {
  trackId: string;
  currentTime: number;
  duration: number;
}

export interface PlaylistUpdateData {
  playlistId: string;
  action: 'add' | 'remove' | 'update';
  trackId?: string;
}