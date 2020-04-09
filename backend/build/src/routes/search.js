"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const search_1 = require("../controllers/search");
const searchRouter = express_1.Router();
searchRouter.route('/autocomplete/:query').get(auth_1.verifyUser, search_1.autocompleteResults);
searchRouter
    .route('/advanced')
    .get(auth_1.verifyUser, search_1.advancedResults)
    .put(auth_1.verifyUser, search_1.merge);
searchRouter.route('/changeartist/:query').get(auth_1.verifyUser, search_1.changeArtistOptions);
searchRouter.route('/changealbum/:query').get(auth_1.verifyUser, search_1.changeAlbumOptions);
exports.default = searchRouter;
