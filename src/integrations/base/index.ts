import axios, { AxiosRequestConfig } from 'axios';

import { IEmailOptions } from '../';

import { envVars } from '../../config';
import { logger } from '../../services/logger';

export class BaseIntegration {
  public emailOptions: IEmailOptions;
  public fromAddress: string = `${envVars.FROM_ACCOUNT}@${envVars.FROM_DOMAIN}`;
  private url: string;
  private serviceProvider: string;
  constructor(emailOptions: IEmailOptions, url: string, serviceProvider: string) {
    this.emailOptions = emailOptions;
    this.url = url;
    this.serviceProvider = serviceProvider;
  }
  public async sendRequest(data: any, config: AxiosRequestConfig = {}) {
    try {
      const res = await axios.post(this.url, data, config);
      const { status } = res;
      return this.response(true, status);
    } catch (e) {
      const status = e.response && e.response.status ? e.response.status : e.code || e;
      logger.error(`sendRequest(): ${status}`);
      return this.response(false, status);
    }
  }
  private response(success: boolean, status: number | string | undefined) {
    return {
      success,
      status,
      serviceProvider: this.serviceProvider
    };
  }
}
