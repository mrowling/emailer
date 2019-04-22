import * as joi from 'joi';
import * as Router from 'koa-router';

import { send } from '../../../controllers/email';
import { validate } from '../../../middleware/validator';

const schema = joi
  .object({
    to: joi.string().required(),
    cc: joi.string(),
    bcc: joi.string(),
    subject: joi.string().required(),
    text: joi.string().required()
  })
  .unknown()
  .required();
const validationOptions: joi.ValidationOptions = { abortEarly: false, stripUnknown: true };

export const attachEmailRoutes = (router: Router) => {
  router.post('/', validate(schema, validationOptions), send);
  return router;
};

export const createEmailRouter = (options: Router.IRouterOptions = {}) => attachEmailRoutes(new Router(options));
