import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

// import db
import { db } from './src/config/database';

// import models
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
import playlogRouter from './src/routes/playlog';
import programsRouter from './src/routes/programs';
import reportDetailsRouter from './src/routes/reportdetails';
import reportsListRouter from './src/routes/reportslist';
import reportTransferRouter from './src/routes/reporttransfer';
import reportsRouter from './src/routes/reports';
import searchRouter from './src/routes/search';
import top100Router from './src/routes/top100';
import tracksRouter from './src/routes/tracks';
import usersRouter from './src/routes/users';
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
  User,
]);

app.use(express.static(path.resolve(__dirname, '../../frontend/build')));

app.get('/', function (_req, res) {
  res.sendFile(
    path.resolve(__dirname, '../../frontend/build', 'index.html'),
    (err) => {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get('/backend-documentation', (_req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../../frontend/build', 'index.html'),
    (err) => {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get('/reports*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
});
app.get('/top100*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
});
app.get('/search*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
});
app.get('/transfer*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
});
app.get('/users*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
});
app.get('/propgrams*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
});
app.get('/artist*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
});
app.get('/album*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
});
app.get('/track*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
});

app.use(bodyParser.json());
app.use(cors());
app.use(logger);

app.use('/api/albums', albumsRouter);
app.use('/api/artists', artistsRouter);
app.use('/api/playlog', playlogRouter);
app.use('/api/programs', programsRouter);
app.use('/api/reportdetails', reportDetailsRouter);
app.use('/api/reportslist', reportsListRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/reporttransfer', reportTransferRouter);
app.use('/api/search', searchRouter);
app.use('/api/top100', top100Router);
app.use('/api/tracks', tracksRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
