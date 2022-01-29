import { seedRole } from './production/role';
import { seedRegion } from './production/region';
import { seedPrefecture } from './production/prefecture';

export const executeProduction = async () => {
  try {
    await seedRole();

    await seedRegion();
    await seedPrefecture();

    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};
