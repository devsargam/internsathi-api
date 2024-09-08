import { z } from 'zod';

export const SignUpValidation = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Username must be at least 3 characters long',
    })
    .max(15, { message: 'Username cannot exceed 20 characters' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .trim(),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(20, { message: 'Password cannot exceed 20 characters' })
    .trim(),
  role: z.enum(['user', 'company'], {
    message: 'Invalid role. Must be either "user" or "company"',
  }),
});

export const SignInValidation = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .trim(),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(20, { message: 'Password cannot exceed 20 characters' })
    .trim(),
});
