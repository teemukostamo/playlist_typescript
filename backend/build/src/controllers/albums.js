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
const Album_1 = require("../models/Album");
const async_1 = require("../middleware/async");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// @desc    Get one album
// @route   GET /albumdetails/:id
// @access  Private
exports.getOneAlbum = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const album = yield database_1.db.query(`
      SELECT al.name as album_name
      , al.id as album_id
      , al.label
      , al.identifier as cat_id
      , al.spotify_id
      , al.year
      , ar.name as artist_name
      , ar.id as artist_id
      FROM playlist__artist as ar
      INNER JOIN playlist__album as al ON al.artist_id = ar.id
      WHERE al.id = ${req.params.id}
    `, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    if (album.length === 0) {
        return next(new errorResponse_1.default(`no album found with the id ${req.params.id}`, 404));
    }
    res.status(200).json(album[0]);
}));
// @desc    Get one album's tracklist & album occurrence in reports count
// @route   GET /tracklist/:id
// @access  Private
exports.getAlbumTracklist = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const album = yield database_1.db.query(`
      SELECT tr.id as track_id
      , tr.isrc
      , tr.side as disc_no
      , tr.track_no
      , tr.name as track_title
      , ar.name as artist_name
      , count(rt.track_id) as report_occurrence
     FROM playlist__album as al
     LEFT JOIN  playlist__artist as ar ON al.artist_id = ar.id
     LEFT JOIN  playlist__track as tr ON tr.album_id = al.id
     LEFT JOIN  playlist__report_track as rt ON  rt.track_id = tr.id
     WHERE al.id = ${req.params.id}
     group by track_id
     order by track_no asc, track_title asc
    `, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    if (album.length === 0) {
        return next(new errorResponse_1.default(`no album found with the id ${req.params.id}`, 404));
    }
    res.status(200).json(album);
}));
// @desc    Update album name, label, cat_id, year or spotify_id
// @route   PUT /albumdetails/:id
// @access  Private
exports.updateAlbum = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, label, cat_id, year, spotify_id } = req.body;
    const updatedAlbum = yield Album_1.Album.update({
        name,
        label,
        identifier: cat_id,
        year,
        spotify_id,
    }, { where: { id: req.params.id } });
    if (updatedAlbum[0] === 0) {
        return next(new errorResponse_1.default(`no album found with the id ${req.params.id}`, 404));
    }
    res.status(200).json(`${updatedAlbum[0]} row('s) affected`);
}));
// @desc    Change the artist of an album
// @route   PUT /updateartist
// @access  Private
exports.changeArtist = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { album_id, artist_id } = req.body;
    const changedArtist = yield Album_1.Album.update({
        artist_id,
    }, { where: { id: album_id } });
    if (changedArtist[0] === 0) {
        return next(new errorResponse_1.default(`no album found with the id ${album_id}`, 404));
    }
    res.status(200).json(`${changedArtist[0]} row(s) affected.`);
}));
