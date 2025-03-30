import { Card } from '@/app/components/atoms/Card';
import { Typography } from '@/app/components/atoms/Typography';
import { StocksAddTable } from '@/app/components/organisms/admin/productStocks/StocksAddTable';
import { css } from '@/styled/css';
import { StocksTable } from './StocksTable';
import { getProductStocks, getInternalUsers } from './index.api';
import type { FC } from 'react';

type Props = {
  productId: number;
};

export const ProductStocks: FC<Props> = async ({ productId }) => {
  const productStocks = await getProductStocks({ productId });
  const { adminInternalUsers, internalUsers } = await getInternalUsers({});

  return (
    <Card
      className={css({
        p: 'md',
        w: '100%',
        whiteSpace: 'pre-line',
      })}
    >
      <Typography
        variant="subhead"
        bold
        className={css({
          mb: 'md',
        })}
      >
        在庫情報
      </Typography>
      <StocksTable
        stocks={productStocks}
        adminInternalUsers={adminInternalUsers}
        internalUsers={internalUsers}
      ></StocksTable>
      <Typography
        variant="subhead"
        bold
        className={css({
          my: 'md',
        })}
      >
        在庫追加
      </Typography>
      <StocksAddTable
        productId={productId}
        adminInternalUsers={adminInternalUsers}
      />
    </Card>
  );
};
