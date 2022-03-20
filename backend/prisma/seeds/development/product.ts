import { client } from '../../../server/services/prisma';

export const seedProduct = async () => {
  const sanko = await client.maker.findUnique({
    where: { name: '三晃商会' },
  });

  await client.product.upsert({
    where: { name: 'ハムスタープラスダイエットメンテンス' },
    update: {},
    create: {
      name: 'ハムスタープラスダイエットメンテンス',
      remark: '2022/01\n2022/08',
      maker_id: sanko.id,
      url: 'https://ham-media-app-local-images.s3.amazonaws.com/%E3%82%B9%E3%82%AF%E3%82%B7%E3%83%A7+2021-11-24+2.52.08.png',
    },
  });

  await client.product.upsert({
    where: { name: 'パーテーションケース ミニ' },
    update: {},
    create: {
      name: 'パーテーションケース ミニ',
      remark: 'W180×Ｄ110×Ｈ145ｍｍ',
      maker_id: sanko.id,
      url: 'https://ham-media-app-local-images.s3.amazonaws.com/%E3%82%B9%E3%82%AF%E3%82%B7%E3%83%A7+2021-11-24+2.52.39.png',
    },
  });

  const gex = await client.maker.findUnique({
    where: { name: 'GEX' },
  });

  await client.product.upsert({
    where: { name: 'ハーモニーホイールDS14' },
    update: {},
    create: {
      name: 'ハーモニーホイールDS14',
      remark: '',
      maker_id: gex.id,
      url: 'https://ham-media-app-local-images.s3.amazonaws.com/%E3%82%B9%E3%82%AF%E3%82%B7%E3%83%A7+2021-11-24+2.53.26.png',
    },
  });

  await client.product.upsert({
    where: { name: 'ハーモニートイレ' },
    update: {},
    create: {
      name: 'ハーモニートイレ',
      remark: '',
      maker_id: gex.id,
      url: 'https://ham-media-app-local-images.s3.amazonaws.com/%E3%82%B9%E3%82%AF%E3%82%B7%E3%83%A7+2021-11-24+2.53.41.png',
    },
  });
};
