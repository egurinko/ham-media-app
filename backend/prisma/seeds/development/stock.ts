import { client } from '../../../server/services/prisma';

export const seedStock = async () => {
  const admin = await client.role.findUniqueOrThrow({
    where: { name: 'admin' },
  });
  const user = await client.role.findUniqueOrThrow({ where: { name: 'user' } });

  const sankoProduct1 = await client.product.findUniqueOrThrow({
    where: { name: 'ハムスタープラスダイエットメンテンス' },
  });
  const stock1 = await client.stock.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      product_id: sankoProduct1.id,
      expired_at: new Date('2030/10/10').toISOString(),
      internal_user_id: admin.id,
    },
  });
  await client.stockAllocation.upsert({
    where: { stock_id: stock1.id },
    update: {},
    create: {
      internal_user_id: admin.id,
      stock_id: stock1.id,
    },
  });

  const stock2 = await client.stock.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      product_id: sankoProduct1.id,
      expired_at: new Date('2030/10/10').toISOString(),
      internal_user_id: admin.id,
    },
  });
  await client.stockAllocation.upsert({
    where: { stock_id: stock2.id },
    update: {},
    create: {
      internal_user_id: user.id,
      stock_id: stock2.id,
    },
  });

  const sankoProduct2 = await client.product.findUniqueOrThrow({
    where: { name: 'パーテーションケース ミニ' },
  });
  await client.stock.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      product_id: sankoProduct2.id,
      expired_at: new Date('2030/10/10').toISOString(),
      internal_user_id: admin.id,
    },
  });
};
