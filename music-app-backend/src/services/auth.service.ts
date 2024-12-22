import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { LoginDto, RegisterDto, AuthResponse } from '../types/auth';
import { UserRepository } from '../repositories/user.repository';
import { AuthError } from '../utils/errors';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async login(credentials: LoginDto): Promise<AuthResponse> {
    const user = await this.userRepository.findByUsername(credentials.username);
    if (!user) {
      throw new AuthError('Invalid credentials');
    }

    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) {
      throw new AuthError('Invalid credentials');
    }

    const token = this.generateToken(user);
    return { token, user: { id: user.id, username: user.username } };
  }

  public async register(userData: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByUsername(userData.username);
    if (existingUser) {
      throw new AuthError('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const token = this.generateToken(user);
    return { token, user: { id: user.id, username: user.username } };
  }

  private generateToken(user: any): string {
    return jwt.sign(
      { id: user.id, username: user.username },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
  }
}