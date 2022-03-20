import { client } from '../../../server/services/prisma';

export const seedMaker = async () => {
  await client.maker.upsert({
    where: { name: '三晃商会' },
    update: {},
    create: { name: '三晃商会' },
  });

  await client.maker.upsert({
    where: { name: 'GEX' },
    update: {},
    create: { name: 'GEX' },
  });
};
