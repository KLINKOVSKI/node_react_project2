export class SearchController {
  private query: string = '';
  private tracks: any[] = [];
  private loading: boolean = false;

  constructor(private musicService, private playerService) {
    'ngInject';
  }

  async search() {
    if (!this.query) {
      this.tracks = [];
      return;
    }

    this.loading = true;
    try {
      this.tracks = await this.musicService.searchTracks(this.query);
    } catch (error) {
      console.error('Search failed:', error);
      this.tracks = [];
    } finally {
      this.loading = false;
    }
  }

  playTrack(track: any) {
    this.playerService.setTrack({
      id: track.id,
      title: track.name,
      artist: track.artist_name,
      url: track.audio,
      artwork: track.image
    });
    this.playerService.setQueue(this.tracks.map(t => ({
      id: t.id,
      title: t.name,
      artist: t.artist_name,
      url: t.audio,
      artwork: t.image
    })));
  }
}