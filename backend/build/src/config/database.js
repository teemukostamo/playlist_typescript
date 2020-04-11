"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("./config"));
console.log(config_1.default.dbName);
// localhost devausta varten
exports.db = new sequelize_typescript_1.Sequelize(config_1.default.dbName, config_1.default.dbUser, config_1.default.dbSecret, {
    host: config_1.default.dburi,
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
