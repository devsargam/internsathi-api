import { Router } from 'express';
import * as intern from '../controllers/internController.js';
import { jwtAuth } from '../middleware/jwtAuth.js';
import { checkIfUserIsCompany } from '../middleware/checkPermission.js';

const router = Router();

router.get('/', jwtAuth, intern.getInternships);
router.get('/:id', jwtAuth, intern.getInternship);
router.post('/', [jwtAuth, checkIfUserIsCompany], intern.postInternship);
router.delete('/:id', [jwtAuth, checkIfUserIsCompany], intern.deleteInternship);
router.put('/:id', [jwtAuth, checkIfUserIsCompany], intern.updateInternship);

export default router;
