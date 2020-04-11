"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
// const config: Config = {};
// config.port = process.env.PORT || '5000';
// config.secret = process.env.SECRET || 'yolo';
// config.db = {};
// config.db.uri = process.env.DB_URI || 'localhost';
// config.db.name = process.env.DB_NAME || 'playlist';
// config.db.secret = process.env.DB_SECRET || 'salainen';
// config.db.user = process.env.DB_USER || 'root';
// if (process.env.NODE_ENV === 'test') {
//   config.db.uri = process.env.TEST_DB_URI || 'local';
//   config.db.name = process.env.TEST_DB_NAME || 'playlist_dev';
// }
const dburi = process.env.DB_URI || 'localhost';
let dbName = process.env.DB_NAME || 'playlist';
const dbSecret = process.env.DB_SECRET || 'salainen';
const dbUser = process.env.DB_USER || 'root';
const port = process.env.PORT || '5000';
if (process.env.NODE_ENV === 'test') {
    dbName = process.env.TEST_DB_NAME || 'playlist-raw';
}
// const testDbName: string = process.env.TEST_DB_NAME || 'playlist-raw';
const jwtSecret = process.env.SECRET || 'unauthorized';
exports.default = {
    dburi,
    dbName,
    dbSecret,
    dbUser,
    port,
    jwtSecret,
};
