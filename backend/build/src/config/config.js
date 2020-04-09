'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
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
exports.dburi = process.env.DB_URI || 'localhost';
exports.dbName = process.env.DB_NAME || 'playlist';
exports.dbSecret = process.env.DB_SECRET || 'salainen';
exports.dbUser = process.env.DB_USER || 'root';
exports.port = process.env.PORT || '5000';
exports.jwtSecret = process.env.SECRET || 'unauthorized';
