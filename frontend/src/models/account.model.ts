/*
 * Account Model
 * Represents a user's account in the music streaming application.
 * This class contains properties for user authentication and profile information.
 */
export class Account {
  constructor(
    public name: string, // User's first name
    public surname: string, // User's last name
    public username: string, // Unique username for the account
    public email: string, // User's email address
    public dateOfBirth: Date, // User's date of birth
    public password: string // User's account password
  ) {}
}
