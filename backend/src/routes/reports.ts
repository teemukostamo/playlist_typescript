import { Router } from 'express';
import { verifyUser } from '../middleware/auth';

import {
  getReportTracks,
  addTrackToReport,
  deleteTrackFromReport,
  updateSortableRanks,
  getSiteTracklist
} from '../controllers/reports';

const reportsRouter = Router();

reportsRouter.route('/site').get(getSiteTracklist);

reportsRouter
  .route('/:id')
  .get(verifyUser, getReportTracks)
  .delete(verifyUser, deleteTrackFromReport)
  .put(verifyUser, updateSortableRanks);

reportsRouter.route('/').post(verifyUser, addTrackToReport);

export default reportsRouter;
