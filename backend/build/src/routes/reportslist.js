"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const reportslist_1 = require("../controllers/reportslist");
const reportsListRouter = express_1.Router();
reportsListRouter.route('/all').get(auth_1.verifyUser, reportslist_1.getCurrentUsersReports);
reportsListRouter.route('/date/:date').get(auth_1.verifyUser, reportslist_1.getAllReportsByMonth);
reportsListRouter
    .route('/user/:id')
    .get(auth_1.verifyUser, reportslist_1.getCurrentUsersInProgressReports);
reportsListRouter.route('/:id').put(auth_1.verifyUser, reportslist_1.deleteReport);
exports.default = reportsListRouter;
