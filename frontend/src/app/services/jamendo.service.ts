import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicApiService {
  private apiUrl = 'https://api.jamendo.com/v3.0/tracks';
  private clientId = '709fa152'; // Replace with your Jamendo API client ID

  constructor(private http: HttpClient) {}

  getMusicTracks(limit: number = 30): Observable<any> {
    return this.http.get(`${this.apiUrl}?client_id=${this.clientId}&limit=${limit}`);
  }
}

