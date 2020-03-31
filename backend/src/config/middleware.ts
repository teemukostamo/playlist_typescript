export const errorHandler = (
  error: { message: any; name: string; kind: string },
  _req: any,
  res: {
    status: (
      arg0: number
    ) => {
      (): any;
      new (): any;
      send: { (arg0: { error: string }): any; new (): any };
      json: { (arg0: { error: any }): any; new (): any };
    };
  },
  next: (arg0: any) => void
) => {
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

export const getTokenFrom = (req: { get: (arg0: string) => any }) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log('token is ok');
    const token = authorization.substring(7);
    return token;
  }
  return null;
};
