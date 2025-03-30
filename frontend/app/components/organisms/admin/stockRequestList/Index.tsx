import { ListItem } from '@/app/components/organisms/admin/stockRequestListItem/Index';
import { css } from '@/styled/css';
import { getStockRequestConnection } from './index.api';
import type { FC } from 'react';

type Props = {
  internalUserId?: number;
};

export const StockRequestList: FC<Props> = async ({ internalUserId }) => {
  const { stockRequests } = await getStockRequestConnection({
    first: 30,
    internalUserId,
  });

  return (
    <ul
      className={css({
        width: '100%',
        borderBottomWidth: 'thin',
        borderColor: 'outline.main',
      })}
    >
      {stockRequests.map((stockRequest) => (
        <ListItem key={stockRequest.id} stockRequest={stockRequest} />
      ))}
      {/* 必要になったらページネーション */}
    </ul>
  );
};
