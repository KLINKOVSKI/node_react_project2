import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LastfmService {
  private apiUrl = 'http://ws.audioscrobbler.com/2.0/';
  private apiKey = '74c4e8b15c8e28c1b1b249053fb609e0'; // Your API key

  constructor(private http: HttpClient) {}

  getTopTracks(limit: number = 30): Observable<any> {
    return this.http.get(this.apiUrl, {
      params: {
        method: 'chart.gettoptracks',
        api_key: this.apiKey,
        format: 'json',
        limit: limit.toString()
      }
    });
  }
}
