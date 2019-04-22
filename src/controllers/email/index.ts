import { Context } from 'koa';

import { IEmailOptions, IResponse } from '../../integrations';
import { FailoverGroup, FailoverService } from '../../integrations/failover';
import { Mailgun } from '../../integrations/mailgun';
import { SendGrid } from '../../integrations/sendgrid';
import { cache } from '../../services/cache';

const serviceGroup = new FailoverGroup([ Mailgun, SendGrid ], cache);

const sendEmailFn = (emailOptions: IEmailOptions) => async (service: FailoverService): Promise<IResponse> => {
  const emailer = service.getInstance(emailOptions);
  return emailer.send();
};

export const send = async (context: Context) => {
  const { to, cc, bcc, subject, text }: IEmailOptions = context.request.body;
  const emailOptions = { to, cc, bcc, subject, text };
  const res = await serviceGroup.actionService(sendEmailFn(emailOptions));
  if (typeof res === 'undefined') {
    throw Error('Unable to succesfully send email');
  }
  const response = {
    success: res.success
  };
  context.ok(response);
};
