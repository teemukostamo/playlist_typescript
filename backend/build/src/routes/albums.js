"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const albums_1 = require("../controllers/albums");
const albumsRouter = express_1.Router();
albumsRouter
    .route('/albumdetails/:id')
    .get(auth_1.verifyUser, albums_1.getOneAlbum)
    .put(auth_1.verifyUser, albums_1.updateAlbum);
albumsRouter.route('/tracklist/:id').get(auth_1.verifyUser, albums_1.getAlbumTracklist);
albumsRouter.route('/updateartist').put(auth_1.verifyUser, albums_1.changeArtist);
exports.default = albumsRouter;
