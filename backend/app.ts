import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// import models
import { db } from './src/config/database';
import { Album } from './src/models/Album';
import { Artist } from './src/models/Artist';
import { Program } from './src/models/Program';
import { Report_Track } from './src/models/Report_Track';
import { Report_Transfer } from './src/models/Report_Transfer';
import { Report } from './src/models/Report';
import { Track } from './src/models/Track';
import { User } from './src/models/User';

// import routers
import albumsRouter from './src/routes/albums';
import artistsRouter from './src/routes/artists';
import programsRouter from './src/routes/programs';
import reportDetailsRouter from './src/routes/reportdetails';
import reportsRouter from './src/routes/reports';
import top100Router from './src/routes/top100';
import loginRouter from './src/routes/login';

// import middleware
import { logger } from './src/middleware/logger';
import { unknownEndpoint, errorHandler } from './src/middleware/error';

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

app.use('/api/albums', albumsRouter);
app.use('/api/artists', artistsRouter);
app.use('/api/programs', programsRouter);
app.use('/api/reportdetails', reportDetailsRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/top100', top100Router);
app.use('/api/login', loginRouter);

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
