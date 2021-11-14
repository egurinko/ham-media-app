import { client } from '../../server/services/prisma';

export const executeDevelopment = async () => {
  try {
    const admin = await client.role.findUnique({ where: { name: 'admin' } });
    const user = await client.role.findUnique({ where: { name: 'user' } });

    if (admin && user) {
      const adminUser = await client.internalUser.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
          email: 'admin@example.com',
          name: 'admin',
          password_digest:
            '$2b$08$nOByk5csZtvw62zGlLZLne63t/jDGqGEoofMWyZ8egaNkcdC1HDra', // password
          role_id: admin.id,
        },
      });

      await client.internalUser.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
          email: 'user@example.com',
          name: 'user',
          password_digest:
            '$2b$08$nOByk5csZtvw62zGlLZLne63t/jDGqGEoofMWyZ8egaNkcdC1HDra', // password
          role_id: user.id,
        },
      });

      const sanko = await client.maker.upsert({
        where: { name: '三晃商会' },
        update: {},
        create: { name: '三晃商会' },
      });

      const sankoProduct = await client.product.upsert({
        where: { name: 'ハムスタープラスダイエットメンテンス' },
        update: {},
        create: {
          name: 'ハムスタープラスダイエットメンテンス',
          remark: '2022/01\n2022/08',
          maker_id: sanko.id,
        },
      });

      for (let i = 1; i <= 3; i++) {
        const stock = await client.stock.upsert({
          where: { id: i },
          update: {},
          create: {
            id: i,
            product_id: sankoProduct.id,
            expired_at: new Date('2030/10/10').toISOString(),
          },
        });
        await client.stockAllocation.upsert({
          where: { stock_id: stock.id },
          update: {},
          create: {
            id: i,
            internal_user_id: adminUser.id,
            stock_id: stock.id,
          },
        });
      }

      const sankoProductTwo = await client.product.upsert({
        where: { name: 'パーテーションケース ミニ' },
        update: {},
        create: {
          name: 'パーテーションケース ミニ',
          remark: 'W180×Ｄ110×Ｈ145ｍｍ',
          maker_id: sanko.id,
        },
      });

      await client.stock.upsert({
        where: { id: 4 },
        update: {},
        create: {
          id: 4,
          product_id: sankoProductTwo.id,
          expired_at: new Date('2030/10/10').toISOString(),
        },
      });

      const gex = await client.maker.upsert({
        where: { name: 'GEX' },
        update: {},
        create: { name: 'GEX' },
      });

      await client.product.upsert({
        where: { name: 'ハーモニーホイールDS14' },
        update: {},
        create: {
          name: 'ハーモニーホイールDS14',
          remark: '',
          maker_id: gex.id,
        },
      });

      await client.product.upsert({
        where: { name: 'ハーモニートイレ' },
        update: {},
        create: {
          name: 'ハーモニートイレ',
          remark: '',
          maker_id: gex.id,
        },
      });
    }

    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};
