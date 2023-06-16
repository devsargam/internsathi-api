import jwt from 'jsonwebtoken';

export const createToken = (payload) => {
  console.log(payload);
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1500s',
  });
};
