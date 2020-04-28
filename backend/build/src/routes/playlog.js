"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { verifyUser } from '../middleware/auth';
const playlog_1 = require("../controllers/playlog");
const playlogRouter = express_1.Router();
playlogRouter.route('/').get(playlog_1.getPlaylogData);
exports.default = playlogRouter;
