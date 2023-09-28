import { Router } from 'express';
import * as auth from '../controllers/auth.controller';

const router = Router();

router.post('/signup', auth.postSignup);
router.post('/login', auth.postLogin);

export default router;
