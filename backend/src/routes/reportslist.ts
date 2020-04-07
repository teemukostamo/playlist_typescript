import { Router } from 'express';
import { verifyUser } from '../middleware/auth';

import {
  getCurrentUsersReports,
  getAllReportsByMonth,
  getCurrentUsersInProgressReports,
  deleteReport
} from '../controllers/reportslist';

const reportsListRouter = Router();

reportsListRouter.route('/all').get(verifyUser, getCurrentUsersReports);
reportsListRouter.route('/date/:date').get(verifyUser, getAllReportsByMonth);
reportsListRouter
  .route('/user/:id')
  .get(verifyUser, getCurrentUsersInProgressReports);
reportsListRouter.route('/:id').put(verifyUser, deleteReport);

export default reportsListRouter;
