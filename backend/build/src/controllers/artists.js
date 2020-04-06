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
const Artist_1 = require("../models/Artist");
const async_1 = require("../middleware/async");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// @desc    Get one artist details
// @route   GET /details/:id
// @access  Private
exports.getOneArtist = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const artist = yield Artist_1.Artist.findOne({ where: { id: req.params.id } });
    if (!artist) {
        return next(new errorResponse_1.default(`no artist found with the id ${req.params.id}`, 404));
    }
    res.status(200).json(artist);
}));
// @desc    Get all albums by artist
// @route   GET /albumsby/:id
// @access  Private
exports.getAllAlbumsByArtist = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const albumlist = yield database_1.db.query(`
      SELECT al.id as album_id
      , ar.id as artist_id
      , al.name
      , al.identifier
      , ar.name as artist_name
      , ar.spotify_id as artist_spotify_id
      , count(distinct tr.id) as track_count
      , count(rt.track_id) as report_occurrence
     FROM playlist__album as al 
     INNER JOIN playlist__artist as ar ON al.artist_id = ar.id
     INNER JOIN playlist__track as tr ON tr.album_id = al.id
     INNER JOIN playlist__report_track as rt ON rt.track_id = tr.id
     WHERE ar.id = ${req.params.id}
     group by album_id
     ORDER BY al.name
    `, {
        type: sequelize_1.QueryTypes.SELECT
    });
    if (albumlist.length === 0) {
        return next(new errorResponse_1.default(`no artist found with the id ${req.params.id}`, 404));
    }
    res.status(200).json(albumlist);
}));
