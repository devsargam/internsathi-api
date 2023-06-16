import { Router } from 'express';
import * as intern from '../controllers/internController.js';
import { jwtAuth } from '../middleware/jwtAuth.js';

const router = Router();

router.get('/', jwtAuth, intern.getInternships);
router.get('/:id', jwtAuth, intern.getInternship);
router.post('/', jwtAuth, intern.postInternship);
router.delete('/:id', jwtAuth, intern.deleteInternship);
router.put('/:id', jwtAuth, intern.updateInternship);

export default router;
