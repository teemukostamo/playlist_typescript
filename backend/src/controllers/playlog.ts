import { Request, Response, NextFunction } from 'express';
import path from 'path';

export const getPlaylogData = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log('playlog req query', req.query);
  res
    .status(200)
    .sendFile(path.join(__dirname, '../../playlog', `${req.query.date}.json`));
};
