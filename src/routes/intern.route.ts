import { Router } from 'express';
import { jwtAuth } from '../middleware/jwtAuth';
import { checkRole } from '../middleware/checkRole';
import {
  deleteInternship,
  getInternship,
  getInternships,
  postInternship,
  updateInternship,
} from '../controllers';
import { Role } from '../constants';

export const internRouter = Router();

internRouter.get('/', jwtAuth, getInternships);
internRouter.get('/:id', jwtAuth, getInternship);
internRouter.post('/', jwtAuth, checkRole(Role.COMPANY), postInternship);
internRouter.delete('/:id', jwtAuth, checkRole(Role.COMPANY), deleteInternship);
internRouter.put('/:id', jwtAuth, checkRole(Role.COMPANY), updateInternship);
