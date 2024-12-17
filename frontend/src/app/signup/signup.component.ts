// signup.component.ts
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  // Define a user object to bind to the form fields
  user = {
    name: '',
    email: '',
    password: ''
  };

  // Handle the form submission
  onSubmit() {
    if (this.user.name && this.user.email && this.user.password) {
      console.log('User Registered:', this.user);
      // Here you can send the form data to a backend API for registration
      // For now, we're just logging it to the console

      // Optionally, reset the form after submission
      this.user = {
        name: '',
        email: '',
        password: ''
      };
    } else {
      console.log('Please fill in all the fields');
    }
  }
}
