import { Router } from 'express';
import * as auth from '../controllers/authController.js';

const router = Router();

router.post('/signup', auth.postSignup);

router.post('/login', auth.postLogin);

export default router;
