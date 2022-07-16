import { client } from '../../../../server/services/prisma';
import { HOSPITAL_STATUSES } from '../../../../server/services/constant';

export const seedHospitalBusinessForm = async () => {
  const hospital1 = await client.hospital.findFirstOrThrow({
    where: { name: 'ひかり動物病院' },
  });

  await client.hospitalBusinessForm.upsert({
    where: { hospital_id: hospital1.id },
    update: {},
    create: {
      hospital_id: hospital1.id,
      business_hour: `平日・土
      09:00~12:00
      16:00~20:00`,
      closed_day: '日・祝',
      insurance_enabled: HOSPITAL_STATUSES.YES,
      remark: `※ハムスターは非専門
      診察はしてくださるようなので要電話
      アニコム損害保険`,
    },
  });

  const hospital2 = await client.hospital.findFirstOrThrow({
    where: { name: 'ひがし東京夜間救急動物医療センター' },
  });
  await client.hospitalBusinessForm.upsert({
    where: { hospital_id: hospital2.id },
    update: {},
    create: {
      hospital_id: hospital2.id,
      business_hour: '20:00~03:00',
      closed_day: 'なし',
      insurance_enabled: '×',
      remark: '◆要事前連絡',
    },
  });
};
