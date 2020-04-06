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

export const dburi: string = process.env.DB_URI || 'localhost';
export const dbName: string = process.env.DB_NAME || 'playlist';
export const dbSecret: string = process.env.DB_SECRET || 'salainen';
export const dbUser: string = process.env.DB_USER || 'root';
export const port: string = process.env.PORT || '5000';

export const jwtSecret: string = process.env.SECRET || 'unauthorized';
