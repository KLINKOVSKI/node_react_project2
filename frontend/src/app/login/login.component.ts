import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms'; // Import RegisterComponent to access accounts

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ]
})
export class LoginComponent {
  usernameOrEmail: string = ''; // Username or email input
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    const trimmedUsernameOrEmail = this.usernameOrEmail.trim();
    const trimmedPassword = this.password.trim();

    // Check if the username/email exists among registered accounts
    const account = RegisterComponent.accounts.find(
      (account) =>
        account.username === trimmedUsernameOrEmail || account.email === trimmedUsernameOrEmail
    );

    if (!account) {
      this.errorMessage = 'Invalid username or email!';
      this.successMessage = ''; // Clear any success message
      return;
    }

    // Check if the password is correct
    if (account.password !== trimmedPassword) {
      this.errorMessage = 'Incorrect password!';
      this.successMessage = ''; // Clear any success message
      return;
    }

    // Clear any messages on successful login
    this.errorMessage = '';
    this.successMessage = 'Login successful!';

    // Redirect to the music page
    this.router.navigate(['/music']);
  }
}



//here is our try to link with our sql database
/*
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showLoginForm: boolean = false; // Flag to toggle between app page and login form

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    const credentials = { username: this.username, password: this.password };

    this.http.post('http://localhost:3000/api/auth', credentials).subscribe({
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
*/
