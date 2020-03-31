import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// import db
import { db } from './src/config/database';

import { logger } from './src/middleware/logger';

const app = express();
app.use(express.json());

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err: string) => console.log(`Error: ${err}`));

app.use(bodyParser.json());
app.use(cors());
app.use(logger);

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

export default app;
