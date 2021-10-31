import { Params } from 'fastify-cron';
import { client } from '@/services/prisma';
import { googleApi } from '@/services/api';

export const createGeoLocationJob: Params = {
  cronTime: '*/1 * * * *',
  onTick: async () => {
    const geoLocationLessHospitalAddresses =
      await client.hospitalAddress.findMany({
        where: {
          hospitalAddressGeoLocation: null,
        },
        include: {
          hospitalAddressGeoLocation: true,
          prefecture: true,
        },
      });

    geoLocationLessHospitalAddresses.forEach(async (hospitalAddress) => {
      try {
        const response = await googleApi.getGeoLocation(
          hospitalAddress.prefecture.name + hospitalAddress.address
        );
        const result = response.data.results[0];
        if (result) {
          const { location } = result.geometry;
          await client.hospitalAddress.update({
            where: { id: hospitalAddress.id },
            data: {
              hospitalAddressGeoLocation: {
                create: {
                  latitude: location.lat,
                  longitude: location.lng,
                },
              },
            },
          });
        }
      } catch (_) {
        // TODO: catch by sentry
      }
    });
  },
};
