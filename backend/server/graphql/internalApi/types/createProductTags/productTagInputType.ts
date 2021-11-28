import { inputObjectType } from 'nexus';

export const productTagInputType = inputObjectType({
  name: 'CreateProductTagsProductTagInputType',
  definition(t) {
    t.nonNull.string('name');
  },
});
