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
//   const loginCredentials = {
//     username: 'nodejstest',
//     password: 'salainen',
//   };

//   await api
//     .post('/api/login')
//     .send(loginCredentials)
//     .expect(200)
//     .expect('Content-Type', /application\/json/);
// });

test('get pong from ping', async (done) => {
  const response = await api.get('/ping');
  expect(response.text).toBe('pong');
  done();
});

test('successful login returns 200', async () => {
  const loginCredentials = {
    username: 'test',
    password: 'test',
  };
  await api
    .post('/api/login')
    .send(loginCredentials)
    .expect(200)
    .expect('Content-Type', /application\/json/);
});
