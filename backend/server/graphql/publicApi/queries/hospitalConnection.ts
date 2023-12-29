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
import { Hospital, Prisma } from '@prisma/client';
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
      recommended: nonNull(booleanArg()),
    },
    resolve: async (_root, args, ctx) => {
      let currentLocation: { latitude: number; longitude: number } | undefined =
        undefined;
      if (args.currentLocation) {
        currentLocation = args.currentLocation;
      } else if (args.searchText !== '') {
        const result = await getGeoLocation(args.searchText);
        const location = result.data.results[0]?.geometry.location;
        if (location) {
          currentLocation = { latitude: location.lat, longitude: location.lng };
        }
      }

      return connectionFromArray(
        await ctx.prisma.$queryRaw<Hospital[]>`
        SELECT hospitals.id, hospitals.name, hospitals.url, hospitals.deleted, hospitals.internal_memo, hospitals.created_at, hospitals.updated_at FROM hospitals
        JOIN hospital_reservation_statuses ON hospital_reservation_statuses.hospital_id = hospitals.id
        JOIN hospital_night_service_options ON hospital_night_service_options.hospital_id = hospitals.id
        JOIN hospital_business_forms ON hospital_business_forms.hospital_id = hospitals.id
        JOIN hospital_certification_options ON hospital_certification_options.hospital_id = hospitals.id
        JOIN hospital_internal_reputations ON hospital_internal_reputations.hospital_id = hospitals.id
        JOIN hospital_addresses ON hospital_addresses.hospital_id = hospitals.id
        JOIN hospital_address_geo_locations ON hospital_address_geo_locations.hospital_address_id = hospital_addresses.id
        WHERE hospitals.deleted = false
        ${
          args.reservable
            ? Prisma.sql`AND hospital_reservation_statuses.reservable = '○'`
            : Prisma.empty
        }
        ${
          args.nightServiceOption
            ? Prisma.sql`AND hospital_night_service_options.status = '○'`
            : Prisma.empty
        }
        ${
          args.insuranceEnabled
            ? Prisma.sql`AND hospital_business_forms.insurance_enabled = '○'`
            : Prisma.empty
        }
        ${
          args.jsavaOption
            ? Prisma.sql`AND hospital_certification_options.jsava_registered = '○'`
            : Prisma.empty
        }
        ${
          args.nichijuOption
            ? Prisma.sql`AND hospital_certification_options.nichiju_registered = '○'`
            : Prisma.empty
        }
        ${
          args.recommended
            ? Prisma.sql`AND hospital_internal_reputations.star = 5`
            : Prisma.empty
        }
        ${
          currentLocation
            ? Prisma.sql`ORDER BY POW(${currentLocation.latitude} - hospital_address_geo_locations.latitude, 2) + POW(${currentLocation.longitude} - hospital_address_geo_locations.longitude, 2)`
            : Prisma.sql`ORDER BY hospital_addresses.prefecture_id`
        }
      `,
        args,
      );
    },
  });
});
