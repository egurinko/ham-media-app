import { nonNull, mutationField, arg, stringArg } from 'nexus';
import { addressType } from '../types';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';
import { googleApi } from '@/services/api';

export const upsertHospitalAddressGeoLocationField = mutationField((t) => {
  t.nonNull.field('upsertHospitalAddressGeoLocation', {
    type: addressType,
    args: {
      hospitalAddressId: nonNull(arg({ type: 'BigInt' })),
      address: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      try {
        const address = await googleApi.getGeoLocation(args.address);
        const geoLocation = address.data.results[0]?.geometry.location;
        if (geoLocation) {
          return await ctx.prisma.hospitalAddress.update({
            where: { id: args.hospitalAddressId },
            data: {
              hospitalAddressGeoLocation: {
                upsert: {
                  update: {
                    latitude: geoLocation.lat,
                    longitude: geoLocation.lng,
                  },
                  create: {
                    latitude: geoLocation.lat,
                    longitude: geoLocation.lng,
                  },
                },
              },
            },
          });
        } else {
          throw new Error('geo location not found');
        }
      } catch (e) {
        const { key, message, statusCode } = judgeError(e);
        throw new Mercurius.ErrorWithProps(message, {
          key,
          message,
          statusCode,
        });
      }
    },
  });
});
