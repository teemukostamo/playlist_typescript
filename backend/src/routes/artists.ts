import { Router } from 'express';
import { verifyUser } from '../middleware/auth';

import {
  getOneArtist,
  getAllAlbumsByArtist,
  updateArtist
} from '../controllers/artists';

const artistsRouter = Router();

artistsRouter
  .route('/details/:id')
  .get(verifyUser, getOneArtist)
  .put(verifyUser, updateArtist);

artistsRouter.route('/albumsby/:id').get(verifyUser, getAllAlbumsByArtist);

export default artistsRouter;
