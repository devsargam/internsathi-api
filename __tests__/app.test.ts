import request from 'supertest';

import app from '../src/app';

describe('Test the root path', () => {
  test('It should response the root path', async () => {
    const res = await request(app).get('/');
    expect(res.body).toEqual({ message: 'Hello World!' });
    expect(res.status).toBe(200);
  });
});
