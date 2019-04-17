import * as cors from '@koa/cors';
import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as compose from 'koa-compose';
import * as morgan from 'koa-morgan';
import * as respond from 'koa-respond';

import { envVars } from './config';
import { errorHandler } from './middleware/error-handler';
import { createRouter } from './routes/v1';
import { accessLogStream, logger } from './services/logger';

export const loadApp = () => {
  const app = new Koa();

  /* Global Middlewares */
  const middlewares = [
    morgan('combined', { stream: accessLogStream }),
    errorHandler(),
    koaBody(),
    cors(),
    respond(),
  ];
  const router = createRouter({ prefix: '/v1'})
  app.use(
    compose([
      ...middlewares,
      router.routes(),
      router.allowedMethods(),
    ])
  );
  logger.info('Routes', router.routes())
  return app;
};

export const startApp = async (app: Koa, listen: boolean = true) => {
  try {
    if (listen) {
      const appPort = envVars.API_PORT;
      app.listen(appPort, () => logger.info(`Listening on port: ${appPort}`));
    }
    return app;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};
