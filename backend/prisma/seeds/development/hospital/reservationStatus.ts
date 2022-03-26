import { client } from '../../../../server/services/prisma';
import { HOSPITAL_STATUSES } from '../../../../server/services/constant';

export const seedHospitalReservationStatus = async () => {
  const hospital1 = await client.hospital.findFirst({
    where: { name: 'ひかり動物病院' },
  });

  await client.hospitalReservationStatus.upsert({
    where: { hospital_id: hospital1.id },
    update: {},
    create: {
      hospital_id: hospital1.id,
      required: HOSPITAL_STATUSES.NO,
      reservable: HOSPITAL_STATUSES.NO,
      remark: '',
    },
  });

  const hospital2 = await client.hospital.findFirst({
    where: { name: 'ひがし東京夜間救急動物医療センター' },
  });
  await client.hospitalReservationStatus.upsert({
    where: { hospital_id: hospital2.id },
    update: {},
    create: {
      hospital_id: hospital2.id,
      required: HOSPITAL_STATUSES.YES,
      reservable: HOSPITAL_STATUSES.YES,
      remark: '',
    },
  });
};
