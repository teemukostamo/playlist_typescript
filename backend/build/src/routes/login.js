"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = require("../controllers/login");
const loginRouter = express_1.Router();
loginRouter.route('/').post(login_1.login);
exports.default = loginRouter;
