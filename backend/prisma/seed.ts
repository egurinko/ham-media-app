import { executeProduction } from './seeds/production';
import { executeDevelopment } from './seeds/development';

const isDevelopment = process.env['NODE_ENV'] === 'development';
const isProduction = process.env['NODE_ENV'] === 'production';

const execute = async () => {
  try {
    if (isDevelopment) {
      await executeProduction();
      await executeDevelopment();
    } else if (isProduction) {
      await executeProduction();
    }
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

execute()
  .then((_) => console.log('seed success'))
  .catch((e) => console.error('not finish seed', e));
