import { NextFunction, Request, Response } from 'express';

export const checkIfUserIsCompany = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.user.role !== 'company') {
    return res.status(403).json({
      message: 'Insufficient Permissions: Access Denied for Internship Actions',
    });
  }
  next();
};
