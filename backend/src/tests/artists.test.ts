/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../../app';
// import { db } from '../config/database';
// import { User } from '../models/User';
// import { QueryTypes } from 'sequelize';
// import path from 'path';

const api = supertest(app);

// beforeAll(async () => {
//   // delete existing test db
//   await db.query('DROP DATABASE playlist-raw');
//   await db.query(path.join(__dirname, 'db/playlist-raw.sql'));
// });

let token: string;

beforeAll(async () => {
  const loginCredentials = {
    username: 'test',
    password: 'test',
  };
  const req = await api.post('/api/login').send(loginCredentials);
  token = req.body.token;
});

it('getting artist details should return 200', async () => {
  await api
    .get('/api/artists/details/84969')
    .set('Authorization', 'bearer ' + token)
    .expect(200);
});
