/// <reference types="../__generated__/public_api_types" />
// ref: https://github.com/prisma-labs/graphql-framework-experiment/issues/952#issuecomment-647865021
// because ts-node-dev does not know nexus generated types, type injection is needed

import { queryField, nonNull, stringArg, booleanArg } from 'nexus';
import { connectionFromArray } from 'graphql-relay';
import { hospitalType } from '../types';
import { getGeoLocation } from '@/services/api/googleApi';

export const hospitalConnection = queryField((t) => {
  t.connectionField('publicHospitalConnection', {
    type: hospitalType,
    additionalArgs: {
      searchText: nonNull(stringArg()),
      reservable: nonNull(booleanArg()),
      nightServiceOption: nonNull(booleanArg()),
      insuranceEnabled: nonNull(booleanArg()),
      jsavaOption: nonNull(booleanArg()),
      nichijuOption: nonNull(booleanArg()),
    },
    resolve: async (_root, args, ctx) => {
      const hospitals = await ctx.prisma.hospital.findMany({
        where: {
          deleted: false,
          hospitalReservationStatus: {
            reservable: args.reservable ? '○' : undefined,
          },
          hospitalNightServiceOption: {
            status: args.nightServiceOption ? '○' : undefined,
          },
          hospitalBusinessForm: {
            insurance_enabled: args.insuranceEnabled ? '○' : undefined,
          },
          hospitalCertificationOption: {
            jsava_registered: args.jsavaOption ? '○' : undefined,
            nichiju_registered: args.nichijuOption ? '○' : undefined,
          },
        },
        select: {
          id: true,
          name: true,
          internal_memo: true,
          url: true,
          hospitalAddress: {
            select: {
              hospitalAddressGeoLocation: {
                select: {
                  latitude: true,
                  longitude: true,
                },
              },
            },
          },
        },
      });

      if (args.searchText !== '') {
        const result = await getGeoLocation(args.searchText);
        const location = result.data.results[0]?.geometry.location;
        if (location) {
          const sorted = hospitals
            .filter(
              (hospital) =>
                !!hospital.hospitalAddress?.hospitalAddressGeoLocation
            )
            .sort((a, b) => {
              const aLocation = a.hospitalAddress?.hospitalAddressGeoLocation;
              const bLocation = b.hospitalAddress?.hospitalAddressGeoLocation;
              if (aLocation && bLocation) {
                const aDistance =
                  (aLocation.latitude - location.lat) ** 2 +
                  (aLocation.longitude - location.lng) ** 2;
                const bDistance =
                  (bLocation.latitude - location.lat) ** 2 +
                  (bLocation.longitude - location.lng) ** 2;
                return aDistance - bDistance;
              }
              return 0;
            });
          return connectionFromArray(sorted, args);
        }
      }

      return connectionFromArray(hospitals, args);
    },
  });
});
