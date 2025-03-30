import { ListItem } from '@/app/components/organisms/admin/productListItem/Index';
import { getNodesFromConnectionEdges } from '@/app/utils/connection';
import { css } from '@/styled/css';
import { LoadMore } from './LoadMore';
import { getProductsMoreAction } from './index.action';
import { getProductConnection } from './index.api';
import type { FC } from 'react';

type Props = {
  name: string;
  makerId?: number;
  productTagId?: number;
  allocatedInternalUserId?: number;
  internalUserId?: number;
  hasStock: string;
};

export const ProductList: FC<Props> = async ({
  name,
  makerId,
  productTagId,
  allocatedInternalUserId,
  internalUserId,
  hasStock,
}) => {
  const apiHasStock =
    hasStock === 'has' ? true : hasStock === 'not' ? false : undefined;
  const { data } = await getProductConnection({
    first: 10,
    name,
    makerId,
    productTagId,
    allocatedInternalUserId,
    internalUserId,
    hasStock: apiHasStock,
  });

  return (
    <ul
      className={css({
        width: '100%',
        borderBottomWidth: 'thin',
        borderColor: 'outline.main',
      })}
    >
      {getNodesFromConnectionEdges(data.productConnection?.edges).map(
        (product) => (
          <ListItem key={product.id} product={product} />
        ),
      )}
      {data.productConnection?.pageInfo.hasNextPage && (
        <LoadMore
          initialHasNextPage={data.productConnection?.pageInfo.hasNextPage}
          initialEndCursor={data.productConnection?.pageInfo.endCursor}
          name={name}
          makerId={makerId}
          productTagId={productTagId}
          allocatedInternalUserId={allocatedInternalUserId}
          internalUserId={internalUserId}
          hasStock={apiHasStock}
          getProductsMoreAction={getProductsMoreAction}
        />
      )}
    </ul>
  );
};
