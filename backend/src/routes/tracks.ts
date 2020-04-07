import { Router } from 'express';
import { verifyUser } from '../middleware/auth';

import {
  getOneTrack,
  getPlayhistory,
  changeAlbum,
  changeArtist,
  updateTrack,
  addAndReport,
  addNewTrack,
  addDjonlineTracks,
  addTrackToAlbum
} from '../controllers/tracks';

const tracksRouter = Router();

tracksRouter.route('/details/:id').get(verifyUser, getOneTrack);
tracksRouter.route('/history/:id').get(verifyUser, getPlayhistory);
tracksRouter.route('/updatealbum').put(verifyUser, changeAlbum);
tracksRouter.route('/updateartist').put(verifyUser, changeArtist);
tracksRouter.route('/').put(verifyUser, updateTrack);
tracksRouter.route('/addandreport').post(verifyUser, addAndReport);
tracksRouter.route('/addtodb').post(verifyUser, addNewTrack);
tracksRouter.route('/djonline').post(verifyUser, addDjonlineTracks);
tracksRouter.route('/addtracktoalbum').post(verifyUser, addTrackToAlbum);

export default tracksRouter;
