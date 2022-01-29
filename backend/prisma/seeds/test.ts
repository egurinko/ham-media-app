import { executeProduction } from './production';
import { seedInternalUser } from './test/internalUser';

export const executeTest = async () => {
  try {
    await executeProduction();

    await seedInternalUser();

    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};
