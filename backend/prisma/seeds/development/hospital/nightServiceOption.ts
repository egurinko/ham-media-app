import { client } from '../../../../server/services/prisma';
import { HOSPITAL_STATUSES } from '../../../../server/services/constant';

export const seedHospitalNightServiceOption = async () => {
  const hospital1 = await client.hospital.findFirst({
    where: { name: 'ひかり動物病院' },
  });

  await client.hospitalNightServiceOption.upsert({
    where: { hospital_id: hospital1.id },
    update: {},
    create: {
      hospital_id: hospital1.id,
      status: HOSPITAL_STATUSES.NO,
      remark: '',
    },
  });

  const hospital2 = await client.hospital.findFirst({
    where: { name: 'ひがし東京夜間救急動物医療センター' },
  });
  await client.hospitalNightServiceOption.upsert({
    where: { hospital_id: hospital2.id },
    update: {},
    create: {
      hospital_id: hospital2.id,
      status: HOSPITAL_STATUSES.YES,
      remark: 'ハムスターは要事前確認',
    },
  });
};
