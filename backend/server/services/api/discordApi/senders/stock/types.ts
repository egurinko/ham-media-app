import type { Product, Stock, InternalUser } from '@prisma/client';
import { WEBHOOK_RESPONSE } from '@/services/api/discordApi/notifiers/stock';

export type PostStockAlertVariables = (Stock & {
  product: Product;
  internalUser: InternalUser;
})[];

export type PostStockAlertResponse = WEBHOOK_RESPONSE[];
