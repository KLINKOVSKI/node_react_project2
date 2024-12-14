export class PlaylistController {
  private playlist: any = null;
  private tracks: any[] = [];

  constructor(
    private playlistService,
    private playerService,
    private $stateParams,
    private $state
  ) {
    'ngInject';
  }

  async $onInit() {
    if (!this.$stateParams.id) {
      this.$state.go('library');
      return;
    }
    await this.loadPlaylist();
  }

  async loadPlaylist() {
    try {
      this.playlist = await this.playlistService.getPlaylistById(this.$stateParams.id);
      if (this.playlist) {
        this.tracks = await this.playlistService.getPlaylistTracks(this.playlist.id);
      }
    } catch (error) {
      console.error('Error loading playlist:', error);
      this.$state.go('library');
    }
  }

  playTrack(track: any) {
    this.playerService.setTrack(track);
    this.playerService.setQueue(this.tracks);
  }
}