import express from 'express';

export const logger = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) => {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('Body:  ', req.body);
  console.log('---');
  next();
};
