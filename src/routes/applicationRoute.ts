import { Router } from 'express';
import * as application from '../controllers/applicationController';
import { jwtAuth } from '../middleware/jwtAuth';

const router = Router();

router.get('/', application.getApplications);
router.get('/:id', application.getApplication);
router.post('/', jwtAuth, application.postApplication);
router.delete('/:id', jwtAuth, application.deleteApplication);

export default router;
