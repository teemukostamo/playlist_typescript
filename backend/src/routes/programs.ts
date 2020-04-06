import { Router } from 'express';
import { verifyUser } from '../middleware/auth';

import {
  getAllActivePrograms,
  getAllPrograms,
  getOneProgram,
  createNewProgram,
  updateProgram,
  mergePrograms
} from '../controllers/programs';

const programsRouter = Router();

programsRouter.route('/active').get(verifyUser, getAllActivePrograms);
programsRouter.route('/all').get(verifyUser, getAllPrograms);
programsRouter.route('/getone/:id').get(verifyUser, getOneProgram);
programsRouter.route('/').post(verifyUser, createNewProgram);
programsRouter.route('/update').put(verifyUser, updateProgram);
programsRouter.route('/merge').put(verifyUser, mergePrograms);

export default programsRouter;
