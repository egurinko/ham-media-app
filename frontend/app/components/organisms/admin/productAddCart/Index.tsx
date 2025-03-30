import { Card } from '@/app/components/atoms/Card';
import { Typography } from '@/app/components/atoms/Typography';
import { CopyURL } from '@/app/components/molecules/CopyURL';
import { Form } from '@/app/components/organisms/admin/productAddCart/Form';
import { ProductSummary } from '@/app/components/organisms/admin/productSummary/Index';
import { css } from '@/styled/css';
import { flex } from '@/styled/patterns';
import { getProduct } from './index.api';
import type { FC } from 'react';

type Props = {
  productId: number;
};

export const ProductAddCart: FC<Props> = async ({ productId }) => {
  const product = await getProduct({ id: productId });

  return (
    <Card
      className={css({
        p: 'md',
        w: '100%',
        whiteSpace: 'pre-line',
      })}
    >
      <div
        className={css({
          textAlign: 'right',
        })}
      >
        <CopyURL />
      </div>
      <div
        className={flex({
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <ProductSummary product={product} />
      </div>
      {product.remark !== '' ? (
        <Typography variant="body1">※ {product.remark}</Typography>
      ) : null}
      <Form
        productId={productId}
        remainingStockAmount={product.remainingStockAmount}
      />
    </Card>
  );
};
