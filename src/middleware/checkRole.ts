import { NextFunction, Request, Response } from 'express';
import { Role } from '../constants';

export const checkRole =
  (role: Role) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user.role !== role) {
      return res.status(403).json({
        message:
          'Insufficient Permissions: Access Denied for Internship Actions',
      });
    }
    next();
  };
