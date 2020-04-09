"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const reporttransfer_1 = require("../controllers/reporttransfer");
const reportTransferRouter = express_1.Router();
reportTransferRouter
    .route('/')
    .get(auth_1.verifyUser, reporttransfer_1.getAllTransfers)
    .post(auth_1.verifyUser, reporttransfer_1.generateTransferFile);
reportTransferRouter.route('/:filename').get(auth_1.verifyUser, reporttransfer_1.sendFileToClient);
exports.default = reportTransferRouter;
