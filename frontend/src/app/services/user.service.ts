import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api'; // Update to match your backend API

  constructor(private http: HttpClient) {}

  validateUser(username: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/login`, { username, password });
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
