import { objectType } from 'nexus';

export const deleteType = objectType({
  name: 'Delete',
  definition(t) {
    t.nonNull.boolean('deleted');
  },
});
