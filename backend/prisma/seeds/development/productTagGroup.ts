import { client } from '../../../server/services/prisma';

export const seedProductTagGroup = async () => {
  await client.productTagGroup.upsert({
    where: { name: '消耗品（食品）' },
    update: {},
    create: { name: '消耗品（食品）' },
  });

  await client.productTagGroup.upsert({
    where: { name: '非消耗品' },
    update: {},
    create: { name: '非消耗品' },
  });
};
