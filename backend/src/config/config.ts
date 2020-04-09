import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
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

const dburi: string = process.env.DB_URI || 'localhost';
let dbName: string = process.env.DB_NAME || 'playlist';
const dbSecret: string = process.env.DB_SECRET || 'salainen';
const dbUser: string = process.env.DB_USER || 'root';
const port: string = process.env.PORT || '5000';

if (process.env.NODE_ENV === 'test') {
  dbName = process.env.TEST_DB_NAME || 'playlist-raw';
}

// const testDbName: string = process.env.TEST_DB_NAME || 'playlist-raw';

const jwtSecret: string = process.env.SECRET || 'unauthorized';

export default {
  dburi,
  dbName,
  dbSecret,
  dbUser,
  port,
  jwtSecret,
};
