import * as joi from 'joi';
import * as Koa from 'koa';

import { HTTPError } from '../errors';

export const validate = (
  schema: joi.SchemaLike,
  options: joi.ValidationOptions = { abortEarly: false, stripUnknown: true }
) => async (ctx: Koa.Context, next: Function) => {
  const { body } = ctx.request;
  const { error, value } = joi.validate(body, schema, options);
  if (error) {
    throw new HTTPError(`Validation error: ${error.message}`, 400);
  }
  ctx.request.body = value;
  await next();
};
