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
/* eslint-disable no-control-regex */
// eslint-disable-next-line no-misleading-character-class
const re = /[\0-\x1F\x7F-\x9F\xAD\u0378\u0379\u037F-\u0383\u038B\u038D\u03A2\u0528-\u0530\u0557\u0558\u0560\u0588\u058B-\u058E\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08A1\u08AD-\u08E3\u08FF\u0978\u0980\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0C00\u0C04\u0C0D\u0C11\u0C29\u0C34\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C81\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D01\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169F\u16F1-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191D-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7-\u1CFF\u1DE7-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BB-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E3C-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FCD-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA698-\uA69E\uA6F8-\uA6FF\uA78F\uA794-\uA79F\uA7AB-\uA7F7\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9E0-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAA7C-\uAA7F\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE27-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]/g;
const cr13 = String.fromCharCode(parseInt('&#013;', 16));
const lf10 = String.fromCharCode(parseInt('&#010;', 16));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const windows_1252_1 = __importDefault(require("windows-1252"));
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
const Report_Transfer_1 = require("../models/Report_Transfer");
const async_1 = require("../middleware/async");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// @desc    Get all transfers
// @route   GET /
// @access  Private
exports.getAllTransfers = async_1.asyncHandler((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transfers = yield database_1.db.query(`
      SELECT rt.id
      , rt.user_id
      , us.username
      , us.first_name
      , us.last_name
      , rt.status
      , rt.filename
      , rt.period
      , rt.created_at
      , rt.updated_at 
     FROM playlist__report_transfer as rt
     INNER JOIN playlist__user as us ON rt.user_id = us.id
     ORDER BY created_at DESC
      `, {
        type: sequelize_1.QueryTypes.SELECT
    });
    res.status(200).json(transfers);
}));
// @desc    Send REPORTSOFAMONTH.txt-file to client
// @route   GET /:filename
// @access  Private
exports.sendFileToClient = async_1.asyncHandler((req, res) => {
    res.download(path_1.default.join(__dirname, `../transfers/${req.params.filename}`));
});
// @desc    Generate report transfer by date - get tracks from db, parse to teosto-required format and create txt-file
// @route   POST /
// @access  Private
exports.generateTransferFile = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, status, filename, period } = req.body;
    const arrayWithTracks = yield database_1.db.query(`
      SELECT re.program_date
      , re.program_start_time
      , re.program_end_time
      , pr.name as program_name
      , ar.name as artist_name
      , tr.name as track_title
      , tr.length
      , tr.people as copyright_holders
      , tr.country
      , tr.record_country
      , al.label
      , al.identifier as cat_id
      , tr.isrc
      , tr.side as disc_no
      , tr.track_no
      , al.year
      FROM playlist__report as re 
      INNER JOIN playlist__program as pr ON re.program_id = pr.id
      INNER JOIN playlist__report_track as rt ON rt.report_id = re.id
      INNER JOIN playlist__track as tr ON rt.track_id = tr.id
      INNER JOIN playlist__artist as ar ON tr.artist_id = ar.id
      INNER JOIN playlist__album as al ON al.artist_id = ar.id AND tr.album_id = al.id
      WHERE re.status = 1
      AND re.program_date like "${period}%"
      ORDER BY program_date ASC, program_start_time ASC
      LIMIT 30000
      `, {
        type: sequelize_1.QueryTypes.SELECT
    });
    if (arrayWithTracks) {
        // console.log('tracks to put in report', arrayWithTracks);
        const placeholder = {
            track_title: '                                                  ',
            copyright_holder_1: '                              ',
            copyright_holder_2: '                              ',
            copyright_holder_3: '                              ',
            copyright_holder_4: '                              ',
            copyright_holder_5: '                              ',
            artist_name: '                         ',
            label: '                    ',
            cat_id: '               ',
            program_name: '                                                               ',
            isrc: '            ',
            comment: '                                                                               '
        };
        const newArr = [];
        arrayWithTracks.forEach(track => {
            // get program date, remove dashes and two first numbers
            const new_program_date = windows_1252_1.default
                .encode(track.program_date.replace(/-/g, ''), {
                mode: 'html'
            })
                .substring(2);
            console.log('new program date', new_program_date);
            console.log('new program date length', new_program_date.length);
            // get program start and end time, remove colons and replace last zeroes with two spaces
            const new_program_start_time = windows_1252_1.default.encode(`${track.program_start_time.replace(/:/g, '').slice(0, -2)}  `, {
                mode: 'html'
            });
            console.log('new program start time', new_program_start_time);
            console.log('new program start time length', new_program_start_time.length);
            const new_programm_end_time = windows_1252_1.default.encode(`${track.program_end_time.replace(/:/g, '').slice(0, -2)}  `, {
                mode: 'html'
            });
            console.log('new program end time', new_programm_end_time);
            console.log('new program end time length', new_programm_end_time.length);
            // get track title, remove track name length from placeholder, then add to remaining placeholder
            const track_title_maxlength = 50;
            let new_track_title = track.track_title.replace(re, ' ').toUpperCase() +
                placeholder.track_title.substring(track.track_title.length);
            new_track_title = windows_1252_1.default
                .encode(new_track_title, {
                mode: 'html'
            })
                .substring(0, track_title_maxlength);
            console.log('new track title', new_track_title);
            console.log('new track title length', new_track_title.length);
            // get length, add zero to beginning if necessary
            let minutes = Math.floor(track.length / 60);
            let seconds = track.length % 60;
            if (minutes.toString().length === 1) {
                minutes = windows_1252_1.default.encode(`0${minutes.toString()}`);
            }
            else {
                minutes = windows_1252_1.default.encode(minutes.toString());
            }
            if (seconds.toString().length === 1) {
                seconds = windows_1252_1.default.encode(`0${seconds.toString()}`);
            }
            else {
                seconds = windows_1252_1.default.encode(seconds.toString());
            }
            const new_length = minutes + seconds;
            console.log('new length', new_length);
            // get country - FI=1, else = ' '
            let new_country;
            if (track.country === 1) {
                const intCountry = 1;
                new_country = windows_1252_1.default.encode(intCountry.toString());
            }
            else {
                new_country = windows_1252_1.default.encode(' ');
            }
            console.log('new country', new_country);
            console.log('new country length', new_country.length);
            // get artist name
            const artist_maxlength = 25;
            let new_artist_name = track.artist_name.replace(re, ' ').toUpperCase() +
                placeholder.artist_name.substring(track.artist_name.length);
            new_artist_name = windows_1252_1.default
                .encode(new_artist_name, {
                mode: 'html'
            })
                .substring(0, artist_maxlength);
            console.log('new artist name', new_artist_name);
            console.log('new artist name length', new_artist_name.length);
            // get label
            const label_maxlength = 20;
            let new_label;
            if (track.label === null) {
                new_label = windows_1252_1.default.encode(placeholder.label);
            }
            else {
                new_label =
                    track.label.replace(re, ' ').toUpperCase() +
                        placeholder.label.substring(track.label.length);
                new_label = windows_1252_1.default
                    .encode(new_label, {
                    mode: 'html'
                })
                    .substring(0, label_maxlength);
            }
            console.log('new label', new_label);
            console.log('new label length', new_label.length);
            // get cat id
            const cat_id_maxlength = 15;
            let new_cat_id;
            if (track.cat_id === null) {
                const unknown = 'EI ILMOITETTU';
                new_cat_id = unknown + placeholder.cat_id.substring(unknown.length);
                new_cat_id = windows_1252_1.default.encode(new_cat_id);
            }
            else {
                new_cat_id =
                    track.cat_id.replace(re, ' ').toUpperCase() +
                        placeholder.cat_id.substring(track.cat_id.length);
                new_cat_id = windows_1252_1.default
                    .encode(new_cat_id, {
                    mode: 'html'
                })
                    .substring(0, cat_id_maxlength);
            }
            console.log('new cat_id', new_cat_id);
            console.log('new cat_id length', new_cat_id.length);
            // HANDLE TOO LONG DISCNO & TRACKNO .substr(0, 2)
            // get disc no
            let new_disc_no;
            if (track.disc_no === null) {
                new_disc_no = windows_1252_1.default.encode(' ');
            }
            else if (track.disc_no.toString().length === 1) {
                new_disc_no = track.disc_no.toString();
                new_disc_no = windows_1252_1.default.encode(new_disc_no, {
                    mode: 'html'
                });
            }
            else {
                new_disc_no = windows_1252_1.default
                    .encode(track.disc_no.toString(), {
                    mode: 'html'
                })
                    .substr(0, 1);
            }
            console.log('new disc no', new_disc_no);
            console.log('new disc no length', new_disc_no.length);
            // get track no
            let new_track_no;
            if (track.track_no === null) {
                new_track_no = windows_1252_1.default.encode('  ');
            }
            else if (track.track_no.toString().length === 1) {
                new_track_no = windows_1252_1.default.encode(` ${track.track_no.toString()}`, {
                    mode: 'html'
                });
            }
            else if (track.track_no.toString().length === 2) {
                new_track_no = windows_1252_1.default.encode(track.track_no.toString(), {
                    mode: 'html'
                });
            }
            else {
                new_track_no = windows_1252_1.default
                    .encode(track.track_no.toString(), {
                    mode: 'html'
                })
                    .substr(0, 2);
            }
            console.log('new track no', new_track_no);
            console.log('new track no length', new_track_no.length);
            console.log('new track no typeof', typeof new_track_no);
            // get record country
            let new_record_country;
            if (track.record_country === null || track.record_country === '') {
                new_record_country = windows_1252_1.default.encode('   ');
            }
            else {
                new_record_country = windows_1252_1.default.encode(`${track.record_country} `, {
                    mode: 'html'
                });
            }
            console.log('new record country', new_record_country);
            console.log('new record country length', new_record_country.length);
            console.log('new record country typeof', typeof new_record_country);
            // get program name
            const program_name_maxlength = 63;
            let new_program_name = track.program_name.replace(re, ' ').toUpperCase() +
                placeholder.program_name.substring(track.program_name.length);
            new_program_name = windows_1252_1.default
                .encode(new_program_name, {
                mode: 'html'
            })
                .substring(0, program_name_maxlength);
            console.log('new program name', new_program_name);
            console.log('new program name length', new_program_name.length);
            // get year
            let new_year;
            // console.log(typeof track.year);
            if (track.year === null) {
                new_year = windows_1252_1.default.encode('    ');
            }
            else {
                new_year = windows_1252_1.default
                    .encode(track.year, {
                    mode: 'html'
                })
                    .substring(0, 4);
            }
            console.log('new year', new_year);
            console.log('new year length', new_year.length);
            // get isrc
            const isrc_maxlength = 12;
            let new_isrc;
            if (track.isrc === null) {
                new_isrc = windows_1252_1.default.encode(placeholder.isrc);
            }
            else {
                new_isrc =
                    track.isrc.replace(re, ' ').toUpperCase() +
                        placeholder.isrc.substring(track.isrc.length);
                new_isrc = windows_1252_1.default
                    .encode(new_isrc, {
                    mode: 'html'
                })
                    .substring(0, isrc_maxlength);
            }
            console.log('new isrc', new_isrc);
            console.log('new isrc length', new_isrc.length);
            // handle copyright holders
            const copyright_holder_maxlength = 30;
            let new_copyright_holder_1;
            let new_copyright_holder_2;
            let new_copyright_holder_3;
            let new_copyright_holder_4;
            let new_copyright_holder_5;
            // if copyright holders is null insert placeholder values to array, else parse through values
            if (track.copyright_holders === null) {
                new_copyright_holder_1 = windows_1252_1.default.encode(placeholder.copyright_holder_1);
                new_copyright_holder_2 = windows_1252_1.default.encode(placeholder.copyright_holder_2);
                new_copyright_holder_3 = windows_1252_1.default.encode(placeholder.copyright_holder_3);
                new_copyright_holder_4 = windows_1252_1.default.encode(placeholder.copyright_holder_4);
                new_copyright_holder_5 = windows_1252_1.default.encode(placeholder.copyright_holder_5);
            }
            else {
                const new_copyright_holders = track.copyright_holders.split('|');
                new_copyright_holders.pop();
                new_copyright_holders.shift();
                if (new_copyright_holders.length === 1) {
                    new_copyright_holder_1 =
                        new_copyright_holders[0]
                            .slice(1, -1)
                            .replace(re, ' ')
                            .toUpperCase() +
                            placeholder.copyright_holder_1.substring(new_copyright_holders[0].slice(1, -1).length);
                    new_copyright_holder_1 = new_copyright_holder_1.substring(0, copyright_holder_maxlength);
                    new_copyright_holder_2 = placeholder.copyright_holder_2;
                    new_copyright_holder_3 = placeholder.copyright_holder_3;
                    new_copyright_holder_4 = placeholder.copyright_holder_4;
                    new_copyright_holder_5 = placeholder.copyright_holder_5;
                }
                else if (new_copyright_holders.length === 2) {
                    new_copyright_holder_1 =
                        new_copyright_holders[0]
                            .slice(1, -1)
                            .replace(re, ' ')
                            .toUpperCase() +
                            placeholder.copyright_holder_1.substring(new_copyright_holders[0].slice(1, -1).length);
                    new_copyright_holder_1 = new_copyright_holder_1.substring(0, copyright_holder_maxlength);
                    new_copyright_holder_2 =
                        new_copyright_holders[1]
                            .slice(1, -1)
                            .replace(re, ' ')
                            .toUpperCase() +
                            placeholder.copyright_holder_1.substring(new_copyright_holders[1].slice(1, -1).length);
                    new_copyright_holder_2 = new_copyright_holder_2.substring(0, copyright_holder_maxlength);
                    new_copyright_holder_3 = placeholder.copyright_holder_3;
                    new_copyright_holder_4 = placeholder.copyright_holder_4;
                    new_copyright_holder_5 = placeholder.copyright_holder_5;
                }
                else if (new_copyright_holders.length === 3) {
                    new_copyright_holder_1 =
                        new_copyright_holders[0]
                            .slice(1, -1)
                            .replace(re, ' ')
                            .toUpperCase() +
                            placeholder.copyright_holder_1.substring(new_copyright_holders[0].slice(1, -1).length);
                    new_copyright_holder_1 = new_copyright_holder_1.substring(0, copyright_holder_maxlength);
                    new_copyright_holder_2 =
                        new_copyright_holders[1]
                            .slice(1, -1)
                            .replace(re, ' ')
                            .toUpperCase() +
                            placeholder.copyright_holder_2.substring(new_copyright_holders[1].slice(1, -1).length);
                    new_copyright_holder_2 = new_copyright_holder_2.substring(0, copyright_holder_maxlength);
                    new_copyright_holder_3 =
                        new_copyright_holders[2]
                            .slice(1, -1)
                            .replace(re, ' ')
                            .toUpperCase() +
                            placeholder.copyright_holder_3.substring(new_copyright_holders[2].slice(1, -1).length);
                    new_copyright_holder_3 = new_copyright_holder_3.substring(0, copyright_holder_maxlength);
                    new_copyright_holder_4 = placeholder.copyright_holder_4;
                    new_copyright_holder_5 = placeholder.copyright_holder_5;
                }
                else if (new_copyright_holders.length === 4) {
                    new_copyright_holder_1 =
                        new_copyright_holders[0]
                            .slice(1, -1)
                            .replace(re, ' ')
                            .toUpperCase() +
                            placeholder.copyright_holder_1.substring(new_copyright_holders[0].slice(1, -1).length);
                    new_copyright_holder_1 = new_copyright_holder_1.substring(0, copyright_holder_maxlength);
                    new_copyright_holder_2 =
                        new_copyright_holders[1]
                            .slice(1, -1)
                            .replace(re, ' ')
                            .toUpperCase() +
                            placeholder.copyright_holder_2.substring(new_copyright_holders[1].slice(1, -1).length);
                    new_copyright_holder_2 = new_copyright_holder_2.substring(0, copyright_holder_maxlength);
                    new_copyright_holder_3 =
                        new_copyright_holders[2]
                            .slice(1, -1)
                            .replace(re, ' ')
                            .toUpperCase() +
                            placeholder.copyright_holder_3.substring(new_copyright_holders[2].slice(1, -1).length);
                    new_copyright_holder_3 = new_copyright_holder_3.substring(0, copyright_holder_maxlength);
                    new_copyright_holder_4 =
                        new_copyright_holders[3]
                            .slice(1, -1)
                            .replace(re, ' ')
                            .toUpperCase() +
                            placeholder.copyright_holder_4.substring(new_copyright_holders[3].slice(1, -1).length);
                    new_copyright_holder_4 = new_copyright_holder_4.substring(0, copyright_holder_maxlength);
                    new_copyright_holder_5 = placeholder.copyright_holder_5;
                }
                else if (new_copyright_holders.length === 5) {
                    new_copyright_holder_1 =
                        new_copyright_holders[0]
                            .slice(1, -1)
                            .replace(re, ' ')
                            .toUpperCase() +
                            placeholder.copyright_holder_1.substring(new_copyright_holders[0].slice(1, -1).length);
                    new_copyright_holder_1 = new_copyright_holder_1.substring(0, copyright_holder_maxlength);
                    new_copyright_holder_2 =
                        new_copyright_holders[1]
                            .slice(1, -1)
                            .replace(re, ' ')
                            .toUpperCase() +
                            placeholder.copyright_holder_2.substring(new_copyright_holders[1].slice(1, -1).length);
                    new_copyright_holder_2 = new_copyright_holder_2.substring(0, copyright_holder_maxlength);
                    new_copyright_holder_3 =
                        new_copyright_holders[2]
                            .slice(1, -1)
                            .replace(re, ' ')
                            .toUpperCase() +
                            placeholder.copyright_holder_3.substring(new_copyright_holders[2].slice(1, -1).length);
                    new_copyright_holder_3 = new_copyright_holder_3.substring(0, copyright_holder_maxlength);
                    new_copyright_holder_4 =
                        new_copyright_holders[3]
                            .slice(1, -1)
                            .replace(re, ' ')
                            .toUpperCase() +
                            placeholder.copyright_holder_4.substring(new_copyright_holders[3].slice(1, -1).length);
                    new_copyright_holder_4 = new_copyright_holder_4.substring(0, copyright_holder_maxlength);
                    new_copyright_holder_5 =
                        new_copyright_holders[4]
                            .slice(1, -1)
                            .replace(re, ' ')
                            .toUpperCase() +
                            placeholder.copyright_holder_5.substring(new_copyright_holders[4].slice(1, -1).length);
                    new_copyright_holder_5 = new_copyright_holder_5.substring(0, copyright_holder_maxlength);
                }
                else {
                    new_copyright_holder_1 = placeholder.copyright_holder_1;
                    new_copyright_holder_2 = placeholder.copyright_holder_2;
                    new_copyright_holder_3 = placeholder.copyright_holder_3;
                    new_copyright_holder_4 = placeholder.copyright_holder_4;
                    new_copyright_holder_5 = placeholder.copyright_holder_5;
                }
            }
            console.log('new copyright holder 1', new_copyright_holder_1);
            console.log('new copyright holder 1 length', new_copyright_holder_1.length);
            console.log('new copyright holder 2', new_copyright_holder_2);
            console.log('new copyright holder 2 length', new_copyright_holder_2.length);
            console.log('new copyright holder 3', new_copyright_holder_3);
            console.log('new copyright holder 3 length', new_copyright_holder_3.length);
            console.log('new copyright holder 4', new_copyright_holder_4);
            console.log('new copyright holder 4 length', new_copyright_holder_4.length);
            console.log('new copyright holder 5', new_copyright_holder_5);
            console.log('new copyright holder 5 length', new_copyright_holder_5.length);
            newArr.push({
                program_date: new_program_date,
                program_start_time: new_program_start_time,
                program_end_time: new_programm_end_time,
                teosto_id: '2592',
                track_title: new_track_title,
                helper_field: '00',
                length: new_length,
                times: '0001',
                copyright_holder_1: windows_1252_1.default.encode(new_copyright_holder_1, {
                    mode: 'html'
                }),
                copyright_holder_2: windows_1252_1.default.encode(new_copyright_holder_2, {
                    mode: 'html'
                }),
                copyright_holder_3: windows_1252_1.default.encode(new_copyright_holder_3, {
                    mode: 'html'
                }),
                copyright_holder_4: windows_1252_1.default.encode(new_copyright_holder_4, {
                    mode: 'html'
                }),
                copyright_holder_5: windows_1252_1.default.encode(new_copyright_holder_5, {
                    mode: 'html'
                }),
                country: new_country,
                artist_name: new_artist_name,
                label: new_label,
                cat_id: new_cat_id,
                disc_no: new_disc_no,
                track_no: new_track_no,
                record_country: new_record_country,
                type: '1',
                jingle: ' ',
                program_name: new_program_name,
                year: new_year,
                isrc: new_isrc,
                comment: placeholder.comment,
                handle_code: '1'
            });
        });
        const exportArr = [];
        newArr.forEach(field => exportArr.push(`${field.program_date}${field.program_start_time}${field.program_end_time}${field.teosto_id}${field.track_title}${field.helper_field}${field.length}${field.times}${field.copyright_holder_1}${field.copyright_holder_2}${field.copyright_holder_3}${field.copyright_holder_4}${field.copyright_holder_5}${field.country}${field.artist_name}${field.label}${field.cat_id}${field.disc_no}${field.track_no}${field.record_country}${field.type}${field.jingle}${field.program_name}${field.year}${field.isrc}${field.comment}${field.handle_code}${cr13}${lf10}`));
        const file = fs_1.default.createWriteStream(path_1.default.join(__dirname, `../transfers/${filename}`));
        file.on('error', function (err) {
            console.log(err);
        });
        exportArr.forEach(function (v) {
            file.write(`${v}\n`);
        });
        file.end();
        const transferInfo = yield Report_Transfer_1.Report_Transfer.create({
            user_id,
            status,
            filename,
            period
        });
        console.log(transferInfo);
        res.status(200).json(transferInfo);
    }
    else {
        // eslint-disable-next-line no-new
        new errorResponse_1.default('Problem generating file', 404);
    }
}));
