import { Router } from 'express';
import { verifyUser } from '../middleware/auth';

import {
  autocompleteResults,
  advancedResults,
  merge,
  changeArtistOptions,
  changeAlbumOptions
} from '../controllers/search';

const searchRouter = Router();

searchRouter.route('/autocomplete/:query').get(verifyUser, autocompleteResults);

searchRouter
  .route('/advanced')
  .get(verifyUser, advancedResults)
  .put(verifyUser, merge);

searchRouter.route('/changeartist/:query').get(verifyUser, changeArtistOptions);
searchRouter.route('/changealbum/:query').get(verifyUser, changeAlbumOptions);

export default searchRouter;
