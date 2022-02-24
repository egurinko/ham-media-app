import { seedInternalUser } from './test/internalUser';

export const executeTest = async () => {
  try {
    await seedInternalUser();

    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};
