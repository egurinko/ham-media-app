import { client } from '../../../server/services/prisma';

export const seedHospital = async () => {
  await client.hospital.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'ひかり動物病院',
      url: '',
      deleted: false,
      internal_memo: '',
    },
  });

  await client.hospital.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'ひがし東京夜間救急動物医療センター',
      url: 'https://doubutsu-yakan99.com/',
      deleted: false,
      internal_memo: '',
    },
  });
};
