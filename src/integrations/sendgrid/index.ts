import { IEmailOptions } from '../';
import { envVars } from '../../config';
import { logger } from '../../services/logger';
import { BaseIntegration } from '../base';

export class SendGrid extends BaseIntegration {
  private personalisationObj: any = {};
  constructor(emailOptions: IEmailOptions) {
    super(emailOptions, 'https://api.sendgrid.com/v3/mail/send', SendGrid.name);
    this.buildPersonalisationObjKey('to');
    this.buildPersonalisationObjKey('cc');
    this.buildPersonalisationObjKey('bcc');
  }
  public send() {
    const { subject, text } = this.emailOptions;

    const data = {
      subject,
      personalizations: [ this.personalisationObj ],
      from: {
        email: this.fromAddress
      },
      content: [
        {
          type: 'text/plain',
          value: text
        }
      ]
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${envVars.SENDGRID_API_KEY}`
    };
    return this.sendRequest(data, { headers });
  }
  private buildPersonalisationObjKey(key: string) {
    try {
      const str = this.emailOptions[key];
      if (typeof str === 'undefined') {
        return;
      }
      const arr = str.split(',');
      if (arr.length > 0) {
        this.personalisationObj[key] = arr.map((email: string) => ({ email }));
      }
    } catch (e) {
      logger.error(`buildPersonalisationObjKey(): ${e}`);
    }
  }
}
