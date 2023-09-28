import { Router } from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import {
  deleteApplication,
  getApplication,
  getApplications,
  postApplication,
} from '../controllers';

export const applicationRouter = Router();

applicationRouter.get('/', getApplications);
applicationRouter.get('/:id', getApplication);
applicationRouter.post('/', jwtAuth, postApplication);
applicationRouter.delete('/:id', jwtAuth, deleteApplication);
