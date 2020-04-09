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
// @desc    Get one report details
// @route   GET /details/:id
// @access  Private
exports.getReportDetails = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const report = yield database_1.db.query(`
      SELECT pr.name as program_name
      , re.program_no
      , re.program_dj
      , re.program_date
      , re.program_start_time
      , re.program_end_time
      , re.id
      , pr.id as program_id
      , re.rerun
      , re.status
      , re.user_id
      , us.username
      , us.first_name
      , us.last_name
     FROM playlist__program as pr
     INNER JOIN playlist__report as re ON pr.id = re.program_id
     INNER JOIN playlist__user as us ON re.user_id = us.id
     WHERE re.id = ${req.params.id}
      `, {
        type: sequelize_1.QueryTypes.SELECT
    });
    if (report.length === 0) {
        return next(new errorResponse_1.default(`no report with id ${req.params.id}`, 404));
    }
    res.status(200).json(report);
}));
// @desc    Create a new report
// @route   POST /
// @access  Private
exports.createNewReport = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, program_id, program_date, program_start_time, program_end_time, program_no, program_dj, status, rerun } = req.body;
    const savedReport = yield Report_1.Report.create({
        user_id,
        program_id,
        program_date,
        program_start_time,
        program_end_time,
        program_no,
        program_dj,
        status,
        rerun
    });
    res.status(201).json(savedReport.toJSON());
}));
// @desc    Update existing report details
// @route   PUT /update/:id
// @access  Private
exports.updateReportDetails = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, program_id, program_date, program_start_time, program_end_time, program_no, program_dj, status, rerun } = req.body;
    const updatedReport = yield Report_1.Report.update({
        user_id,
        program_id,
        program_date,
        program_start_time,
        program_end_time,
        program_no,
        program_dj,
        status,
        rerun
    }, { where: { id: req.body.id } });
    if (updatedReport[0] === 0) {
        return next(new errorResponse_1.default(`no report found with the id ${req.body.id}`, 404));
    }
    console.log(updatedReport);
    res.status(200).json(`${updatedReport[0]} rows(s) affected`);
}));
