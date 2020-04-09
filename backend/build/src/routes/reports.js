"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const reports_1 = require("../controllers/reports");
const reportsRouter = express_1.Router();
reportsRouter.route('/site').get(reports_1.getSiteTracklist);
reportsRouter
    .route('/:id')
    .get(auth_1.verifyUser, reports_1.getReportTracks)
    .delete(auth_1.verifyUser, reports_1.deleteTrackFromReport)
    .put(auth_1.verifyUser, reports_1.updateSortableRanks);
reportsRouter.route('/').post(auth_1.verifyUser, reports_1.addTrackToReport);
exports.default = reportsRouter;
