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
const Report_Track_1 = require("../models/Report_Track");
const async_1 = require("../middleware/async");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// @desc    Get report-tracks by report_id
// @route   GET /:id
// @access  Private
exports.getReportTracks = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const report = yield database_1.db.query(`
      SELECT rt.sortable_rank
      , ar.name as artist_name
      , tr.name as track_title
      , tr.length as length
      , tr.id as track_id
      , ar.id as artist_id
      , al.id as album_id
      , al.name as album_name
      , tr.side as disc_no
      , tr.track_no
      , al.identifier as cat_id
      , tr.country
      , tr.isrc
      , al.label
      , tr.people
      , tr.record_country
      , al.year
      , rt.id as report_track_id
     FROM playlist__track as tr
     INNER JOIN playlist__artist as ar ON ar.id = tr.artist_id
     INNER JOIN playlist__report_track as rt ON rt.track_id = tr.id
     INNER JOIN playlist__album as al ON tr.album_id = al.id
     WHERE rt.report_id = ${req.params.id}
     ORDER BY sortable_rank asc
      `, {
        type: sequelize_1.QueryTypes.SELECT
    });
    if (report.length === 0) {
        return next(new errorResponse_1.default(`no report found with the id ${req.params.id}`, 404));
    }
    res.status(200).json(report);
}));
// @desc    Add a track to report-tracks list
// @route   POST /
// @access  Private
exports.addTrackToReport = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { track_id, report_id, length, sortable_rank } = req.body;
    const newReportTrack = yield Report_Track_1.Report_Track.create({
        track_id,
        report_id,
        length,
        sortable_rank
    });
    res.status(201).json(newReportTrack);
}));
// @desc    Delete track from report-track list
// @route   DELETE /:id
// @access  Private
exports.deleteTrackFromReport = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const report_track = yield Report_Track_1.Report_Track.findOne({
        where: { id: req.params.id }
    });
    if (!report_track) {
        return next(new errorResponse_1.default(`no report_track found with the id ${req.params.id}`, 404));
    }
    yield Report_Track_1.Report_Track.destroy({
        where: { id: req.params.id }
    });
    res.status(204).json({});
}));
// @desc    Update sortable ranks
// @route   PUT /:id
// @access  Private
exports.updateSortableRanks = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const report_track = yield Report_Track_1.Report_Track.findOne({
        where: { id: req.params.id }
    });
    if (!report_track) {
        return next(new errorResponse_1.default(`no report_track found with the id ${req.params.id}`, 404));
    }
    const updatedReportTrack = yield Report_Track_1.Report_Track.update({
        sortable_rank: req.body.sortable_rank
    }, { where: { id: req.params.id } });
    res.status(200).json(`${updatedReportTrack[0]} rows affected`);
}));
// @desc    Get 15 most recent tracklists of a program for rh site
// @route   GET /site
// @access  Public
exports.getSiteTracklist = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dateTimes = yield database_1.db.query(`
    SELECT re.program_date
		, re.program_start_time
     FROM playlist__report as re
     INNER JOIN playlist__program as pr ON re.program_id = pr.id
     WHERE pr.name = "${req.query.name}"
     AND re.status = 1
     AND re.rerun is null
     ORDER BY re.program_date desc
     LIMIT 15
  `, {
        type: sequelize_1.QueryTypes.SELECT
    });
    if (dateTimes.length === 0) {
        return res.status(404).json('false');
    }
    const dateArr = dateTimes.map(dt => `${dt.program_date} ${dt.program_start_time}`);
    let result = {};
    yield Promise.all(dateArr.map((date) => __awaiter(void 0, void 0, void 0, function* () {
        const tracks = yield database_1.db.query(`
        SELECT ar.name as artist
        , tr.name as song
        , tr.spotify_id
        , rt.created_at
        , rt.sortable_rank
      FROM playlist__track as tr
      INNER JOIN playlist__artist as ar ON ar.id = tr.artist_id
      INNER JOIN playlist__report_track as rt ON rt.track_id = tr.id
      INNER JOIN playlist__report as re ON rt.report_id = re.id
      INNER JOIN playlist__album as al ON tr.album_id = al.id
      INNER JOIN playlist__program as pr ON re.program_id = pr.id
      WHERE pr.name = "${req.query.name}"
      AND re.status = 1
      AND re.program_date = "${date.substring(0, 10)}"
      ORDER BY rt.sortable_rank
      `, {
            type: sequelize_1.QueryTypes.SELECT
        });
        result = Object.assign(Object.assign({}, result), { [date]: tracks });
        return result;
    })));
    return res.status(200).json(result);
}));
