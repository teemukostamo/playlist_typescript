import { Router } from 'express';
// import { verifyUser } from '../middleware/auth';

import { getPlaylogData } from '../controllers/playlog';

const playlogRouter = Router();

playlogRouter.route('/').get(getPlaylogData);

export default playlogRouter;
