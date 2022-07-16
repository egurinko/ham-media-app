import { client } from '../../../../server/services/prisma';

export const seedHospitalAddress = async () => {
  const hospital1 = await client.hospital.findFirstOrThrow({
    where: { name: 'ひかり動物病院' },
  });
  const mie = await client.prefecture.findUniqueOrThrow({
    where: { name: '三重県' },
  });

  await client.hospitalAddress.upsert({
    where: { hospital_id: hospital1.id },
    update: {},
    create: {
      hospital_id: hospital1.id,
      prefecture_id: mie.id,
      address: '伊勢市二見町山田原148-2',
      phone_number: '0596-43-5550',
    },
  });

  const hospital2 = await client.hospital.findFirstOrThrow({
    where: { name: 'ひがし東京夜間救急動物医療センター' },
  });
  const tokyo = await client.prefecture.findUniqueOrThrow({
    where: { name: '東京都' },
  });

  await client.hospitalAddress.upsert({
    where: { hospital_id: hospital2.id },
    update: {},
    create: {
      hospital_id: hospital2.id,
      prefecture_id: tokyo.id,
      address: '江東区亀戸9丁目23-12',
      phone_number: '03-5858-9969',
    },
  });
};
