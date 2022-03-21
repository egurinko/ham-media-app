import { nonNull, mutationField, arg, stringArg } from 'nexus';
import { geoLocationType } from '../types';
import Mercurius from 'mercurius';
import { judgeError } from '@/services/error/judge';
import { googleApi } from '@/services/api';

export const updateHospitalAddressGeoLocationField = mutationField((t) => {
  t.nonNull.field('updateHospitalAddressGeoLocation', {
    type: geoLocationType,
    args: {
      id: nonNull(arg({ type: 'BigInt' })),
      address: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      try {
        const address = await googleApi.getGeoLocation(args.address);
        return await ctx.prisma.hospitalAddressGeoLocation.update({
          where: { id: args.id },
          data: {
            latitude: address.data.results[0]?.geometry.location.lat,
            longitude: address.data.results[0]?.geometry.location.lng,
          },
        });
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
