"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
// import { db } from '../config/database';
// import { User } from '../models/User';
// import { QueryTypes } from 'sequelize';
// import path from 'path';
const api = supertest_1.default(app_1.default);
// beforeAll(async () => {
//   // delete existing test db
//   await db.query('DROP DATABASE playlist-raw');
//   await db.query(path.join(__dirname, 'db/playlist-raw.sql'));
// });
let token;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const loginCredentials = {
        username: 'test',
        password: 'test',
    };
    const req = yield api.post('/api/login').send(loginCredentials);
    token = req.body.token;
}));
test('get pong from ping', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get('/ping');
    expect(response.text).toBe('pong');
}));
test('successful login returns 200', () => __awaiter(void 0, void 0, void 0, function* () {
    const loginCredentials = {
        username: 'test',
        password: 'test',
    };
    yield api
        .post('/api/login')
        .send(loginCredentials)
        .expect(200)
        .expect('Content-Type', /application\/json/);
}));
it('should require authorization', () => __awaiter(void 0, void 0, void 0, function* () {
    yield api.get('/api/users').expect(401);
}));
it('should return list of users', () => __awaiter(void 0, void 0, void 0, function* () {
    yield api
        .get('/api/users')
        .set('Authorization', 'bearer ' + token)
        .expect(200);
}));
