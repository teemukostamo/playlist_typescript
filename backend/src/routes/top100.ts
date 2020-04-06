import { Router } from 'express';
import { getTop100 } from '../controllers/top100';
import { verifyUser } from '../middleware/auth';

const top100Router = Router();

top100Router.route('/').get(verifyUser, getTop100);

export default top100Router;
