import { objectType } from 'nexus';
import { StockRequest } from 'nexus-prisma';

export const stockRequestType = objectType({
  name: StockRequest.$name,
  description: StockRequest.$description,
  definition(t) {
    t.field(StockRequest.id);
    t.field(StockRequest.internalUser);
    t.field(StockRequest.stockRegistrations);
  },
});
