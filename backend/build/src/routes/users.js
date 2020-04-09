"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const users_1 = require("../controllers/users");
const usersRouter = express_1.Router();
usersRouter
    .route('/')
    .get(auth_1.verifyUser, users_1.getAllUsers)
    .post(auth_1.verifyUser, users_1.addUser);
usersRouter
    .route('/:id')
    .get(auth_1.verifyUser, users_1.getOneUser)
    .put(auth_1.verifyUser, users_1.updateUser)
    .delete(auth_1.verifyUser, users_1.deleteUser);
exports.default = usersRouter;
