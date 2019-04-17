import * as dotenv from 'dotenv';
import * as joi from 'joi';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .allow(['development', 'production', 'test', 'provision'])
      .default('development'),
    API_PORT: joi.number().default(8080)
  })
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export { envVars };
