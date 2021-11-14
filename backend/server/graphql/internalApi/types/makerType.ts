import { objectType } from 'nexus';
import { Maker } from 'nexus-prisma';

export const makerType = objectType({
  name: Maker.$name,
  description: Maker.$description,
  definition(t) {
    t.field(Maker.id);
    t.field(Maker.name);
  },
});
