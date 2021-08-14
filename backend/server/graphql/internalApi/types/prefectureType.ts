import { objectType } from 'nexus';
import { Prefecture } from 'nexus-prisma';

export const prefectureType = objectType({
  name: Prefecture.$name,
  description: Prefecture.$description,
  definition(t) {
    t.field(Prefecture.id);
    t.field(Prefecture.name);
    t.field(Prefecture.region);
  },
});
