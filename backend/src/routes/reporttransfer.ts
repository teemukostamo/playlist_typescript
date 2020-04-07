import { Router } from 'express';
import { verifyUser } from '../middleware/auth';

import {
  getAllTransfers,
  sendFileToClient,
  generateTransferFile
} from '../controllers/reporttransfer';

const reportTransferRouter = Router();

reportTransferRouter
  .route('/')
  .get(verifyUser, getAllTransfers)
  .post(verifyUser, generateTransferFile);

reportTransferRouter.route('/:filename').get(verifyUser, sendFileToClient);

export default reportTransferRouter;
