export class AppError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class AuthError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}