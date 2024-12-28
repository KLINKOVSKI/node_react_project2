import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule,CommonModule], // Add HttpClientModule here
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showLoginForm: boolean = false; // Flag to toggle between app page and login form

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    const credentials = { username: this.username, password: this.password };

    this.http.post('http://localhost:3000/api/login', credentials).subscribe({
      next: (response: any) => {
        if (response.success) {
          // Redirect to a dashboard or music page
          this.router.navigate(['/music']);
        } else {
          this.errorMessage = response.message || 'Invalid credentials';
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'An error occurred. Please try again.';
      },
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
