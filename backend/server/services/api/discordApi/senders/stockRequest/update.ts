import { postStockAlert } from '@/services/api/discordApi/notifiers/stock';
import type { PostStockRequestAlertVariables } from './types';
import { createStockRequestCounts } from './utils';

export const postStockRequestUpdateAlert = (
  stockRequest: PostStockRequestAlertVariables
): void => {
  const stockRequestCounts = createStockRequestCounts(stockRequest);
  const lines = stockRequestCounts
    .map(
      (stockRequestCount) =>
        `\n・${stockRequestCount.product.name}：${stockRequestCount.count}つ`
    )
    .join();
  const content = `<@${stockRequest.internalUser.discord_user_id}> さんが在庫リクエストを更新したよ <:yeah:913316943921033247> \n https://ham-media-app.net/admin/stock_requests/${stockRequest.id}/edit ${lines}`;
  postStockAlert(content);
};
