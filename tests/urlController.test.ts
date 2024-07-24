import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { urlRouter } from '../src/routes/urlRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/api/url', urlRouter);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/scissor_test');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('URL Shortening API', () => {
  it('should shorten a URL', async () => {
    const res = await request(app)
      .post('/api/url/shorten')
      .send({ longUrl: 'https://www.google.com' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('shortUrl');
  });

  it('should not shorten an invalid URL', async () => {
    const res = await request(app)
      .post('/api/url/shorten')
      .send({ longUrl: 'invalid-url' });
    expect(res.statusCode).toEqual(400);
  });

  it('should return a long URL when given a valid code', async () => {
    const urlResponse = await request(app)
      .post('/api/url/shorten')
      .send({ longUrl: 'https://www.google.com' });

    const res = await request(app).get(
      `/api/url/${urlResponse.body.urlCode}`
    );
    expect(res.statusCode).toEqual(302);
  });
});
