import { client } from '../../../../server/services/prisma';

export const seedHospitalInternalReputation = async () => {
  const hospital1 = await client.hospital.findFirst({
    where: { name: 'ひかり動物病院' },
  });

  await client.hospitalInternalReputation.upsert({
    where: { hospital_id: hospital1.id },
    update: {},
    create: {
      hospital_id: hospital1.id,
      star: 3,
      remark: '',
    },
  });

  const hospital2 = await client.hospital.findFirst({
    where: { name: 'ひがし東京夜間救急動物医療センター' },
  });
  await client.hospitalInternalReputation.upsert({
    where: { hospital_id: hospital2.id },
    update: {},
    create: {
      hospital_id: hospital2.id,
      star: 3,
      remark: '',
    },
  });
};
