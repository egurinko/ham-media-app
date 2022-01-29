import { executeProduction } from './seeds/production';
import { executeDevelopment } from './seeds/development';
import { executeTest } from './seeds/test';

const isDevelopment = process.env['NODE_ENV'] === 'development';
const isProduction = process.env['NODE_ENV'] === 'production';
const isTest = process.env['NODE_ENV'] === 'test';

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
