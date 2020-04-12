"use strict";
// declare const Buffer;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
const dburi = process.env.DB_URI || 'localhost';
let dbName = process.env.DB_NAME || 'playlist';
const dbSecret = process.env.DB_SECRET || 'salainen';
const dbUser = process.env.DB_USER || 'root';
const port = process.env.PORT || '5000';
// const client_cert: string =
//   Buffer.from(process.env.CLIENT_CERT, 'base64') || 'undefined';
// const client_key: string =
//   Buffer.from(process.env.CLIENT_KEY, 'base64') || 'undefined';
// const server_ca: string =
//   Buffer.from(process.env.SERVER_CA, 'base64') || 'undefined';
if (process.env.NODE_ENV === 'test') {
    dbName = process.env.TEST_DB_NAME || 'playlist_test';
}
const jwtSecret = process.env.SECRET || 'unauthorized';
exports.default = {
    dburi,
    dbName,
    dbSecret,
    dbUser,
    port,
    jwtSecret,
};
