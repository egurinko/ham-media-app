import { inputObjectType } from 'nexus';

export const requestProductsInputType = inputObjectType({
  name: 'CreateStockRequestRequestProductsInputType',
  definition(t) {
    t.nonNull.int('productId');
    t.nonNull.int('count');
  },
});
