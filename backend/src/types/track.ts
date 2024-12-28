export interface Track {
  id: string;
  name: string;
  artist_name: string;
  album_name?: string;
  duration: number;
  image: string;
  audio: string;
  genre?: string;
  plays?: number;
}

export interface PlaylistTrack extends Track {
  added_at: Date;
  added_by: string;
}

export interface SearchParams {
  query?: string;
  genre?: string;
  limit?: number;
  offset?: number;
}