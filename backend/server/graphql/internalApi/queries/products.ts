import { queryField } from 'nexus';
import { productType } from '../types';

export const products = queryField((t) => {
  t.nonNull.list.nonNull.field('products', {
    type: productType,
    resolve(_root, _args, ctx) {
      return ctx.prisma.product.findMany({
        include: { maker: true, stocks: true },
      });
    },
  });
});
