import { objectType } from 'nexus';
import { Product } from 'nexus-prisma';

export const productType = objectType({
  name: Product.$name,
  description: Product.$description,
  definition(t) {
    t.field(Product.id);
    t.field(Product.name);
    t.field(Product.remark);
    t.field(Product.url);
    t.field(Product.productTaggings);
    t.nonNull.field(Product.maker);
    t.nonNull.field(Product.stocks);
    t.nonNull.int('totalStockAmount', {
      resolve: async (root, _args, ctx) => {
        const stocks = await ctx.prisma.product
          .findUnique({ where: { id: root.id } })
          .stocks();

        return stocks.length;
      },
    });
    t.nonNull.int('allocatedStockAmount', {
      resolve: async (root, _args, ctx) => {
        const stocks = await ctx.prisma.product
          .findUnique({ where: { id: root.id } })
          .stocks({ where: { stockAllocation: { isNot: null } } });
        return stocks.length;
      },
    });
    t.nonNull.int('remainingStockAmount', {
      resolve: async (root, _args, ctx) => {
        const stocks = await ctx.prisma.product
          .findUnique({ where: { id: root.id } })
          .stocks({ where: { stockAllocation: { is: null } } });
        return stocks.length;
      },
    });
  },
});
