"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const top100_1 = require("../controllers/top100");
const auth_1 = require("../middleware/auth");
const top100Router = express_1.Router();
top100Router.route('/').get(auth_1.verifyUser, top100_1.getTop100);
exports.default = top100Router;
