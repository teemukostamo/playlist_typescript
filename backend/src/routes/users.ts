import { Router } from 'express';
import { verifyUser } from '../middleware/auth';

import {
  getAllUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser
} from '../controllers/users';

const usersRouter = Router();

usersRouter
  .route('/')
  .get(verifyUser, getAllUsers)
  .post(verifyUser, addUser);

usersRouter
  .route('/:id')
  .get(verifyUser, getOneUser)
  .put(verifyUser, updateUser)
  .delete(verifyUser, deleteUser);

export default usersRouter;
