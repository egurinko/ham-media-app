import { client } from '../../server/services/prisma';
import { executeProduction } from './production';

export const executeDevelopment = async () => {
  try {
    await executeProduction();

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

      const foodTagGroup = await client.productTagGroup.upsert({
        where: { name: '消耗品（食品）' },
        update: {},
        create: { name: '消耗品（食品）' },
      });

      const pelletTag = await client.productTag.upsert({
        where: { name: 'ペレット' },
        update: {},
        create: { name: 'ペレット', product_tag_group_id: foodTagGroup.id },
      });

      const nonConsumableTagGroup = await client.productTagGroup.upsert({
        where: { name: '非消耗品' },
        update: {},
        create: { name: '非消耗品' },
      });

      const cageTag = await client.productTag.upsert({
        where: { name: 'ケージ' },
        update: {},
        create: {
          name: 'ケージ',
          product_tag_group_id: nonConsumableTagGroup.id,
        },
      });

      const wheelTag = await client.productTag.upsert({
        where: { name: '回し車' },
        update: {},
        create: {
          name: '回し車',
          product_tag_group_id: nonConsumableTagGroup.id,
        },
      });

      const toiletTag = await client.productTag.upsert({
        where: { name: 'トイレ' },
        update: {},
        create: {
          name: 'トイレ',
          product_tag_group_id: nonConsumableTagGroup.id,
        },
      });

      const sanko = await client.maker.upsert({
        where: { name: '三晃商会' },
        update: {},
        create: { name: '三晃商会' },
      });

      // 消耗品（食品）
      const sankoProduct = await client.product.upsert({
        where: { name: 'ハムスタープラスダイエットメンテンス' },
        update: {},
        create: {
          name: 'ハムスタープラスダイエットメンテンス',
          remark: '2022/01\n2022/08',
          maker_id: sanko.id,
          url: 'https://ham-media-app-local-images.s3.amazonaws.com/%E3%82%B9%E3%82%AF%E3%82%B7%E3%83%A7+2021-11-24+2.52.08.png',
        },
      });

      await client.productTagging.upsert({
        where: { id: 1 },
        update: {},
        create: {
          product_id: sankoProduct.id,
          product_tag_id: pelletTag.id,
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
            internal_user_id: adminUser.id,
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

      // 非消耗品
      const sankoProductTwo = await client.product.upsert({
        where: { name: 'パーテーションケース ミニ' },
        update: {},
        create: {
          name: 'パーテーションケース ミニ',
          remark: 'W180×Ｄ110×Ｈ145ｍｍ',
          maker_id: sanko.id,
          url: 'https://ham-media-app-local-images.s3.amazonaws.com/%E3%82%B9%E3%82%AF%E3%82%B7%E3%83%A7+2021-11-24+2.52.39.png',
        },
      });

      await client.productTagging.upsert({
        where: { id: 2 },
        update: {},
        create: {
          product_id: sankoProductTwo.id,
          product_tag_id: cageTag.id,
        },
      });

      await client.stock.upsert({
        where: { id: 4 },
        update: {},
        create: {
          id: 4,
          product_id: sankoProductTwo.id,
          expired_at: new Date('2030/10/10').toISOString(),
          internal_user_id: adminUser.id,
        },
      });

      const gex = await client.maker.upsert({
        where: { name: 'GEX' },
        update: {},
        create: { name: 'GEX' },
      });

      // 非消耗品
      const gexWhile = await client.product.upsert({
        where: { name: 'ハーモニーホイールDS14' },
        update: {},
        create: {
          name: 'ハーモニーホイールDS14',
          remark: '',
          maker_id: gex.id,
          url: 'https://ham-media-app-local-images.s3.amazonaws.com/%E3%82%B9%E3%82%AF%E3%82%B7%E3%83%A7+2021-11-24+2.53.26.png',
        },
      });

      await client.productTagging.upsert({
        where: { id: 3 },
        update: {},
        create: {
          product_id: gexWhile.id,
          product_tag_id: wheelTag.id,
        },
      });

      // 非消耗品
      const toilet = await client.product.upsert({
        where: { name: 'ハーモニートイレ' },
        update: {},
        create: {
          name: 'ハーモニートイレ',
          remark: '',
          maker_id: gex.id,
          url: 'https://ham-media-app-local-images.s3.amazonaws.com/%E3%82%B9%E3%82%AF%E3%82%B7%E3%83%A7+2021-11-24+2.53.41.png',
        },
      });

      await client.productTagging.upsert({
        where: { id: 4 },
        update: {},
        create: {
          product_id: toilet.id,
          product_tag_id: toiletTag.id,
        },
      });
    }

    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};
