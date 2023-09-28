import jwt from 'jsonwebtoken';
import { IPayload } from '../types';

export const createToken = (payload: IPayload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not defined');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1500s',
  });
};
