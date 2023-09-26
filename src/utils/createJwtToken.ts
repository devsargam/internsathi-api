import jwt from 'jsonwebtoken';

// @ts-ignore
export const createToken = (payload) => {
  // @ts-ignore
  return jwt.sign(payload ?? '', process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1500s',
  });
};
