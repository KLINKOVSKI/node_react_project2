import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accounts: { username: string; email: string; password: string }[] = [];

  constructor() {}

  // Register a new user
  registerAccount(account: { username: string; email: string; password: string }): string {
    const existingAccount = this.accounts.find((acc) => acc.username === account.username || acc.email === account.email);
    if (existingAccount) {
      return 'Username or email already exists!';
    }
    this.accounts.push(account);
    return 'Account registered successfully!';
  }

  // Authenticate a user
  authenticate(username: string, password: string): boolean {
    return this.accounts.some((acc) => acc.username === username && acc.password === password);
  }
}
