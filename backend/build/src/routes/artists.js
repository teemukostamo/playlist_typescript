"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const artists_1 = require("../controllers/artists");
const auth_1 = require("../middleware/auth");
const artistsRouter = express_1.Router();
artistsRouter.route('/details/:id').get(auth_1.verifyUser, artists_1.getOneArtist);
artistsRouter.route('/albumsby/:id').get(auth_1.verifyUser, artists_1.getAllAlbumsByArtist);
exports.default = artistsRouter;
