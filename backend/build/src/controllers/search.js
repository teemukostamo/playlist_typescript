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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
const Album_1 = require("../models/Album");
const Artist_1 = require("../models/Artist");
const Track_1 = require("../models/Track");
const Report_Track_1 = require("../models/Report_Track");
const async_1 = require("../middleware/async");
// @desc    Get results for autocomplete search
// @route   GET autocomplete/:query
// @access  Private
exports.autocompleteResults = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line
    const searchString = req.params.query.replace(/'/g, "\\'");
    if (searchString.length < 3) {
        return res.status(400).json({ error: 'query too short' });
    }
    const results = yield database_1.db.query(`
      SELECT t.name as track_title
      , ar.name as artist
      , al.name as album
      , t.id as track_id
      , t.length
      , al.id as album_id
      , ar.id as artist_id
      , t.label as label
     FROM playlist__track as t
     INNER JOIN playlist__artist as ar ON t.artist_id = ar.id
     INNER JOIN playlist__album as al ON t.album_id = al.id
     WHERE (t.name like '%${searchString}%' or ar.name like '%${searchString}%')
     ORDER BY t.name ASC 
     LIMIT 100
      `, {
        type: sequelize_1.QueryTypes.SELECT
    });
    return res.status(200).json(results);
}));
// @desc    Get advanced search results
// @route   GET /advanced
// @access  Private
exports.advancedResults = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { kind, query } = req.query;
    // eslint-disable-next-line quotes
    const searchString = query.replace(/'/g, "\\'");
    console.log(searchString.length);
    if (searchString.length < 3) {
        return res.status(400).json({ error: 'query too short' });
    }
    const results = yield database_1.db.query(`
      SELECT ar.name as artist_name
      , ar.id as artist_id
      , al.name as album_name
      , al.id as album_id
      , tr.name as track_title
      , tr.id as track_id
      , tr.length
      , MAX(re.program_date) as program_date
      , MAX(re.id) as report_id
      FROM playlist__program as pr
      INNER JOIN playlist__report as re ON re.program_id = pr.id
      INNER JOIN playlist__report_track as rt ON rt.report_id = re.id
      INNER JOIN playlist__track as tr ON rt.track_id = tr.id
      INNER JOIN playlist__album as al ON tr.album_id = al.id
      INNER JOIN playlist__artist as ar ON tr.artist_id = ar.id AND al.artist_id = ar.id
      WHERE ${kind}.name like '%${searchString}%'
      GROUP BY tr.id
      ORDER BY track_title asc
      LIMIT 1000
      `, {
        type: sequelize_1.QueryTypes.SELECT
    });
    return res.status(200).json(results);
}));
// @desc    Merge tracks, albums or artists
// @route   PUT /advanced
// @access  Private
exports.merge = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, merge, mergeTo } = req.body;
    if (type === 'track') {
        let transaction;
        try {
            transaction = yield database_1.db.transaction();
            yield Report_Track_1.Report_Track.update({
                track_id: mergeTo
            }, { where: { track_id: merge } });
            yield Track_1.Track.destroy({ where: { id: merge } });
            res.status(200).json('1 table affected');
        }
        catch (err) {
            if (transaction)
                yield transaction.rollback();
        }
    }
    else if (type === 'album') {
        let transaction;
        try {
            transaction = yield database_1.db.transaction();
            yield Track_1.Track.update({
                album_id: mergeTo
            }, { where: { album_id: merge } });
            yield Album_1.Album.destroy({ where: { id: merge } });
            res.status(200).json('1 table affected');
        }
        catch (err) {
            if (transaction)
                yield transaction.rollback();
        }
    }
    else if (type === 'artist') {
        let transaction;
        try {
            transaction = yield database_1.db.transaction();
            yield Album_1.Album.update({
                artist_id: mergeTo
            }, { where: { artist_id: merge } });
            yield Track_1.Track.update({
                artist_id: mergeTo
            }, { where: { artist_id: merge } });
            yield Artist_1.Artist.destroy({ where: { id: merge } });
            res.status(200).json('2 tables affected');
        }
        catch (err) {
            if (transaction)
                yield transaction.rollback();
        }
    }
    else {
        res.status(404).end();
    }
}));
// @desc    Get change artist options
// @route   GET /changeartist/:query
// @access  Private
exports.changeArtistOptions = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield database_1.db.query(`
    SELECT name as artist_name, id as artist_id
    FROM playlist__artist
    WHERE name like "%${req.params.query}%"
    `, {
        type: sequelize_1.QueryTypes.SELECT
    });
    res.status(200).json(results);
}));
// @desc    Get change album options
// @route   GET /changealbum/:query
// @access  Private
exports.changeAlbumOptions = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield database_1.db.query(`
    SELECT al.name as album_name, al.id as album_id, al.identifier as cat_id, ar.name as artist_name
    FROM playlist__album as al
    INNER JOIN playlist__artist as ar ON al.artist_id = ar.id
    WHERE al.name like "%${req.params.query}%"
    ORDER BY album_name asc
    `, {
        type: sequelize_1.QueryTypes.SELECT
    });
    res.status(200).json(results);
}));
