import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const dburi: string = process.env.DB_URI || 'localhost';
let dbName: string = process.env.DB_NAME || 'playlist_demo';
const dbSecret: string = process.env.DB_SECRET || 'salainen';
const dbUser: string = process.env.DB_USER || 'root';
const port: string = process.env.PORT || '5000';

// const client_cert: string =
//   Buffer.from(process.env.CLIENT_CERT, 'base64') || 'undefined';

// const client_key: string =
//   Buffer.from(process.env.CLIENT_KEY, 'base64') || 'undefined';

// const server_ca: string =
//   Buffer.from(process.env.SERVER_CA, 'base64') || 'undefined';

if (process.env.NODE_ENV === 'test') {
  dbName = process.env.TEST_DB_NAME || 'playlist_test';
}

const jwtSecret: string = process.env.SECRET || 'unauthorized';

export default {
  dburi,
  dbName,
  dbSecret,
  dbUser,
  port,
  jwtSecret,
};
