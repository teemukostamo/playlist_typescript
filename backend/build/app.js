"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import models
const database_1 = require("./src/config/database");
const Album_1 = require("./src/models/Album");
const Artist_1 = require("./src/models/Artist");
const Program_1 = require("./src/models/Program");
const Report_Track_1 = require("./src/models/Report_Track");
const Report_Transfer_1 = require("./src/models/Report_Transfer");
const Report_1 = require("./src/models/Report");
const Track_1 = require("./src/models/Track");
const User_1 = require("./src/models/User");
// import routes
const artists_1 = __importDefault(require("./src/routes/artists"));
const top100_1 = __importDefault(require("./src/routes/top100"));
const login_1 = __importDefault(require("./src/routes/login"));
// import middleware
const logger_1 = require("./src/middleware/logger");
const error_1 = require("./src/middleware/error");
const app = express_1.default();
app.use(express_1.default.json());
database_1.db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch((err) => console.log(`Error: ${err}`));
database_1.db.addModels([
    Album_1.Album,
    Artist_1.Artist,
    Program_1.Program,
    Report_Track_1.Report_Track,
    Report_Transfer_1.Report_Transfer,
    Report_1.Report,
    Track_1.Track,
    User_1.User
]);
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use(logger_1.logger);
app.use('/api/artists', artists_1.default);
app.use('/api/top100', top100_1.default);
app.use('/api/login', login_1.default);
app.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.use(error_1.unknownEndpoint);
app.use(error_1.errorHandler);
exports.default = app;
