import { postStockAlert } from '@/services/api/discordApi/notifiers/stock';
import type { PostStockRequestAlertVariables } from './types';
import type { InternalUser } from '@prisma/client';

export const postStockRequestApprovalAlert = (
  stockRequest: PostStockRequestAlertVariables,
  approvingInternalUser: InternalUser,
  message: string
) => {
  const lines = stockRequest.productRegistrations
    .map(
      (productRegistration) =>
        `\n・${productRegistration.product.name} https://ham-media-app.net/admin/products/${productRegistration.product.id}`
    )
    .join();
  const content = `<@${stockRequest.internalUser.discord_user_id}> さんの在庫リクエストが <@${approvingInternalUser.discord_user_id}> さんに承認されたよ <:ok:776668642976071730> \n <@${approvingInternalUser.discord_user_id}> さんは在庫の割り当てをやってね🙊 ${lines} \n[承認メッセージ]\n${message}\n`;
  postStockAlert(content);
};
