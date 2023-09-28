import { Router } from 'express';
import { postLogin, postSignup } from '../controllers';

export const authRouter = Router();

authRouter.post('/signup', postSignup);
authRouter.post('/login', postLogin);
