import { objectType } from 'nexus';
import { ProductTagGroup } from 'nexus-prisma';

export const productTagGroupType = objectType({
  name: ProductTagGroup.$name,
  description: ProductTagGroup.$description,
  definition(t) {
    t.field(ProductTagGroup.id);
    t.field(ProductTagGroup.name);
    t.field(ProductTagGroup.productTags);
  },
});
