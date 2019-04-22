import axios from 'axios';
import axiosMockAdapter from 'axios-mock-adapter';

import { BaseIntegration } from './';

jest.mock('../../config/app');

const axiosMock = new axiosMockAdapter(axios);

let emailer: BaseIntegration;

const emailOptions = {
  to: 'mitchell.rowling@gmail.com',
  cc: '',
  bcc: '',
  subject: '33',
  text: 'Hello World from My API'
};
const url = 'serviceprovider.domain.com';
const serviceProvider = 'testProvider';

describe('BaseIntegration Class', () => {
  beforeEach(() => {
    axiosMock.reset();
    emailer = new BaseIntegration(emailOptions, url, serviceProvider);
  });
  describe('sendRequest method', () => {
    it('Sends Network Request to class URL with payload', async () => {
      axiosMock.onPost(url).reply(200);
      await emailer.sendRequest(emailOptions);
      expect(axiosMock.history.post[0].url).toEqual(url);
      expect(axiosMock.history.post[0].data).toEqual(JSON.stringify(emailOptions));
    });
    it('Sends Network Request to class URL with additional headers', async () => {
      axiosMock.onPost(url).reply(200);
      const headers = {
        'Content-Type': 'application/json'
      };
      await emailer.sendRequest(emailOptions, { headers });
      const returnedHeaders = axiosMock.history.post[0].headers;
      for (const key in headers) {
        if (headers.hasOwnProperty(key)) {
          expect(returnedHeaders[key]).toEqual(headers[key]);
        }
      }
    });
    it('Fails gracefully upon Network Error', async () => {
      axiosMock.onPost(url).networkError();
      const res = await emailer.sendRequest(emailOptions);
      expect(res.success).toEqual(false);
    });
    it('Fails gracefully upon Timeout', async () => {
      axiosMock.onPost(url).timeout();
      const res = await emailer.sendRequest(emailOptions);
      expect(res.success).toEqual(false);
    });
  });
});
