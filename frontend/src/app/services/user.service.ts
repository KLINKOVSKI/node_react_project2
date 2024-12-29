import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any = null;

  constructor() {
    // Retrieve stored user data from local storage or wherever you're saving the session
    this.user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  // Set the logged-in user information
  setUser(user: any) {
    this.user = user;
    localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store in localStorage (or you could use sessionStorage)
  }

  // Get the logged-in user information
  getUser() {
    return this.user;
  }

  // Clear the logged-in user (for logout functionality)
  clearUser() {
    this.user = null;
    localStorage.removeItem('loggedInUser');
  }
}
