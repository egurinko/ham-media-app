import { client } from '../../../server/services/prisma';

export const seedRole = async () => {
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
};
