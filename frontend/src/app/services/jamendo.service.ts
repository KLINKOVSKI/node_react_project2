import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicApiService {
  private API_BASE = 'https://api.jamendo.com/v3.0';
  private CLIENT_ID = 'ba08b20a';

  constructor(private http: HttpClient) {}

  async fetchTracks(limit = 50): Promise<any[]> {
    const response = await fetch(
      `${this.API_BASE}/tracks/?client_id=${this.CLIENT_ID}&format=json&limit=${limit}&include=musicinfo&audioformat=mp32`
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
      audio: track.audio,
    }));
  }
}

