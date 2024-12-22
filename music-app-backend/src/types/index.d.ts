import { JwtPayload } from './auth';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Add the `user` property to the Request interface
    }
  }
}
