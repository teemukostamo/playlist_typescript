import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../utils/errorResponse';
// eslint-disable-next-line
const errorHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err.message);

  let error = { ...err };
  error.message = err.message;
  // log error to console for dev
  console.log(err);

  // bad object id
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    const message = `object not found with the id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  // jwt error
  if (err.name === 'JsonWebTokenError') {
    const message = 'invalid token';
    error = new ErrorResponse(message, 401);
  }

  if (err.name === 'SequelizeAccessDeniedError') {
    const message = 'SequelizeAccessDeniedError: error accessing database';
    error = new ErrorResponse(message, 500);
  }

  if (err.name === 'SequelizeDatabaseError') {
    const message = 'SequelizeDatabaseError';
    error = new ErrorResponse(message, 500);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  errorHandler,
  unknownEndpoint
};
