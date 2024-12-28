import axios from 'axios';
import { config } from '../config';
import { Track, SearchParams } from '../types/track';
import { NotFoundError } from '../utils/errors';

export class TrackService {
  private baseUrl = config.api.jamendo.baseUrl;
  private apiKey = config.api.jamendo.key;

  public async search(params: SearchParams): Promise<Track[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/tracks/`, {
        params: {
          client_id: this.apiKey,
          format: 'json',
          limit: params.limit || 20,
          namesearch: params.query || undefined,
          tags: params.genre || undefined,
          include: 'musicinfo',
          audioformat: 'mp32'
        }
      });

      return response.data.results.map(this.mapTrackResponse);
    } catch (error) {
      console.error('Error searching tracks:', error);
      return [];
    }
  }

  public async getTrack(id: string): Promise<Track> {
    try {
      const response = await axios.get(`${this.baseUrl}/tracks/${id}`, {
        params: {
          client_id: this.apiKey,
          format: 'json',
          include: 'musicinfo',
          audioformat: 'mp32'
        }
      });

      if (!response.data.results.length) {
        throw new NotFoundError('Track not found');
      }

      return this.mapTrackResponse(response.data.results[0]);
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      console.error('Error fetching track:', error);
      throw new NotFoundError('Track not found');
    }
  }

  public async getGenres(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/tags`, {
        params: {
          client_id: this.apiKey,
          format: 'json',
          type: 'genre'
        }
      });

      return response.data.results.map((tag: any) => tag.name);
    } catch (error) {
      console.error('Error fetching genres:', error);
      return [];
    }
  }

  private mapTrackResponse(track: any): Track {
    return {
      id: track.id,
      name: track.name,
      artist_name: track.artist_name,
      album_name: track.album_name,
      duration: track.duration,
      image: track.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300',
      audio: track.audio,
      genre: track.tags?.[0],
      plays: track.stats?.playback_total || 0
    };
  }
}