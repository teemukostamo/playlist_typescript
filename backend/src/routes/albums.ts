import { Router } from 'express';
import { verifyUser } from '../middleware/auth';

import {
  getOneAlbum,
  getAlbumTracklist,
  updateAlbum,
  changeArtist
} from '../controllers/albums';

const albumsRouter = Router();

albumsRouter
  .route('/albumdetails/:id')
  .get(verifyUser, getOneAlbum)
  .put(verifyUser, updateAlbum);

albumsRouter.route('/tracklist/:id').get(verifyUser, getAlbumTracklist);

albumsRouter.route('/updateartist').put(verifyUser, changeArtist);

export default albumsRouter;
