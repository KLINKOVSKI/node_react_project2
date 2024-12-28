import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ]
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  // Shared list of registered accounts (this would normally be in a service or database)
  static accounts: { username: string; email: string; password: string }[] = [];

  constructor(private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();

    // Check if an account with the same username or email already exists
    const existingAccount = RegisterComponent.accounts.find(
      (account) => account.username === this.username || account.email === this.email
    );
    if (existingAccount) {
      this.errorMessage = 'Username or email already exists!';
      return;
    }
    // If all validations pass, save the new account
    RegisterComponent.accounts.push({ username: this.username, email: this.email, password: this.password });
    this.successMessage = 'Registration successful!';
  }
}

//here is our try to link with our sql database
/*
export class RegisterComponent {
  name: string = '';
  surname: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();  // Prevent page reload on form submission

    const userData = {
      name: this.name,
      surname: this.surname,
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:3000/api/register', userData).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.successMessage = 'Registration successful! Redirecting to login page...';
          setTimeout(() => {
            this.router.navigate(['/login']);  // Redirect to login after successful registration
          }, 2000);  // Delay to show success message before redirect
        } else {
          this.errorMessage = response.message || 'Something went wrong. Please try again.';
        }
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.errorMessage = 'An error occurred. Please try again.';
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
*/
