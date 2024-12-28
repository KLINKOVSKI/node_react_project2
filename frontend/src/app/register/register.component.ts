import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // To use ngModel for two-way binding
import { HttpClientModule } from '@angular/common/http';  // To use HttpClient
import { CommonModule } from '@angular/common';  // To use ngIf in the template

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule] // Import necessary modules
})
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


