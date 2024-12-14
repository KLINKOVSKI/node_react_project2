import axios from 'axios';

export class MusicService {
  private readonly API_KEY = '1d310544';
  private readonly BASE_URL = 'https://api.jamendo.com/v3.0';

  constructor(private $http) {
    'ngInject';
  }

  async getTracks(limit = 20) {
    try {
      const response = await this.$http.get(`${this.BASE_URL}/tracks/`, {
        params: {
          client_id: this.API_KEY,
          format: 'json',
          limit,
          include: 'musicinfo',
          audioformat: 'mp32'
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching tracks:', error);
      return [];
    }
  }

  async searchTracks(query: string, limit = 20) {
    try {
      const response = await this.$http.get(`${this.BASE_URL}/tracks/`, {
        params: {
          client_id: this.API_KEY,
          format: 'json',
          limit,
          search: query,
          include: 'musicinfo',
          audioformat: 'mp32'
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching tracks:', error);
      return [];
    }
  }
}