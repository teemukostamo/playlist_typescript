"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const User_1 = require("../models/User");
// @desc    User login
// @route   POST /
// @access  Public
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // check if user exists, return 401 if not
    const user = yield User_1.User.findOne({ where: { username } });
    console.log(user);
    if (!user) {
        return res.status(401).json({
            error: 'user not found!'
        });
    }
    // check if password is correct, return 401 if not
    const passwordCorrect = user === null ? false : yield bcrypt_1.default.compare(password, user.password);
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'Invalid username or password'
        });
    }
    // create user object for token
    const userForToken = {
        username: user.username,
        id: user.id
    };
    const token = jsonwebtoken_1.default.sign(userForToken, config_1.jwtSecret, {
    // expiresIn: '1d'
    });
    // update last seen field
    const updatedUser = yield User_1.User.update({ last_seen: new Date() }, { where: { username } });
    console.log(updatedUser);
    // response ok with token and username
    return res.status(200).send({
        token,
        username: user.username,
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        level: user.level,
        status: user.status
    });
});
