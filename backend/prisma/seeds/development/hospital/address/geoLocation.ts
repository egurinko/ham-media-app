import { client } from '../../../../../server/services/prisma';

export const seedHospitalAddressGeoLocation = async () => {
  const hospital1 = await client.hospital.findFirst({
    where: { name: 'ひかり動物病院' },
  });
  const hospitalAddress1 = await client.hospitalAddress.findFirst({
    where: { hospital_id: hospital1.id },
  });

  await client.hospitalAddressGeoLocation.upsert({
    where: { hospital_address_id: hospitalAddress1.id },
    update: {},
    create: {
      hospital_address_id: hospitalAddress1.id,
      latitude: 34.50387380142774,
      longitude: 136.7642135552559,
    },
  });

  const hospital2 = await client.hospital.findFirst({
    where: { name: 'ひがし東京夜間救急動物医療センター' },
  });
  const hospitalAddress2 = await client.hospitalAddress.findFirst({
    where: { hospital_id: hospital2.id },
  });

  await client.hospitalAddressGeoLocation.upsert({
    where: { hospital_address_id: hospitalAddress2.id },
    update: {},
    create: {
      hospital_address_id: hospitalAddress2.id,
      latitude: 35.697888004028734,
      longitude: 139.841718012962,
    },
  });
};
