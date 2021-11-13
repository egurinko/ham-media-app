import { client } from '../../server/services/prisma';

export const executeProduction = async () => {
  try {
    await client.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: { name: 'admin' },
    });

    await client.role.upsert({
      where: { name: 'user' },
      update: {},
      create: { name: 'user' },
    });

    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};
