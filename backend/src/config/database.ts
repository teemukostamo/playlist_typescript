import { Sequelize } from 'sequelize';
import { dburi, dbName, dbSecret, dbUser } from './config';

// localhost devausta varten
export const db = new Sequelize(dbName, dbUser, dbSecret, {
  host: dburi,
  dialect: 'mysql',
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
    idle: 10000
  }
});
