import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { asyncHandler } from './async';
import ErrorResponse from '../utils/errorResponse';
// import { User } from '../models/User';
import { jwtSecret } from '../config/config';

interface GetUserAuthInfoRequest extends Request {
  user: unknown;
}

export const verifyUser = asyncHandler(
  (req: GetUserAuthInfoRequest, _res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.toLowerCase().startsWith('bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ErrorResponse('Token missing or invalid!', 401));
    }

    try {
      // verify token
      const decoded = jwt.verify(token, jwtSecret);
      console.log('decoded', decoded);
      req.user = decoded;
      next();
    } catch (error) {
      return next(new ErrorResponse('Token missing or invalid!', 401));
    }
  }
);
