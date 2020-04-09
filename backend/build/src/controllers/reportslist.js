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
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
const Report_1 = require("../models/Report");
const async_1 = require("../middleware/async");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// @desc    Get all reports by month by current user
// @route   GET /all
// @access  Private
exports.getCurrentUsersReports = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reports = yield database_1.db.query(`
      SELECT re.program_no
      , pr.name
      , re.program_date
      , re.program_start_time
      , re.program_end_time
      , re.status
      , re.rerun
      , re.program_dj
      , re.id
      , re.user_id 
     FROM playlist__program as pr
     INNER JOIN playlist__report as re ON pr.id = re.program_id
     WHERE re.program_date like "${req.query.date}%"
     AND re.user_id = ${req.query.user}
     ORDER BY program_date ASC, program_start_time ASC
      `, {
        type: sequelize_1.QueryTypes.SELECT
    });
    res.status(200).json(reports);
}));
// @desc    Get all reports of a month
// @route   GET /date/:date
// @access  Private
exports.getAllReportsByMonth = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reports = yield database_1.db.query(`
      SELECT re.program_no
      , pr.name
      , re.program_date
      , re.program_start_time
      , re.program_end_time
      , re.status
      , re.rerun
      , re.program_dj
      , re.id
      , re.user_id 
     FROM playlist__program as pr
     INNER JOIN playlist__report as re ON pr.id = re.program_id
     WHERE re.program_date like "${req.params.date}%"
     ORDER BY program_date ASC, program_start_time ASC
      `, {
        type: sequelize_1.QueryTypes.SELECT
    });
    res.status(200).json(reports);
}));
// @desc    Get all in progress reports of a user
// @route   GET /user/:id
// @access  Private
exports.getCurrentUsersInProgressReports = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reports = yield database_1.db.query(`
      SELECT re.program_no
      , pr.name
      , re.program_date
      , re.program_start_time
      , re.program_end_time
      , re.status
      , re.rerun
      , re.program_dj
      , re.id
      , re.user_id 
     FROM playlist__program as pr
     INNER JOIN playlist__report as re ON pr.id = re.program_id
     WHERE re.user_id="${req.params.id}" AND re.status="0"
     ORDER BY program_date ASC, program_start_time ASC
      `, {
        type: sequelize_1.QueryTypes.SELECT
    });
    res.status(200).json(reports);
}));
// @desc    Delete report - set status to 9
// @route   PUT /:id
// @access  Private
exports.deleteReport = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedReport = yield Report_1.Report.update({
        status: 9
    }, { where: { id: req.params.id } });
    if (deletedReport[0] === 0) {
        return next(new errorResponse_1.default(`no report found with the id ${req.params.id}`, 404));
    }
    res.status(200).json(`${deletedReport[0]} rows affected`);
}));
