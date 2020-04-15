"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import mysql2 from 'mysql2'
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("./config"));
console.log('connecting to db ', config_1.default.dbName);
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
exports.db = new sequelize_typescript_1.Sequelize(config_1.default.dbName, config_1.default.dbUser, config_1.default.dbSecret, {
    host: config_1.default.dburi,
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
