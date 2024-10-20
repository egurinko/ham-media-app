import { postStockAlert } from '@/services/api/discordApi/notifiers/stock';
import type { PostStockAlertVariables } from './types';
import { postStockAlertContents } from './expiringAlert';
import { PostStockAlertResponse } from '@/services/api/discordApi/senders/stock/types';

export const postStockExpirationAlert = async (
  stocks: PostStockAlertVariables,
): Promise<PostStockAlertResponse> => {
  await postStockAlert(
    `===== 以下の在庫の期限が切れているよ <:shock:844862291215122432> =====`,
  );

  return postStockAlertContents(stocks);
};
