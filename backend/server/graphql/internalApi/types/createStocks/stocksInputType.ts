import { inputObjectType } from 'nexus';

export const stocksInputType = inputObjectType({
  name: 'CreateStocksStocksInputType',
  definition(t) {
    t.nonNull.dateTime('expiredAt');
    t.nonNull.int('amount');
    t.nonNull.bigInt('internalUserId');
  },
});
