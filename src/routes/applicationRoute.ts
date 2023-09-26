import { Router } from 'express';
import * as application from '../controllers/applicationController.js';
import { jwtAuth } from '../middleware/jwtAuth.js';

const router = Router();

router.get('/', application.getApplications);
router.get('/:id', application.getApplication);
router.post('/', jwtAuth, application.postApplication);
router.delete('/:id', jwtAuth, application.deleteApplication);

export default router;
