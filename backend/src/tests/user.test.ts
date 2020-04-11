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

test('get pong from ping', async () => {
  const response = await api.get('/ping');
  expect(response.text).toBe('pong');
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

it('should require authorization', async () => {
  await api.get('/api/users').expect(401);
});

it('should return list of users', async () => {
  await api
    .get('/api/users')
    .set('Authorization', 'bearer ' + token)
    .expect(200);
});
