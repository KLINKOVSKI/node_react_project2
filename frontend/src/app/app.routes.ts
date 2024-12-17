import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AdminComponent} from './admin/admin.component';

/*
 * Define the routing configuration for the app.
 *
 * - When the user visits the base URL (`/`), they are redirected to the 'login' page.
 * - There are routes for the login page (`/login`) and signup page (`/signup`).
 */
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route to login
  { path: 'login', component: LoginComponent },        // Route for login page
  { path: 'signup', component: SignupComponent },     // Route for signup page
  { path: 'admin', component: AdminComponent }, // Route for admin page
];
