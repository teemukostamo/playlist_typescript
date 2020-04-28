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
const Track_1 = require("../models/Track");
const Album_1 = require("../models/Album");
const Artist_1 = require("../models/Artist");
const Report_Track_1 = require("../models/Report_Track");
const async_1 = require("../middleware/async");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// @desc    Get one track
// @route   GET /details/:id
// @access  Private
exports.getOneTrack = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const track = yield database_1.db.query(`SELECT t.name as track_title
      , ar.name as artist
      , al.name as album
      , t.id as track_id
      , al.id as album_id
      , ar.id as artist_id
      , t.label as label
      , al.identifier as cat_id
      , t.length
      , t.side as disc_no
      , t.track_no
      , t.people
      , t.isrc
      , al.year
      , t.comment
      , t.record_country
      , t.country
     FROM playlist__track as t
     INNER JOIN playlist__artist as ar ON t.artist_id = ar.id
     INNER JOIN playlist__album as al ON t.album_id = al.id
     WHERE t.id = ${req.params.id}`, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    if (track.length === 0) {
        return next(new errorResponse_1.default(`no track found with the id ${req.params.id}`, 404));
    }
    res.status(200).json(track[0]);
}));
// @desc    Get play history of one track
// @route   GET /history/:id
// @access  Private
exports.getPlayhistory = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const track = yield database_1.db.query(`
      SELECT pr.name as program_name
      , pr.id as program_id
      , re.id as report_id
      , re.program_date
      , rt.track_id
      FROM playlist__program as pr
      INNER JOIN playlist__report as re ON re.program_id = pr.id
      INNER JOIN playlist__report_track as rt ON rt.report_id = re.id
      WHERE rt.track_id = ${req.params.id}
      GROUP BY re.id
      ORDER BY program_date desc
      `, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    // if (track.length === 0) {
    //   return next(
    //     new ErrorResponse(`no track found with the id ${req.params.id}`, 404)
    //   );
    // }
    if (track.length === 0) {
        res.status(200).json([{ result: 'No plays yet' }]);
    }
    res.status(200).json(track);
}));
// @desc    Change the album of a track
// @route   PUT /updatealbum
// @access  Private
exports.changeAlbum = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { track_id, album_id } = req.body;
    const changedAlbum = yield Track_1.Track.update({
        album_id,
    }, { where: { id: track_id } });
    res.status(200).json(`${changedAlbum[0]} row(s) affected.`);
}));
// @desc    Change the artist of a track
// @route   PUT /updateartist
// @access  Private
exports.changeArtist = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { track_id, artist_id } = req.body;
    const changedArtist = yield Track_1.Track.update({
        artist_id,
    }, { where: { id: track_id } });
    res.status(200).json(`${changedArtist[0]} row(s) affected.`);
}));
// @desc    Update track, album, artist
// @route   PUT /
// @access  Private
exports.updateTrack = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { artist_name, album_name, track_title, track_id, length, country, record_country, people, disc_no, track_no, year, label, cat_id, isrc, comment, user_id, artist_id, album_id, sortable_rank, report_track_id, } = req.body;
    const trackToUpDate = yield Track_1.Track.update({
        name: track_title,
        length,
        country,
        record_country,
        people,
        side: disc_no,
        track_no,
        label,
        isrc,
        comment,
        user_id,
    }, { where: { id: track_id } });
    const albumToUpdate = yield Album_1.Album.update({
        name: album_name,
        identifier: cat_id,
        year: year.toString(),
        user_id,
    }, { where: { id: album_id } });
    const artistToUpdate = yield Artist_1.Artist.update({
        name: artist_name,
        user_id,
    }, { where: { id: artist_id } });
    const updatedTrack = {
        artist_name,
        album_name,
        track_title,
        track_id,
        length,
        country,
        record_country,
        people,
        disc_no,
        track_no,
        year,
        label,
        cat_id,
        isrc,
        comment,
        user_id,
        artist_id,
        album_id,
        sortable_rank,
        report_track_id,
    };
    console.log('updated track info', trackToUpDate);
    console.log('updated album info', albumToUpdate);
    console.log('updated artist info', artistToUpdate);
    res.status(200).json(updatedTrack);
}));
// @desc    Save new track and add it to current report
// @route   POST /addandreport
// @access  Private
exports.addAndReport = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // destructure values from req.body
    const { track_title, artist_name, album_name, label, cat_id, year, disc_no, track_no, length, country, record_country, people, comment, isrc, report_id, user_id, sortable_rank, } = req.body;
    // see if artist exists
    const artist = yield Artist_1.Artist.findOne({ where: { name: artist_name } });
    if (!artist) {
        // create new artist
        const newArtist = yield Artist_1.Artist.create({
            name: artist_name,
        });
        console.log('created new artist', newArtist);
        // create new album
        const newAlbum = yield Album_1.Album.create({
            name: album_name,
            artist_id: newArtist.id,
            identifier: cat_id,
            label,
            year: year.toString(),
        });
        console.log('created new album', newAlbum);
        // create new track
        const newTrack = yield Track_1.Track.create({
            artist_id: newArtist.id,
            album_id: newAlbum.id,
            identifier: cat_id,
            label,
            name: track_title,
            disc_no,
            track_no,
            length,
            country,
            record_country,
            people,
            comment,
            user_id,
            isrc,
        });
        console.log('created new track', newTrack);
        // täs kohtaa lisää biisi report-träkkiin raportti-idn kans
        const newReportTrack = yield Report_Track_1.Report_Track.create({
            track_id: newTrack.id,
            report_id,
            length: newTrack.length,
            sortable_rank,
        });
        const trackToReturn = {
            track_id: newTrack.id,
            artist_id: newTrack.artist_id,
            album_id: newTrack.album_id,
            track_title: newTrack.name,
            artist_name,
            album_name,
            label,
            cat_id,
            year,
            disc_no,
            track_no,
            length,
            country: newTrack.country,
            record_country,
            sortable_rank,
            people: newTrack.people,
            comment,
            isrc,
            report_id,
            report_track_id: newReportTrack.id,
            user_id: newTrack.user_id,
            spotify_id: newTrack.spotify_id,
        };
        console.log('adding to report track', newReportTrack);
        console.log('track to return', trackToReturn);
        return res.status(201).json(trackToReturn);
    }
    else if (artist) {
        // see if album exists
        const album = yield Album_1.Album.findOne({
            where: { artist_id: artist.id, name: album_name },
        });
        if (!album) {
            // create new album
            const newAlbum = yield Album_1.Album.create({
                name: album_name,
                artist_id: artist.id,
                identifier: cat_id,
                label,
                year: year.toString(),
            });
            console.log('created new album', newAlbum);
            // create new track
            const newTrack = yield Track_1.Track.create({
                artist_id: artist.id,
                album_id: newAlbum.id,
                identifier: cat_id,
                label,
                name: track_title,
                disc_no,
                track_no,
                length,
                country,
                record_country,
                people,
                comment,
                isrc,
                user_id,
            });
            console.log('created new track', newTrack);
            // add track to report_track with report_id
            const newReportTrack = yield Report_Track_1.Report_Track.create({
                track_id: newTrack.id,
                report_id,
                length: newTrack.length,
                sortable_rank,
            });
            console.log('created new report-track', newReportTrack);
            const trackToReturn = {
                track_id: newTrack.id,
                artist_id: newTrack.artist_id,
                album_id: newTrack.album_id,
                track_title: newTrack.name,
                artist_name,
                album_name,
                label,
                cat_id,
                year,
                disc_no,
                track_no,
                length,
                country: newTrack.country,
                record_country,
                sortable_rank,
                people: newTrack.people,
                comment,
                isrc,
                report_id,
                report_track_id: newReportTrack.id,
                user_id: newTrack.user_id,
                spotify_id: newTrack.spotify_id,
            };
            console.log('track to return', trackToReturn);
            return res.status(201).json(trackToReturn);
        }
        else {
            // see if track exists
            const track = yield Track_1.Track.findOne({
                where: {
                    artist_id: artist.id,
                    album_id: album.id,
                    name: track_title,
                },
            });
            if (track) {
                // täs kohtaa lisää biisi report-träkkiin raportti-idn kans
                const newReportTrack = yield Report_Track_1.Report_Track.create({
                    track_id: track.id,
                    report_id,
                    length: track.length,
                    sortable_rank,
                });
                console.log('created new report track', newReportTrack);
                const trackToReturn = {
                    track_id: track.id,
                    artist_id: track.artist_id,
                    album_id: track.album_id,
                    track_title: track.name,
                    artist_name,
                    album_name,
                    label,
                    cat_id,
                    year,
                    disc_no,
                    track_no,
                    length,
                    country: track.country,
                    record_country,
                    sortable_rank,
                    people: track.people,
                    comment,
                    isrc,
                    report_id,
                    report_track_id: newReportTrack.id,
                    user_id: track.user_id,
                    spotify_id: track.spotify_id,
                };
                console.log('track to return', trackToReturn);
                return res.status(200).json(trackToReturn);
            }
            // create new track
            const newTrack = yield Track_1.Track.create({
                artist_id: artist.id,
                album_id: album.id,
                identifier: cat_id,
                label,
                name: track_title,
                disc_no,
                track_no,
                length,
                country,
                record_country,
                people,
                comment,
                user_id,
                isrc,
            });
            console.log('created new track', newTrack);
            // täs kohtaa lisää biisi report-träkkiin raportti-idn kans
            const newReportTrack = yield Report_Track_1.Report_Track.create({
                track_id: newTrack.id,
                report_id,
                length: newTrack.length,
                sortable_rank,
            });
            console.log('new report-track', newReportTrack);
            const trackToReturn = {
                track_id: newTrack.id,
                artist_id: newTrack.artist_id,
                album_id: newTrack.album_id,
                track_title: newTrack.name,
                artist_name,
                album_name,
                label,
                cat_id,
                year,
                disc_no,
                track_no,
                length,
                country: newTrack.country,
                record_country,
                sortable_rank,
                people: newTrack.people,
                comment,
                isrc,
                report_id,
                report_track_id: newReportTrack.id,
                user_id: newTrack.user_id,
                spotify_id: newTrack.spotify_id,
            };
            console.log('track to return', trackToReturn);
            return res.status(201).json(trackToReturn);
        }
    }
    return next(new errorResponse_1.default('unable to add track', 400));
}));
// @desc    Add new track to db
// @route   POST /addtodb
// @access  Private
exports.addNewTrack = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // destructure values from req.body
    const { track_title, artist_name, album_name, label, cat_id, year, disc_no, track_no, length, country, record_country, people, comment, isrc, user_id, } = req.body;
    // see if artist exists
    const artist = yield Artist_1.Artist.findOne({ where: { name: artist_name } });
    // uudet artistit crashaa siihen et ao id
    if (!artist) {
        // create new artist
        const newArtist = yield Artist_1.Artist.create({
            name: artist_name,
        });
        console.log('created new artist', newArtist);
        // create new album
        const newAlbum = yield Album_1.Album.create({
            name: album_name,
            artist_id: newArtist.id,
            identifier: cat_id,
            label,
            year: year.toString(),
        });
        console.log('created new album', newAlbum);
        // create new track
        const newTrack = yield Track_1.Track.create({
            artist_id: newArtist.id,
            album_id: newAlbum.id,
            identifier: cat_id,
            label,
            name: track_title,
            disc_no,
            track_no,
            length,
            country,
            record_country,
            people,
            comment,
            user_id,
            isrc,
        });
        console.log('created new track', newTrack);
        const trackToReturn = {
            track_id: newTrack.id,
            artist_id: newTrack.artist_id,
            album_id: newTrack.album_id,
            track_title: newTrack.name,
            artist_name,
            album_name,
            label,
            cat_id,
            year,
            disc_no,
            track_no,
            length,
            country: newTrack.country,
            record_country,
            people: newTrack.people,
            comment,
            isrc,
            user_id: newTrack.user_id,
            spotify_id: newTrack.spotify_id,
        };
        console.log('track to return', trackToReturn);
        res.status(201).json(trackToReturn);
    }
    else if (artist) {
        // see if album exists
        const album = yield Album_1.Album.findOne({
            where: { artist_id: artist.id, name: album_name },
        });
        if (!album) {
            // create new album
            const newAlbum = yield Album_1.Album.create({
                name: album_name,
                artist_id: artist.id,
                identifier: cat_id,
                label,
                year: year.toString(),
            });
            console.log('created new album', newAlbum);
            // create new track
            const newTrack = yield Track_1.Track.create({
                artist_id: artist.id,
                album_id: newAlbum.id,
                identifier: cat_id,
                label,
                name: track_title,
                disc_no,
                track_no,
                length,
                country,
                record_country,
                people,
                comment,
                isrc,
                user_id,
            });
            console.log('created new track', newTrack);
            const trackToReturn = {
                track_id: newTrack.id,
                artist_id: newTrack.artist_id,
                album_id: newTrack.album_id,
                track_title: newTrack.name,
                artist_name,
                album_name,
                label,
                cat_id,
                year,
                disc_no,
                track_no,
                length,
                country: newTrack.country,
                record_country,
                people: newTrack.people,
                comment,
                isrc,
                user_id: newTrack.user_id,
                spotify_id: newTrack.spotify_id,
            };
            console.log('track to return', trackToReturn);
            res.status(201).json(trackToReturn);
        }
        else {
            // see if track exists
            const track = yield Track_1.Track.findOne({
                where: {
                    artist_id: artist.id,
                    album_id: album.id,
                    name: track_title,
                },
            });
            console.log(track);
            if (track) {
                const trackToReturn = {
                    track_id: track.id,
                    artist_id: track.artist_id,
                    album_id: track.album_id,
                    track_title: track.name,
                    artist_name,
                    album_name,
                    label,
                    cat_id,
                    year,
                    disc_no,
                    track_no,
                    length,
                    country: track.country,
                    record_country,
                    people: track.people,
                    comment,
                    isrc,
                    user_id: track.user_id,
                    spotify_id: track.spotify_id,
                };
                console.log('track to return', trackToReturn);
                return res.status(200).json(trackToReturn);
            }
            // create new track
            const newTrack = yield Track_1.Track.create({
                artist_id: artist.id,
                album_id: album.id,
                identifier: cat_id,
                label,
                name: track_title,
                disc_no,
                track_no,
                length,
                country,
                record_country,
                people,
                comment,
                user_id,
                isrc,
            });
            console.log('created new track', newTrack);
            const trackToReturn = {
                track_id: newTrack.id,
                artist_id: newTrack.artist_id,
                album_id: newTrack.album_id,
                track_title: newTrack.name,
                artist_name,
                album_name,
                label,
                cat_id,
                year,
                disc_no,
                track_no,
                length,
                country: newTrack.country,
                record_country,
                people: newTrack.people,
                comment,
                isrc,
                user_id: newTrack.user_id,
                spotify_id: newTrack.spotify_id,
            };
            console.log('track to return', trackToReturn);
            res.status(201).json(trackToReturn);
        }
    }
    return next(new errorResponse_1.default('unable to add track', 400));
}));
// @desc    Add track to an existing album
// @route   POST /addtracktoalbum
// @access  Private
exports.addTrackToAlbum = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { track_title, artist_name, artist_id, album_id, cat_id, label, disc_no, track_no, length, country, record_country, people, comment, isrc, year, user_id, } = req.body;
    let stringifiedYear;
    if (year === null) {
        stringifiedYear = null;
    }
    else {
        stringifiedYear = year.toString();
    }
    const newTrack = yield Track_1.Track.create({
        artist_id,
        album_id,
        name: track_title,
        identifier: cat_id,
        label,
        side: disc_no,
        track_no,
        length,
        people,
        year: stringifiedYear,
        comment,
        record_country,
        country,
        isrc,
        user_id,
    });
    const trackToReturn = {
        track_id: newTrack.id,
        isrc,
        disc_no,
        track_no,
        track_title,
        artist_name,
        report_occurrence: 0,
    };
    res.status(201).json(trackToReturn);
}));
// @desc    Check if tracks fetched from playlog exist in db. Add new tracks to db and all to current report
// @route   POST /playlog
// @access  Private
exports.addPlaylogTracks = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // destructure values from req.body
    let { 
    // eslint-disable-next-line prefer-const
    track_title, artist_name, album_name, label, cat_id, year, disc_no, track_no, length, country, record_country, sortable_rank, people, comment, isrc, report_id, } = req.body;
    // see if artist name ends with , the
    const lastFive = artist_name.slice(artist_name.length - 5);
    if (lastFive.toLowerCase() === ', the') {
        artist_name = artist_name.substring(0, artist_name.length - 5);
        artist_name = `THE ${artist_name.toUpperCase()}`;
    }
    else {
        artist_name = artist_name.toUpperCase();
    }
    if (record_country === '') {
        record_country = null;
    }
    // see if artist exists
    // const artist = await Artist.findOne({ where: { name: artist_name } });
    const artist = yield Artist_1.Artist.findOne({
        where: database_1.db.Sequelize.where(database_1.db.Sequelize.fn('lower', database_1.db.Sequelize.col('name')), database_1.db.Sequelize.fn('lower', artist_name.toLowerCase())),
    });
    console.log('add djonline tracks artist', artist);
    // uudet artistit crashaa siihen et ao id
    if (!artist) {
        // create new artist
        const newArtist = yield Artist_1.Artist.create({
            name: artist_name,
        });
        console.log('created new artist', newArtist);
        // create new album
        const newAlbum = yield Album_1.Album.create({
            name: album_name,
            artist_id: newArtist.id,
            identifier: cat_id,
            label,
            year: year.toString(),
        });
        console.log('created new album', newAlbum);
        // create new track
        const newTrack = yield Track_1.Track.create({
            artist_id: newArtist.id,
            album_id: newAlbum.id,
            identifier: cat_id,
            label,
            name: track_title,
            disc_no,
            track_no,
            length,
            country,
            record_country,
            people,
            comment,
            isrc,
        });
        console.log('created new track', newTrack);
        // täs kohtaa lisää biisi report-träkkiin raportti-idn kans
        const newReportTrack = yield Report_Track_1.Report_Track.create({
            track_id: newTrack.id,
            report_id,
            length: newTrack.length,
            sortable_rank,
        });
        const trackToReturn = {
            track_id: newTrack.id,
            artist_id: newTrack.artist_id,
            album_id: newTrack.album_id,
            track_title: newTrack.name,
            artist_name,
            album_name,
            label,
            cat_id,
            year,
            disc_no,
            track_no,
            length,
            country: newTrack.country,
            record_country,
            sortable_rank,
            people: newTrack.people,
            isrc,
            report_track_id: newReportTrack.id,
        };
        console.log('adding to report track', newReportTrack);
        console.log('track to return', trackToReturn);
        res.status(201).json(trackToReturn);
    }
    else if (artist) {
        // see if album exists
        // const album = await Album.findOne({
        //   where: { artist_id: artist.id, name: album_name }
        // });
        const album = yield Album_1.Album.findOne({
            where: {
                artist_id: artist.id,
                $col: database_1.db.Sequelize.where(database_1.db.Sequelize.fn('lower', database_1.db.Sequelize.col('name')), database_1.db.Sequelize.fn('lower', album_name.toLowerCase())),
            },
        });
        console.log('add djonline tracks album', album);
        if (!album) {
            // create new album
            const newAlbum = yield Album_1.Album.create({
                name: album_name,
                artist_id: artist.id,
                identifier: cat_id,
                label,
                year: year.toString(),
            });
            console.log('created new album', newAlbum);
            // create new track
            const newTrack = yield Track_1.Track.create({
                artist_id: artist.id,
                album_id: newAlbum.id,
                identifier: cat_id,
                label,
                name: track_title,
                disc_no,
                track_no,
                length,
                country,
                record_country,
                people,
                comment,
                isrc,
            });
            console.log('created new track', newTrack);
            // täs kohtaa lisää biisi report-träkkiin raportti-idn kans
            const newReportTrack = yield Report_Track_1.Report_Track.create({
                track_id: newTrack.id,
                report_id,
                length: newTrack.length,
                sortable_rank,
            });
            console.log('created new report-track', newReportTrack);
            const trackToReturn = {
                track_id: newTrack.id,
                artist_id: newTrack.artist_id,
                album_id: newTrack.album_id,
                track_title: newTrack.name,
                artist_name,
                album_name,
                label,
                cat_id,
                year,
                disc_no,
                track_no,
                length,
                country: newTrack.country,
                record_country,
                sortable_rank,
                people: newTrack.people,
                isrc,
                report_track_id: newReportTrack.id,
            };
            console.log('track to return', trackToReturn);
            res.status(201).json(trackToReturn);
        }
        else {
            // see if track exists
            // const track = await Track.findOne({
            //   where: { artist_id: artist.id, album_id: album.id, name: track_title }
            // });
            const track = yield Track_1.Track.findOne({
                where: {
                    artist_id: artist.id,
                    album_id: album.id,
                    $col: database_1.db.Sequelize.where(database_1.db.Sequelize.fn('lower', database_1.db.Sequelize.col('name')), database_1.db.Sequelize.fn('lower', track_title.toLowerCase())),
                },
            });
            console.log('add djonline tracks track', track);
            if (track) {
                // täs kohtaa lisää biisi report-träkkiin raportti-idn kans
                const newReportTrack = yield Report_Track_1.Report_Track.create({
                    track_id: track.id,
                    report_id,
                    length: track.length,
                    sortable_rank,
                });
                console.log('created new report track', newReportTrack);
                const trackToReturn = {
                    track_id: track.id,
                    artist_id: track.artist_id,
                    album_id: track.album_id,
                    track_title: track.name,
                    artist_name,
                    album_name,
                    label,
                    cat_id,
                    year,
                    disc_no,
                    track_no,
                    length,
                    country: track.country,
                    record_country,
                    sortable_rank,
                    people: track.people,
                    comment,
                    isrc,
                    report_track_id: newReportTrack.id,
                };
                console.log('track to return', trackToReturn);
                return res.status(200).json(trackToReturn);
            }
            // create new track
            const newTrack = yield Track_1.Track.create({
                artist_id: artist.id,
                album_id: album.id,
                identifier: cat_id,
                label,
                name: track_title,
                disc_no,
                track_no,
                length,
                country,
                record_country,
                people,
                comment,
                isrc,
            });
            console.log('created new track', newTrack);
            // täs kohtaa lisää biisi report-träkkiin raportti-idn kans
            const newReportTrack = yield Report_Track_1.Report_Track.create({
                track_id: newTrack.id,
                report_id,
                length: newTrack.length,
                sortable_rank,
            });
            console.log('new report-track', newReportTrack);
            const trackToReturn = {
                track_id: newTrack.id,
                artist_id: newTrack.artist_id,
                album_id: newTrack.album_id,
                track_title: newTrack.name,
                artist_name,
                album_name,
                label,
                cat_id,
                year,
                disc_no,
                track_no,
                length,
                country: newTrack.country,
                record_country,
                sortable_rank,
                people: newTrack.people,
                isrc,
                report_track_id: newReportTrack.id,
            };
            console.log('track to return', trackToReturn);
            res.status(201).json(trackToReturn);
        }
    }
    return next(new errorResponse_1.default('unable to add track', 400));
}));
