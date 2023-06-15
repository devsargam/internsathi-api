import { Router } from 'express';
import * as auth from '../controllers/authController.js';

const router = Router();

router.get('/signup', auth.getSignup);

router.post('/signup', auth.postSignup);

router.get('/login', auth.getLogin);

router.post('/login', auth.postLogin);

export default router;
