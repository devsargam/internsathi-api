import { Router } from 'express';
import * as intern from '../controllers/intern.controller';
import { jwtAuth } from '../middleware/jwtAuth';
import { checkIfUserIsCompany } from '../middleware/checkPermission';

const router = Router();

router.get('/', jwtAuth, intern.getInternships);
router.get('/:id', jwtAuth, intern.getInternship);
router.post('/', [jwtAuth, checkIfUserIsCompany], intern.postInternship);
router.delete('/:id', [jwtAuth, checkIfUserIsCompany], intern.deleteInternship);
router.put('/:id', [jwtAuth, checkIfUserIsCompany], intern.updateInternship);

export default router;
