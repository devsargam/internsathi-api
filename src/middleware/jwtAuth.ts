import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.json({ error: err.message });
    }
    // @ts-ignore
    req.user = decodedToken;
    next();
  });
};
