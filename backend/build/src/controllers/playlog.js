"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.getPlaylogData = (req, res, _next) => {
    console.log('playlog req query', req.query);
    res
        .status(200)
        .sendFile(path_1.default.join(__dirname, '../../playlog', `${req.query.date}.json`));
};
