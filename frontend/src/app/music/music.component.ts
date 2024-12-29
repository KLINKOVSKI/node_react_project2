import { Component, OnInit } from '@angular/core';
import { MusicApiService } from '../services/jamendo.service';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage
  ],
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  tracks: any[] = [];
  errorMessage: string = '';

  constructor(private musicApiService: MusicApiService) {}

  ngOnInit(): void {
    this.musicApiService.getMusicTracks().subscribe({
      next: (response) => {
        this.tracks = response.results;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load music tracks.';
        console.error(error);
      }
    });
  }
}
