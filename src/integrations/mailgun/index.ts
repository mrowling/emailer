import * as qs from 'querystring';
import { IEmailOptions } from '../';
import { envVars } from '../../config';
import { BaseIntegration } from '../base';

export class Mailgun extends BaseIntegration {
  constructor(emailOptions: IEmailOptions) {
    super(emailOptions, `https://api.mailgun.net/v3/${envVars.FROM_DOMAIN}/messages`, Mailgun.name);
  }
  public send() {
    const { to, cc, bcc, subject, text } = this.emailOptions;
    const data: any = {
      to,
      subject,
      text,
      from: this.fromAddress
    };
    if (typeof cc !== 'undefined' && cc !== '') {
      data.cc = cc;
    }
    if (typeof bcc !== 'undefined' && bcc !== '') {
      data.bcc = bcc;
    }
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const auth = {
      username: 'api',
      password: envVars.MAILGUN_API_KEY
    };
    return this.sendRequest(qs.stringify(data), { headers, auth });
  }
}
