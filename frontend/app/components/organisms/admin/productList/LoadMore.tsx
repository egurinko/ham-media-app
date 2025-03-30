'use client';

import { useState, useRef, useEffect } from 'react';
import { ListItem } from '@/app/components/organisms/admin/productListItem/Index';
import { ListSkeleton } from '@/app/components/organisms/admin/skeletons/ListSkeleton';
import { useIntersectionObserver } from '@/app/utils/hooks/useIntersectionObserver';
import { css } from '@/styled/css';
import type { GetProductsMoreActionResponse } from './index.action';
import type { GetProductConnectionQueryVariables } from './index.api.generated';
import type { ProductListItemFieldsFragment } from '../productListItem/index.api.generated';
import type { FC } from 'react';

type Props = {
  initialHasNextPage?: boolean;
  initialEndCursor?: string | null;
  name: string;
  makerId?: number;
  productTagId?: number;
  allocatedInternalUserId?: number;
  internalUserId?: number;
  hasStock?: boolean;
  getProductsMoreAction: (
    variables: GetProductConnectionQueryVariables,
  ) => GetProductsMoreActionResponse;
};

export const LoadMore: FC<Props> = ({
  initialHasNextPage,
  initialEndCursor,
  name,
  makerId,
  productTagId,
  allocatedInternalUserId,
  internalUserId,
  hasStock,
  getProductsMoreAction,
}) => {
  const [isPending, setIsPending] = useState(false);
  const [products, setProducts] = useState<ProductListItemFieldsFragment[]>([]);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage || false);
  const [endCursor, setEndCursor] = useState(initialEndCursor);
  const infiniteScrollTarget = useRef<HTMLDivElement>(null);
  const { isIntersect } = useIntersectionObserver(infiniteScrollTarget);

  useEffect(() => {
    setHasNextPage(initialHasNextPage || false);
  }, [initialHasNextPage]);

  useEffect(() => {
    if (isIntersect && hasNextPage && !isPending) {
      getProductsMoreAction({
        first: 10,
        after: endCursor,
        name,
        makerId,
        productTagId,
        allocatedInternalUserId,
        internalUserId,
        hasStock,
      })
        .then(({ pageInfo, products: newProducts }) => {
          setProducts([...new Set([...products, ...newProducts])]);
          setHasNextPage(pageInfo?.hasNextPage ?? false);
          setEndCursor(pageInfo?.endCursor ?? null);
        })
        .finally(() => {
          setIsPending(false);
        });
    }
  }, [
    products,
    isIntersect,
    hasNextPage,
    endCursor,
    isPending,
    name,
    makerId,
    productTagId,
    allocatedInternalUserId,
    internalUserId,
    hasStock,
    getProductsMoreAction,
  ]);

  return (
    <>
      {products.map((product) => (
        <ListItem product={product} key={product.id} />
      ))}
      <div
        className={css({
          h: 10,
        })}
      >
        {hasNextPage && <div ref={infiniteScrollTarget} />}
      </div>
      {isPending && <ListSkeleton />}
    </>
  );
};
