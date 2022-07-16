import { objectType } from 'nexus';
import { Hospital } from 'nexus-prisma';

export const hospitalType = objectType({
  name: Hospital.$name,
  description: Hospital.$description,
  definition(t) {
    t.field(Hospital.id);
    t.field(Hospital.name);
    t.field(Hospital.url);
    t.field(Hospital.hospitalAddress);
    t.field(Hospital.hospitalBusinessForm);
    t.field(Hospital.hospitalCertificationOption);
    t.field(Hospital.hospitalNightServiceOption);
    t.field(Hospital.hospitalNightUrgentActionOption);
    t.field(Hospital.hospitalReservationStatus);
    t.nonNull.boolean('recommended', {
      resolve: async (root, _args, ctx) => {
        const internalReputation = await ctx.prisma.hospital
          .findUniqueOrThrow({
            where: { id: root.id },
          })
          .hospitalInternalReputation();

        return internalReputation?.star === 5;
      },
    });
  },
});
