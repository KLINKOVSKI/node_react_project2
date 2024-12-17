import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import the Router module
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    name: '',
    surname: '',
    username: '',
    dob: '',
    email: ''
  };
  successMessage = '';  // Variable to hold success message
  errorMessage = '';    // Variable to hold error message

  constructor(private router: Router) {}

  // Signup logic
  onSignup(signupForm: NgForm) {
    if (signupForm.valid) {
      // Simulate a successful signup process, e.g., call your backend API
      this.successMessage = 'Signup successful! You will be redirected to the login page.';
      this.errorMessage = '';  // Clear any previous error messages

      // Redirect to the login page after a delay
      setTimeout(() => {
        this.router.navigate(['/login']); // Assuming the login route is '/login'
      }, 2000);  // 2 seconds delay before redirecting
    } else {
      this.successMessage = '';  // Clear success message
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }
}
