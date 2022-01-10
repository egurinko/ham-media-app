import { inputObjectType } from 'nexus';

export const requestProductsInputType = inputObjectType({
  name: 'CreateStockRequestrequestProductsInputType',
  definition(t) {
    t.nonNull.int('productId');
    t.nonNull.int('count');
  },
});
