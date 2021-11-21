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
    t.nonNull.field(Product.stocks);
    t.nonNull.int('totalStockAmount', {
      resolve: async (root, _args, ctx) => {
        return ctx.prisma.stock.count({ where: { product_id: root.id } });
      },
    });
    t.nonNull.int('allocatedStockAmount', {
      resolve: async (root, _args, ctx) => {
        return ctx.prisma.stock.count({
          where: { product_id: root.id, stockAllocation: { isNot: null } },
        });
      },
    });
    t.nonNull.int('remainingStockAmount', {
      resolve: async (root, _args, ctx) => {
        return ctx.prisma.stock.count({
          where: { product_id: root.id, stockAllocation: { is: null } },
        });
      },
    });
  },
});
