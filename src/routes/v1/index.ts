import * as Router from 'koa-router';

import { createEmailRouter } from './email';

const attachChildRouter = (
  parentRouter: Router,
  path: string,
  childRouter: Router
) => {
  parentRouter.use(path, childRouter.routes(), childRouter.allowedMethods());
};

const attachRoutes = (router: Router) => {
  attachChildRouter(router, '/email', createEmailRouter());
  return router;
};

export const createRouter = (options: Router.IRouterOptions = {}) =>
  attachRoutes(new Router(options));
