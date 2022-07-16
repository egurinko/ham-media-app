import { client } from '../../../server/services/prisma';

export const seedProductTagging = async () => {
  const sankoProduct1 = await client.product.findUniqueOrThrow({
    where: { name: 'ハムスタープラスダイエットメンテンス' },
  });
  const pelletTag = await client.productTag.findUniqueOrThrow({
    where: { name: 'ペレット' },
  });
  await client.productTagging.upsert({
    where: { id: 1 },
    update: {},
    create: {
      product_id: sankoProduct1.id,
      product_tag_id: pelletTag.id,
    },
  });

  const sankoProduct2 = await client.product.findUniqueOrThrow({
    where: { name: 'パーテーションケース ミニ' },
  });
  const cageTag = await client.productTag.findUniqueOrThrow({
    where: { name: 'ケージ' },
  });
  await client.productTagging.upsert({
    where: { id: 2 },
    update: {},
    create: {
      product_id: sankoProduct2.id,
      product_tag_id: cageTag.id,
    },
  });

  const gexWhile = await client.product.findUniqueOrThrow({
    where: { name: 'ハーモニーホイールDS14' },
  });
  const wheelTag = await client.productTag.findUniqueOrThrow({
    where: { name: '回し車' },
  });
  await client.productTagging.upsert({
    where: { id: 3 },
    update: {},
    create: {
      product_id: gexWhile.id,
      product_tag_id: wheelTag.id,
    },
  });

  const toilet = await client.product.findUniqueOrThrow({
    where: { name: 'ハーモニートイレ' },
  });
  const toiletTag = await client.productTag.findUniqueOrThrow({
    where: { name: 'トイレ' },
  });
  await client.productTagging.upsert({
    where: { id: 4 },
    update: {},
    create: {
      product_id: toilet.id,
      product_tag_id: toiletTag.id,
    },
  });
};
