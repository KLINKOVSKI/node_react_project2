export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  email: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}

export interface JwtPayload {
  id: number;
  username: string;
  iat?: number;
  exp?: number;
}
