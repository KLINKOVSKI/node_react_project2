export class LibraryController {
  private playlists: any[] = [];
  private tracks: any[] = [];
  private loading: boolean = true;

  constructor(
    private databaseService,
    private jamendoService,
    private playerService,
    private authService,
    private $state
  ) {
    'ngInject';
  }

  async $onInit() {
    const user = this.authService.getUser();
    if (!user) {
      this.$state.go('login');
      return;
    }

    try {
      this.playlists = await this.databaseService.playlists
        .where('userId')
        .equals(user.id)
        .toArray();

      this.tracks = await this.jamendoService.getTracks(20);
      this.loading = false;
    } catch (error) {
      console.error('Error loading library:', error);
      this.loading = false;
    }
  }

  async createPlaylist() {
    const name = prompt('Enter playlist name:');
    if (name) {
      try {
        const user = this.authService.getUser();
        const playlist = {
          userId: user.id,
          name,
          createdAt: new Date()
        };
        
        const id = await this.databaseService.playlists.add(playlist);
        this.$state.go('playlist', { id });
      } catch (error) {
        console.error('Error creating playlist:', error);
      }
    }
  }

  openPlaylist(playlist: any) {
    this.$state.go('playlist', { id: playlist.id });
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