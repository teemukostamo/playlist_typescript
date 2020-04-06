"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("./config");
// localhost devausta varten
exports.db = new sequelize_typescript_1.Sequelize(config_1.dbName, config_1.dbUser, config_1.dbSecret, {
    host: config_1.dburi,
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
        idle: 10000
    }
});
