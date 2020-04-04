import { Router } from 'express';

const top100Router = Router();

import { getTop100 } from '../controllers/top100';

top100Router.route('/').get(getTop100);

export default top100Router;
