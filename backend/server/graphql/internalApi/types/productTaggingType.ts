import { objectType } from 'nexus';
import { ProductTagging } from 'nexus-prisma';

export const productTaggingType = objectType({
  name: ProductTagging.$name,
  description: ProductTagging.$description,
  definition(t) {
    t.field(ProductTagging.id);
    t.field(ProductTagging.productTag);
  },
});
