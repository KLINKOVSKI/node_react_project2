export class PlaylistService {
  constructor(private databaseService, private $q) {
    'ngInject';
  }

  async createPlaylist(userId: number, name: string) {
    try {
      const playlist = {
        userId,
        name,
        createdAt: new Date()
      };
      
      const id = await this.databaseService.playlists.add(playlist);
      return { ...playlist, id };
    } catch (error) {
      console.error('Error creating playlist:', error);
      throw new Error('Failed to create playlist');
    }
  }

  async getUserPlaylists(userId: number) {
    try {
      return await this.databaseService.playlists
        .where('userId')
        .equals(userId)
        .reverse()
        .sortBy('createdAt');
    } catch (error) {
      console.error('Error fetching playlists:', error);
      throw new Error('Failed to fetch playlists');
    }
  }

  async addTrackToPlaylist(playlistId: number, track: any) {
    try {
      // Get the highest order number for the playlist
      const lastTrack = await this.databaseService.playlistTracks
        .where('playlistId')
        .equals(playlistId)
        .reverse()
        .first();

      const order = lastTrack ? lastTrack.order + 1 : 0;

      // First, ensure the track exists in our tracks table
      const trackId = await this.databaseService.tracks.add({
        title: track.name,
        artist: track.artist_name,
        url: track.audio,
        duration: track.duration,
        artwork: track.image
      });

      // Then add the track to the playlist
      await this.databaseService.playlistTracks.add({
        playlistId,
        trackId,
        order
      });

      return true;
    } catch (error) {
      console.error('Error adding track to playlist:', error);
      throw new Error('Failed to add track to playlist');
    }
  }

  async removeTrackFromPlaylist(playlistId: number, trackId: number) {
    try {
      await this.databaseService.playlistTracks
        .where({ playlistId, trackId })
        .delete();
      return true;
    } catch (error) {
      console.error('Error removing track from playlist:', error);
      throw new Error('Failed to remove track from playlist');
    }
  }

  async getPlaylistTracks(playlistId: number) {
    try {
      const playlistTracks = await this.databaseService.playlistTracks
        .where('playlistId')
        .equals(playlistId)
        .sortBy('order');

      const tracks = await Promise.all(
        playlistTracks.map(async (pt) => {
          const track = await this.databaseService.tracks.get(pt.trackId);
          return { ...track, playlistTrackId: pt.id };
        })
      );

      return tracks;
    } catch (error) {
      console.error('Error fetching playlist tracks:', error);
      throw new Error('Failed to fetch playlist tracks');
    }
  }

  async deletePlaylist(playlistId: number) {
    try {
      // Delete all tracks in the playlist
      await this.databaseService.playlistTracks
        .where('playlistId')
        .equals(playlistId)
        .delete();

      // Delete the playlist
      await this.databaseService.playlists.delete(playlistId);
      return true;
    } catch (error) {
      console.error('Error deleting playlist:', error);
      throw new Error('Failed to delete playlist');
    }
  }

  async updatePlaylistName(playlistId: number, name: string) {
    try {
      await this.databaseService.playlists.update(playlistId, { name });
      return true;
    } catch (error) {
      console.error('Error updating playlist:', error);
      throw new Error('Failed to update playlist');
    }
  }
}