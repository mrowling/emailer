import * as joi from 'joi';

export const loadVars = () => {
  const envVarsSchema = joi
    .object({
      NODE_ENV: joi.string().allow([ 'development', 'production', 'test', 'provision' ]).default('development'),
      PORT: joi.number().default(8080),
      FROM_ACCOUNT: joi.string().required(),
      FROM_DOMAIN: joi.string().required(),
      SENDGRID_API_KEY: joi.string().required(),
      MAILGUN_API_KEY: joi.string().required()
    })
    .unknown()
    .required();

  const { error, value: envVars } = joi.validate(process.env, envVarsSchema, { abortEarly: false });
  if (error) {
    throw new Error(`Configuration validation error: ${error.message}`);
  }
  return envVars;
};
