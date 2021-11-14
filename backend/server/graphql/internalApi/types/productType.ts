import { objectType } from 'nexus';
import { Product } from 'nexus-prisma';

export const productType = objectType({
  name: Product.$name,
  description: Product.$description,
  definition(t) {
    t.field(Product.id);
    t.field(Product.name);
    t.field(Product.remark);
    t.nonNull.field(Product.maker);
    t.nonNull.list.field(Product.stocks);
  },
});
