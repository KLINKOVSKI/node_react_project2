import { Component, OnInit } from '@angular/core';
import { MusicApiService } from '../services/jamendo.service';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  standalone: true,
  imports: [NgForOf, NgIf, NgOptimizedImage, FormsModule],
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  tracks: any[] = [];
  filteredTracks: any[] = [];
  errorMessage: string | null = null;

  currentTrack: any = null;
  currentTrackIndex: number = 0;
  audio = new Audio();
  isPlaying = false;
  volume = 0.5;

  searchQuery: string = ''; // Variable for searching
  playlists: any[] = []; // Playlist array

  constructor(private musicApiService: MusicApiService) {}

  ngOnInit(): void {
    this.fetchTopTracks();
    this.audio.volume = this.volume; // Set initial volume
  }

  async fetchTopTracks(): Promise<void> {
    try {
      this.tracks = await this.musicApiService.fetchTracks(50);
      this.filteredTracks = this.tracks; // Initialize with all tracks
    } catch (error) {
      this.errorMessage = 'Failed to load music tracks.';
      console.error(error);
    }
  }

  // Search tracks by name
  searchTracks(): void {
    this.filteredTracks = this.tracks.filter(track =>
      track.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Play selected track from the list or playlist
  playTrack(track: any, index: number): void {
    if (this.currentTrack?.id === track.id && this.isPlaying) {
      this.togglePlay(); // Pause if the same track is clicked
      return;
    }

    this.currentTrack = track;
    this.currentTrackIndex = index;
    this.audio.src = track.audio;
    this.audio.play();
    this.isPlaying = true;
  }

  togglePlay(): void {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  nextTrack(): void {
    if (this.currentTrackIndex < this.tracks.length - 1) {
      this.playTrack(this.tracks[this.currentTrackIndex + 1], this.currentTrackIndex + 1);
    }
  }

  prevTrack(): void {
    if (this.currentTrackIndex > 0) {
      this.playTrack(this.tracks[this.currentTrackIndex - 1], this.currentTrackIndex - 1);
    }
  }

  adjustVolume(): void {
    this.audio.volume = this.volume;
  }

  // Create a new playlist
  createPlaylist(): void {
    const playlistName = prompt('Enter playlist name:');
    if (playlistName) {
      this.playlists.push({ name: playlistName, tracks: [] });
      alert('Playlist created!');
    }
  }

  // Add track to a selected playlist
  selectPlaylist(event: any, track: any): void {
    const playlistName = event.target.value;
    if (playlistName) {
      const playlist = this.playlists.find(p => p.name === playlistName);
      if (playlist) {
        playlist.tracks.push(track);
        alert(`${track.name} added to ${playlistName}`);
      }
    }
  }
}
