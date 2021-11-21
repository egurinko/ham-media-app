import { objectType } from 'nexus';
import { StockAllocation } from 'nexus-prisma';

export const stockAllocationType = objectType({
  name: StockAllocation.$name,
  description: StockAllocation.$description,
  definition(t) {
    t.field(StockAllocation.id);
    t.field(StockAllocation.created_at);
    t.field(StockAllocation.internalUser);
  },
});
