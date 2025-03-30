import Link from 'next/link';
import { Tag } from '@/app/components/atoms/Tag';
import { Typography } from '@/app/components/atoms/Typography';
import { ActionDialog } from '@/app/components/organisms/admin/ActionDialog';
import { css } from '@/styled/css';
import { ADMIN_STOCK_REQUESTS_EDIT_PATH } from '@/utils/routes';
import { deleteStockRequestAction } from './index.action';
import type { StockRequestListItemFieldsFragment } from './index.api.generated';
import type { FC } from 'react';

type Props = {
  stockRequest: StockRequestListItemFieldsFragment;
};

export const ListItem: FC<Props> = ({ stockRequest }) => (
  <li
    key={stockRequest.id}
    className={css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      borderTopWidth: 'thin',
      borderColor: 'outline.main',
      p: 'sm',
    })}
  >
    <div>
      <Tag>承認待ち</Tag>
    </div>
    <Link href={ADMIN_STOCK_REQUESTS_EDIT_PATH(stockRequest.id)}>
      <Typography
        bold={false}
        variant="body1"
        className={css({ textDecorationLine: 'underline' })}
      >
        {stockRequest.id}
      </Typography>
    </Link>
    <Typography variant="body1">{stockRequest.internalUser.name}</Typography>
    <div>
      {stockRequest.productRegistrations.map((productRegistration) => (
        <div
          key={productRegistration.id}
          className={css({
            display: 'flex',
          })}
        >
          <img
            src={productRegistration.product.url}
            alt={productRegistration.product.name}
            width="25"
            height="25"
            style={{
              objectFit: 'contain',
              width: '25px',
              height: '25px',
            }}
          />
          <Typography variant="body1" display="inline">
            {productRegistration.product.name}
          </Typography>
        </div>
      ))}
    </div>
    <ActionDialog
      handleClick={async () => {
        'use server';
        return await deleteStockRequestAction(stockRequest.id);
      }}
      title="在庫リクエストの削除"
      description={`削除してもよろしいですか？`}
      submitLabel="削除する"
    />
  </li>
);
