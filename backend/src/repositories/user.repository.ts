import { BaseRepository } from './base.repository';
import { User } from '../types/user';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('users');
  }

  async findByUsername(username: string): Promise<User | null> {
    const result = await this.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }
}