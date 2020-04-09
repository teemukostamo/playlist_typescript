import { Sequelize } from 'sequelize-typescript';
import config from './config';

console.log(config.dbName);

// localhost devausta varten
export const db = new Sequelize(config.dbName, config.dbUser, config.dbSecret, {
  host: config.dburi,
  dialect: 'mysql',
  storage: ':memory:',
  models: [__dirname + '../models'],
  // dialectOptions: {
  //   ssl: {
  //     key: config.CLIENT_KEY,
  //     cert: config.CLIENT_CERT,
  //     ca: config.SERVER_CA
  //   }
  // },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
