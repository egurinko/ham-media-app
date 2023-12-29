import type { LocationEventMessage, Message } from '@line/bot-sdk';
import { client } from '@/services/prisma';
import { createLocationReplyMessage } from '@/services/line/views';
import type { RegionalHospitals } from '@/services/line/views';

export const getLocationEventReplyMessage = async (
  message: LocationEventMessage,
): Promise<Message[]> => {
  const hospitals = await getHospitals();
  const sorted = sortHospital(hospitals, {
    latitude: message.latitude,
    longitude: message.longitude,
  });
  const sliced = sorted.slice(0, 10);

  return [createLocationReplyMessage(sliced)];
};

const getHospitals = async (): Promise<RegionalHospitals> => {
  return await client.hospital.findMany({
    where: {
      deleted: false,
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

const sortHospital = (
  hospitals: RegionalHospitals,
  currentLocation: { latitude: number; longitude: number },
): RegionalHospitals =>
  hospitals
    .filter(
      (hospital) => !!hospital.hospitalAddress?.hospitalAddressGeoLocation,
    )
    .sort((a, b) => {
      const aLocation = a.hospitalAddress?.hospitalAddressGeoLocation;
      const bLocation = b.hospitalAddress?.hospitalAddressGeoLocation;
      if (aLocation && bLocation) {
        const aDistance =
          (aLocation.latitude - currentLocation.latitude) ** 2 +
          (aLocation.longitude - currentLocation.longitude) ** 2;
        const bDistance =
          (bLocation.latitude - currentLocation.latitude) ** 2 +
          (bLocation.longitude - currentLocation.longitude) ** 2;
        return aDistance - bDistance;
      }
      return 0;
    });
