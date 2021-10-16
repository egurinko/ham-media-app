/// <reference types="../__generated__/public_api_types" />
// ref: https://github.com/prisma-labs/graphql-framework-experiment/issues/952#issuecomment-647865021
// because ts-node-dev does not know nexus generated types, type injection is needed

import {
  queryField,
  nonNull,
  nullable,
  stringArg,
  booleanArg,
  inputObjectType,
} from 'nexus';
import { connectionFromArray } from 'graphql-relay';
import {
  Hospital,
  HospitalAddress,
  HospitalAddressGeoLocation,
} from '@prisma/client';
import { hospitalType } from '../types';
import { getGeoLocation } from '@/services/api/googleApi';

const currentLocationInput = inputObjectType({
  name: 'currentLocation',
  definition(t) {
    t.nonNull.float('latitude');
    t.nonNull.float('longitude');
  },
});

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
      currentLocation: nullable(currentLocationInput),
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
        include: {
          hospitalAddress: {
            include: {
              hospitalAddressGeoLocation: true,
            },
          },
        },
      });

      if (args.currentLocation) {
        const sorted = sortHospital(hospitals, args.currentLocation);
        return connectionFromArray(sorted, args);
      } else if (args.searchText !== '') {
        const result = await getGeoLocation(args.searchText);
        const location = result.data.results[0]?.geometry.location;
        if (location) {
          const sorted = sortHospital(hospitals, {
            latitude: location.lat,
            longitude: location.lng,
          });
          return connectionFromArray(sorted, args);
        }
      }

      return connectionFromArray(hospitals, args);
    },
  });
});

type SortingHospital = Hospital & {
  hospitalAddress: SortingHospitalAddress;
};

type SortingHospitalAddress =
  | null
  | (HospitalAddress & {
      hospitalAddressGeoLocation: SortingHospitalAddressGeoLocation;
    });
type SortingHospitalAddressGeoLocation = HospitalAddressGeoLocation | null;

const sortHospital = (
  hospitals: SortingHospital[],
  currentLocation: { latitude: number; longitude: number }
): SortingHospital[] =>
  hospitals
    .filter(
      (hospital) => !!hospital.hospitalAddress?.hospitalAddressGeoLocation
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
