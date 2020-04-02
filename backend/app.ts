import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// import db
import { db } from './src/config/database';
import { Album } from './src/models/Album';

import { logger } from './src/middleware/logger';

import { albums } from './src/controllers/albums';

const app = express();
app.use(express.json());

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err: string) => console.log(`Error: ${err}`));

db.addModels([Album]);

app.use(bodyParser.json());
app.use(cors());
app.use(logger);

app.use('/albums', albums);

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

export default app;
