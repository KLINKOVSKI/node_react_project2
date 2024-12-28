// src/@types/express.d.ts
declare namespace Express {
    export interface Request {
      user?: JwtPayload;  // This will allow you to access req.user
    }
  }
  