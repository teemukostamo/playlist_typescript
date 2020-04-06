import { Router } from 'express';
import { verifyUser } from '../middleware/auth';

import {
  getReportDetails,
  createNewReport,
  updateReportDetails
} from '../controllers/reportdetails';

const reportDetailsRouter = Router();

reportDetailsRouter.route('/details/:id').get(verifyUser, getReportDetails);
reportDetailsRouter.route('/').post(verifyUser, createNewReport);
reportDetailsRouter.route('/update/:id').put(verifyUser, updateReportDetails);

export default reportDetailsRouter;
