import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// import db
import { db } from './src/config/database';
import { Album } from './src/models/Album';
import { Artist } from './src/models/Artist';
import { Program } from './src/models/Program';
import { Report_Track } from './src/models/Report_Track';
import { Report_Transfer } from './src/models/Report_Transfer';
import { Report } from './src/models/Report';
import { Track } from './src/models/Track';
import { User } from './src/models/User';

import { logger } from './src/middleware/logger';

import { albums } from './src/controllers/albums';
import top100Router from './src/routes/top100';

const app = express();
app.use(express.json());

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err: string) => console.log(`Error: ${err}`));

db.addModels([
  Album,
  Artist,
  Program,
  Report_Track,
  Report_Transfer,
  Report,
  Track,
  User
]);

app.use(bodyParser.json());
app.use(cors());
app.use(logger);

app.use('/albums', albums);
app.use('/api/top100', top100Router);

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

export default app;
