"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = (error, _req, res, next) => {
    console.error(error.message);
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' });
    }
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
        });
    }
    if (error.name === 'SequelizeAccessDeniedError') {
        return res.status(500).json({
            error: 'SequelizeAccessDeniedError: error accessing database'
        });
    }
    if (error.name === 'SequelizeDatabaseError') {
        return res.status(500).json({
            error
        });
    }
    next(error);
};
exports.getTokenFrom = (req) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        console.log('token is ok');
        const token = authorization.substring(7);
        return token;
    }
    return null;
};
