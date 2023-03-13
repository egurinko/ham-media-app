import type { Product, Stock, InternalUser } from '@prisma/client';

export type PostStockAlertVariables = (Stock & {
  product: Product;
  internalUser: InternalUser;
})[];
