"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const async_1 = require("./async");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// import { User } from '../models/User';
const config_1 = require("../config/config");
exports.verifyUser = async_1.asyncHandler((req, _res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.toLowerCase().startsWith('bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new errorResponse_1.default('Token missing or invalid!', 401));
    }
    try {
        // verify token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.jwtSecret);
        req.user = decoded;
        next();
    }
    catch (error) {
        return next(new errorResponse_1.default('Token missing or invalid!', 401));
    }
});
