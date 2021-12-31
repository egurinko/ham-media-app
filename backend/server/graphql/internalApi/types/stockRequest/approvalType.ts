import { objectType } from 'nexus';
import { StockRequestApproval } from 'nexus-prisma';

export const approvalType = objectType({
  name: StockRequestApproval.$name,
  description: StockRequestApproval.$description,
  definition(t) {
    t.field(StockRequestApproval.id);
  },
});
