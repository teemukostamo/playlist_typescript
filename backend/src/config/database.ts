// import mysql2 from 'mysql2'
import { Sequelize } from 'sequelize-typescript';
import config from './config';

console.log('connecting to db ', config.dbName);

// const connection = mysql2.createConnection({
//   host: dbVars.host,
//   user: dbVars.user,
//   database: dbVars.database,
//   password: dbVars.password,
//   ssl: {
//     key: cKey,
//     cert: cCert,
//     ca: cCA
//   }
// });

// localhost devausta varten
export const db = new Sequelize(config.dbName, config.dbUser, config.dbSecret, {
  host: config.dburi,
  dialect: 'mysql',
  // dialectOptions: {
  //   ssl: {
  //     key: config.client_key,
  //     cert: config.client_cert,
  //     ca: config.server_ca,
  //   },
  // },
  storage: ':memory:',
  models: [__dirname + '../models'],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
