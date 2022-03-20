import { client } from '../../../../server/services/prisma';

export const seedHospitalCertificationOption = async () => {
  const hospital1 = await client.hospital.findFirst({
    where: { name: 'ひかり動物病院' },
  });

  await client.hospitalCertificationOption.upsert({
    where: { hospital_id: hospital1.id },
    update: {},
    create: {
      hospital_id: hospital1.id,
      nichiju_registered: '○',
      jsava_registered: '○',
    },
  });

  const hospital2 = await client.hospital.findFirst({
    where: { name: 'ひがし東京夜間救急動物医療センター' },
  });
  await client.hospitalCertificationOption.upsert({
    where: { hospital_id: hospital2.id },
    update: {},
    create: {
      hospital_id: hospital2.id,
      nichiju_registered: '×',
      jsava_registered: '×',
    },
  });
};
