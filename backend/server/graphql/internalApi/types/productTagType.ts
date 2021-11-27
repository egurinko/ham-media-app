import { objectType } from 'nexus';
import { ProductTag } from 'nexus-prisma';

export const productTagType = objectType({
  name: ProductTag.$name,
  description: ProductTag.$description,
  definition(t) {
    t.field(ProductTag.id);
    t.field(ProductTag.name);
  },
});
