import { objectType } from 'nexus';
import { Region } from 'nexus-prisma';

export const regionType = objectType({
  name: Region.$name,
  description: Region.$description,
  definition(t) {
    t.field(Region.id);
    t.field(Region.name);
  },
});
