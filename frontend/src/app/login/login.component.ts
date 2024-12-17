import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule
  ]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}

  onLogin(): void {
    if (this.username === 'admin' && this.password === 'adminpassword') {
      console.log('Admin login successful');
      this.router.navigate(['/admin']); // Redirect to admin page
    } else {
      console.error('Invalid credentials');
      alert('Invalid username or password!');
    }
  }
  onNavigateToSignup(): void {
    this.router.navigate(['/signup']); // Redirect to signup page
  }
}
