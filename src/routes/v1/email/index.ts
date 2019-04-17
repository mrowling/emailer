import * as Router from 'koa-router';
import {
  send
} from '../../../controllers/email';

export const attachEmailRoutes = (router: Router) => {
  router.post('/', send);
  return router;
};

export const createEmailRouter = (options: Router.IRouterOptions = {}) =>
  attachEmailRoutes(new Router(options));
