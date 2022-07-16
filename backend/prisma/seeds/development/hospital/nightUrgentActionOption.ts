import { client } from '../../../../server/services/prisma';
import { HOSPITAL_STATUSES } from '../../../../server/services/constant';

export const seedHospitalNightUrgentActionOption = async () => {
  const hospital1 = await client.hospital.findFirstOrThrow({
    where: { name: 'ひかり動物病院' },
  });

  await client.hospitalNightUrgentActionOption.upsert({
    where: { hospital_id: hospital1.id },
    update: {},
    create: {
      hospital_id: hospital1.id,
      status: '不明',
    },
  });

  const hospital2 = await client.hospital.findFirstOrThrow({
    where: { name: 'ひがし東京夜間救急動物医療センター' },
  });
  await client.hospitalNightUrgentActionOption.upsert({
    where: { hospital_id: hospital2.id },
    update: {},
    create: {
      hospital_id: hospital2.id,
      status: HOSPITAL_STATUSES.YES,
    },
  });
};
