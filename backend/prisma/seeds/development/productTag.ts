import { client } from '../../../server/services/prisma';

export const seedProductTag = async () => {
  const foodTagGroup = await client.productTagGroup.findUniqueOrThrow({
    where: { name: '消耗品（食品）' },
  });

  await client.productTag.upsert({
    where: { name: 'ペレット' },
    update: {},
    create: { name: 'ペレット', product_tag_group_id: foodTagGroup.id },
  });

  const nonConsumableTagGroup = await client.productTagGroup.upsert({
    where: { name: '非消耗品' },
    update: {},
    create: { name: '非消耗品' },
  });

  await client.productTag.upsert({
    where: { name: 'ケージ' },
    update: {},
    create: {
      name: 'ケージ',
      product_tag_group_id: nonConsumableTagGroup.id,
    },
  });

  await client.productTag.upsert({
    where: { name: '回し車' },
    update: {},
    create: {
      name: '回し車',
      product_tag_group_id: nonConsumableTagGroup.id,
    },
  });

  await client.productTag.upsert({
    where: { name: 'トイレ' },
    update: {},
    create: {
      name: 'トイレ',
      product_tag_group_id: nonConsumableTagGroup.id,
    },
  });
};
