export class HomeController {
  private greeting: string;
  private recentlyPlayed: any[];
  private popularTracks: any[];

  constructor(private jamendoService, private playerService, private authService, private $state) {
    'ngInject';
    this.greeting = this.getGreeting();
    this.recentlyPlayed = [];
    this.popularTracks = [];
  }

  async $onInit() {
    if (!this.authService.isAuthenticated()) {
      this.$state.go('login');
      return;
    }

    try {
      this.popularTracks = await this.jamendoService.getTracks(10);
      this.recentlyPlayed = [
        {
          id: 1,
          title: 'Peaceful Piano',
          description: 'Relax and indulge with beautiful piano pieces',
          imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop',
        },
        {
          id: 2,
          title: 'Deep Focus',
          description: 'Keep calm and focus with ambient and post-rock music',
          imageUrl: 'https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=300&h=300&fit=crop',
        },
        {
          id: 3,
          title: 'Instrumental Study',
          description: 'Focus with soft study music in the background.',
          imageUrl: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=300&h=300&fit=crop',
        },
        {
          id: 4,
          title: 'Focus Flow',
          description: 'Up tempo instrumental hip hop beats',
          imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
        }
      ];
    } catch (error) {
      console.error('Error loading tracks:', error);
    }
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  }

  playTrack(track: any): void {
    this.playerService.setTrack({
      id: track.id,
      title: track.name,
      artist: track.artist_name,
      url: track.audio,
      artwork: track.image
    });
    this.playerService.setQueue(this.popularTracks.map(t => ({
      id: t.id,
      title: t.name,
      artist: t.artist_name,
      url: t.audio,
      artwork: t.image
    })));
  }

  playPlaylist(playlist: any): void {
    // Implementation for playing playlists will be added later
  }
}