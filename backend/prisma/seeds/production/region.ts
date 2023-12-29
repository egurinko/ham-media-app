import { client } from '../../../server/services/prisma';

export const seedRegion = async () => {
  const regionNames = [
    '北海道',
    '東北',
    '関東',
    '中部',
    '近畿',
    '中国',
    '四国',
    '九州・沖縄',
  ];

  const promises = regionNames.map((regionName) =>
    client.region.upsert({
      where: { name: regionName },
      update: {},
      create: { name: regionName },
    }),
  );

  await Promise.all(promises);
};
