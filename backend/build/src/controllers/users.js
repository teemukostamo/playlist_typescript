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
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const async_1 = require("../middleware/async");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// @desc    Get all users
// @route   GET /
// @access  Private
exports.getAllUsers = async_1.asyncHandler((_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.User.findAll({
        attributes: {
            exclude: ['password']
        }
    });
    if (!users) {
        return next(new errorResponse_1.default('no users found', 404));
    }
    res.status(200).json(users);
}));
// @desc    Get one user
// @route   GET /:id
// @access  Private
exports.getOneUser = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({
        where: { id: req.params.id },
        attributes: {
            exclude: ['password']
        }
    });
    if (!user) {
        return next(new errorResponse_1.default(`no user found with the id ${req.params.id}`, 404));
    }
    res.status(200).json(user);
}));
// @desc    Add a new user
// @route   POST /
// @access  Private
exports.addUser = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // see if user exists, send status 400 if yes
    const existingUser = yield User_1.User.findOne({
        where: { username: req.body.username }
    });
    if (existingUser !== null) {
        return res.status(400).json({ error: 'User already exists!' });
    }
    // destructure values from req.body
    const { username, first_name, last_name, email, address, zip, city, country, phone, level, last_seen, reset_key, old_id } = req.body;
    // hash password
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(req.body.password, saltRounds);
    // create new user
    const savedUser = yield User_1.User.create({
        username,
        password: passwordHash,
        first_name,
        last_name,
        email,
        address,
        zip,
        city,
        country,
        phone,
        status: 1,
        level,
        last_seen,
        reset_key,
        old_id
    });
    return res.status(201).json(savedUser.toJSON());
}));
// @desc    Update user
// @route   PUT /:id
// @access  Private
exports.updateUser = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // see if user exists, return error if not
    const user = yield User_1.User.findOne({ where: { id: req.params.id } });
    if (!user) {
        return next(new errorResponse_1.default(`no user found with the id ${req.params.id}`, 404));
    }
    // destructure values from req body
    const { first_name, last_name, email, status, level, last_seen } = req.body;
    // if req body password is empty string, only update other info
    if (req.body.password === undefined ||
        req.body.password === null ||
        req.body.password === '') {
        const updatedUser = yield User_1.User.update({
            first_name,
            last_name,
            email,
            status,
            level,
            last_seen
        }, { where: { id: req.params.id } });
        console.log(updatedUser);
        return res.status(200).json(`${updatedUser[0]} rows affected`);
    }
    // hash password
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(req.body.password, saltRounds);
    const updatedUser = yield User_1.User.update({
        password: passwordHash,
        first_name,
        last_name,
        email,
        status,
        level,
        last_seen
    }, { where: { id: req.params.id } });
    res.status(200).json(`${updatedUser[0]} rows affected`);
}));
// @desc    Delete user
// @route   DELETE /:id
// @access  Private
exports.deleteUser = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ where: { id: req.params.id } });
    if (!user) {
        return next(new errorResponse_1.default(`no user found with the id ${req.params.id}`, 404));
    }
    yield User_1.User.destroy({
        where: { id: req.params.id }
    });
    res.status(204).json({});
}));
