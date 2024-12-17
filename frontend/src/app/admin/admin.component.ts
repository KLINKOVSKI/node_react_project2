import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private router: Router) { }

  // Logout and return to the login page
  logout(): void {
    localStorage.removeItem('authToken'); // Remove any auth token
    this.router.navigate(['/login']);
  }
}
