import type { FlexMessage } from '@line/bot-sdk';
import type { Prefecture } from '@prisma/client';
import { client } from '@/services/prisma';
import { createSearchNightServiceHospitalsRegionallyReplyMessage } from '@/services/line/views';
import type { RegionalHospitals } from '@/services/line/views';

export const getSearchNightServiceHospitalsRegionallyReplyMessage = async (
  text: string
): Promise<FlexMessage> => {
  const hospitals = await getRegionalHospitals(text);
  const sliced = hospitals.slice(0, 10);

  return createSearchNightServiceHospitalsRegionallyReplyMessage(sliced);
};

const getRegionalPrefectures = async (text: string): Promise<Prefecture[]> => {
  const userInputRegion = text.split('の')[0];
  return await client.prefecture.findMany({
    where: {
      region: {
        is: {
          name: userInputRegion,
        },
      },
    },
  });
};

const getRegionalHospitals = async (
  text: string
): Promise<RegionalHospitals> => {
  const regionalPrefectures = await getRegionalPrefectures(text);

  return await client.hospital.findMany({
    where: {
      deleted: false,
      hospitalAddress: {
        is: {
          prefecture_id: {
            in: regionalPrefectures.map((prefecture) => prefecture.id),
          },
        },
      },
      hospitalNightServiceOption: {
        status: '○',
      },
    },
    include: {
      hospitalBusinessForm: true,
      hospitalNightServiceOption: true,
      hospitalReservationStatus: true,
      hospitalAddress: {
        include: {
          hospitalAddressGeoLocation: true,
          prefecture: true,
        },
      },
    },
  });
};
