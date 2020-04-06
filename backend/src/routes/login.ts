import { Router } from 'express';
import { login } from '../controllers/login';

const loginRouter = Router();

loginRouter.route('/').post(login);

export default loginRouter;
