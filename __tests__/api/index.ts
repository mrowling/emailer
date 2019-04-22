import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';
import * as request from 'supertest';

import { loadApp } from '../../src/app';

jest.mock('../../src/config/app');

const axiosMock = new axiosMockAdapter(axios);
axiosMock.onPost().reply(200);
const app = loadApp();

describe('Email Endpoint', () => {
  test('POST /v1/email with valid data', async () => {
    const emailOptions = {
      to: 'mitchell.rowling@gmail.com',
      subject: 'Email Subject',
      text: 'Hello World from My API'
    };
    const response = await request(app.callback()).post('/v1/email').send(emailOptions);
    expect(response.body.success).toBe(true);
  });
  test('POST /v1/email without subject', async () => {
    const emailOptions = {
      to: 'mitchell.rowling@gmail.com',
      text: 'Hello World from My API'
    };
    const response = await request(app.callback()).post('/v1/email').send(emailOptions);
    expect(response.statusCode).toBe(400);
    expect(response.error.text).toBe(
      '{"message":"Validation error: child \\"subject\\" fails because [\\"subject\\" is required]"}'
    );
  });
  test('POST /v1/email without subject and text', async () => {
    const emailOptions = {
      to: 'mitchell.rowling@gmail.com'
    };
    const response = await request(app.callback()).post('/v1/email').send(emailOptions);
    expect(response.statusCode).toBe(400);
    expect(response.error.text).toBe(
      '{"message":"Validation error: child \\"subject\\" fails because [\\"subject\\" is required]. child \\"text\\" fails because [\\"text\\" is required]"}'
    );
  });
});
