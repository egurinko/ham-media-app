import Link from 'next/link';
import { Tag } from '@/app/components/atoms/Tag';
import { Typography } from '@/app/components/atoms/Typography';
import type { ProductListItemFieldsFragment } from '@/app/components/organisms/admin/productListItem/index.api.generated';
import { Zoom } from '@/components/atoms/Zoom';
import { css } from '@/styled/css';
import { flex } from '@/styled/patterns';
import { ADMIN_PRODUCTS_DETAIL_PATH } from '@/utils/routes';
import type { FC } from 'react';

type Props = {
  product: ProductListItemFieldsFragment;
};

export const ProductSummary: FC<Props> = ({ product }) => (
  <>
    <div
      className={flex({
        gap: 'sm',
        fill: 'background.on-main',
        alignItems: 'center',
      })}
    >
      <Zoom>
        <img
          src={product.url}
          alt={product.name}
          width="80"
          height="80"
          style={{
            objectFit: 'contain',
            width: '80px',
            height: '80px',
          }}
        />
      </Zoom>
      <div
        className={flex({
          flexDir: 'column',
          alignItems: 'start',
        })}
      >
        <Typography variant="caption">{product.maker.name}</Typography>
        <Link
          href={ADMIN_PRODUCTS_DETAIL_PATH(product.id)}
          className={css({
            textDecoration: 'underline',
          })}
        >
          <Typography variant="body2" bold={true}>
            {product.name}
          </Typography>
        </Link>
        <div
          className={flex({
            gap: 'sm',
            my: 'xs',
          })}
        >
          {product.productTaggings.map((productTagging) => (
            <Tag key={productTagging.id} visual="tonal" size="sm">
              {productTagging.productTag.name}
            </Tag>
          ))}
        </div>
        <Typography variant="caption">
          責任者：
          {Array.from(
            new Set(product.stocks.map((s) => s.internalUser.name)),
          ).join(', ')}
        </Typography>
        <Typography variant="caption">
          割当：
          {Array.from(
            new Set(
              product.stocks
                .filter((s) => s.stockAllocation)
                .map((s) => s.stockAllocation?.internalUser.name),
            ),
          ).join(', ')}
        </Typography>
      </div>
    </div>
    <div
      className={flex({
        gap: 'sm',
        flexDirection: 'column',
      })}
    >
      <Typography variant="body2">
        総在庫：{product.totalStockAmount}
      </Typography>
      <Typography variant="body2">
        貸出数：{product.allocatedStockAmount}
      </Typography>
      <Typography variant="body2">
        残数：{product.remainingStockAmount}
      </Typography>
    </div>
  </>
);
