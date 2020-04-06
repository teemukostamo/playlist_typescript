"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
exports.errorHandler = (err, _req, res, _next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    console.log(err);
    // bad object id
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        const message = `object not found with the id ${err.value}`;
        error = new errorResponse_1.default(message, 404);
    }
    // validation error
    // if (err.name === 'ValidationError') {
    //   const message = Object.values(err.errors).map(val => val.message);
    //   error = new ErrorResponse(message, 400);
    // }
    // jwt error
    if (err.name === 'JsonWebTokenError') {
        const message = 'invalid token';
        error = new errorResponse_1.default(message, 401);
    }
    if (err.name === 'SequelizeAccessDeniedError') {
        const message = 'SequelizeAccessDeniedError: error accessing database';
        error = new errorResponse_1.default(message, 500);
    }
    if (err.name === 'SequelizeDatabaseError') {
        const message = 'SequelizeDatabaseError';
        error = new errorResponse_1.default(message, 500);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};
exports.unknownEndpoint = (_req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
