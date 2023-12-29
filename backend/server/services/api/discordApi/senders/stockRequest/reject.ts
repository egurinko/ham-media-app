import { postStockAlert } from '@/services/api/discordApi/notifiers/stock';
import type { PostStockRequestAlertVariables } from './types';
import type { InternalUser } from '@prisma/client';
import { createStockRequestCounts } from './utils';

export const postStockRequestRejectionAlert = (
  stockRequest: PostStockRequestAlertVariables,
  rejectInternalUser: InternalUser,
  message: string,
) => {
  const stockRequestCounts = createStockRequestCounts(stockRequest);
  const lines = stockRequestCounts
    .map(
      (stockRequestCount) =>
        `\n・${stockRequestCount.product.name}：${stockRequestCount.count}つ`,
    )
    .join();
  const content = `<@${stockRequest.internalUser.discord_user_id}> さんの在庫リクエストが <@${rejectInternalUser.discord_user_id}> さんに棄却されたよ <:jii:913298500861698058> ${lines} \n[棄却メッセージ]\n${message}`;
  postStockAlert(content);
};
