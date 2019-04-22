import * as dotenv from 'dotenv';
import * as path from 'path';

import { logger } from '../../services/logger';

export const loadVars = () => {
  logger.info('Loading Environment variables from example.env');
  const { parsed } = dotenv.config({ path: path.join(__dirname, '../../../example.env') });
  return parsed;
};
