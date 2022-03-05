import { executeProduction } from './seeds/production';
import { executeDevelopment } from './seeds/development';
import { executeTest } from './seeds/test';
import {
  isDevelopment,
  isProduction,
  isTest,
} from '../server/services/environments';

const execute = async () => {
  try {
    if (isDevelopment) {
      await executeDevelopment();
    } else if (isProduction) {
      await executeProduction();
    } else if (isTest) {
      await executeTest();
    }
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

execute()
  .then((_) => console.log('seed success'))
  .catch((e) => console.error('not finish seed', e));
