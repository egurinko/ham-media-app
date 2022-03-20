import type { Product, Stock } from '@prisma/client';

export type PostStockAlertVariables = (Stock & {
  product: Product;
})[];
