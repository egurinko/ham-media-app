import { nonNull, mutationField, arg } from 'nexus';
import { addressType } from '../types';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';
import { googleApi } from '@/services/api';

export const upsertHospitalAddressGeoLocationField = mutationField((t) => {
  t.nonNull.field('upsertHospitalAddressGeoLocation', {
    type: addressType,
    args: {
      hospitalAddressId: nonNull(arg({ type: 'BigInt' })),
    },
    resolve: async (_, args, ctx) => {
      try {
        const hospitalAddress =
          await ctx.prisma.hospitalAddress.findUniqueOrThrow({
            where: { id: args.hospitalAddressId },
          });
        const prefecture = await ctx.prisma.hospitalAddress
          .findUniqueOrThrow({
            where: { id: hospitalAddress.id },
          })
          .prefecture();
        const fullAddress = `${prefecture.name}${hospitalAddress.address}`;
        const result = await googleApi.getGeoLocation(fullAddress);
        const geoLocation = result.data.results[0]?.geometry.location;
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
