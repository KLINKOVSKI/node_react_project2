export class PlayerService {
  private currentTrack: any = null;
  private queue: any[] = [];
  private isPlaying: boolean = false;
  private volume: number = 1;

  constructor() {
    'ngInject';
  }

  setTrack(track: any): void {
    this.currentTrack = track;
    this.isPlaying = true;
  }

  setQueue(tracks: any[]): void {
    this.queue = tracks;
  }

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
  }

  setVolume(volume: number): void {
    this.volume = volume;
  }

  nextTrack(): void {
    const currentIndex = this.queue.findIndex(track => track.id === this.currentTrack?.id);
    const nextTrack = this.queue[currentIndex + 1];
    if (nextTrack) {
      this.setTrack(nextTrack);
    }
  }

  previousTrack(): void {
    const currentIndex = this.queue.findIndex(track => track.id === this.currentTrack?.id);
    const previousTrack = this.queue[currentIndex - 1];
    if (previousTrack) {
      this.setTrack(previousTrack);
    }
  }

  getCurrentTrack() {
    return this.currentTrack;
  }

  getQueue() {
    return this.queue;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  getVolume() {
    return this.volume;
  }
}