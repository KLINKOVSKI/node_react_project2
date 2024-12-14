export class AuthService {
  private user: any = null;

  constructor(private databaseService) {
    'ngInject';
  }

  async login(email: string, password: string): Promise<void> {
    const user = await this.databaseService.users
      .where({ email, password })
      .first();
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    this.user = user;
  }

  async register(email: string, password: string, name: string): Promise<void> {
    const exists = await this.databaseService.users
      .where({ email })
      .first();

    if (exists) {
      throw new Error('User already exists');
    }

    const user = {
      email,
      password,
      name,
      isAdmin: false,
      createdAt: new Date()
    };

    const id = await this.databaseService.users.add(user);
    this.user = { ...user, id };
  }

  logout(): void {
    this.user = null;
  }

  getUser() {
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }
}