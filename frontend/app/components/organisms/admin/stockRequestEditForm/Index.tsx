'use client';

import { createListCollection } from '@ark-ui/react';
import { useState, useActionState, useEffect } from 'react';
import type { GetStockRequestQuery } from '@/app/admin/(internal)/stock_requests/[id]/edit/page.api.generated';
import { Select } from '@/app/components/atoms';
import { Alert } from '@/app/components/atoms/Alert';
import { Button } from '@/app/components/atoms/Button';
import { Card } from '@/app/components/atoms/Card';
import { Icon } from '@/app/components/atoms/Icon';
import { SubmitButton } from '@/app/components/atoms/SubmitButton';
import type { ProductListItemFieldsFragment } from '@/app/components/organisms/admin/productListItem/index.api.generated';
import { ProductSummary } from '@/app/components/organisms/admin/productSummary/Index';
import { updateStockRequestAction } from '@/app/components/organisms/admin/stockRequestEditForm/index.action';
import { StockRequestNote } from '@/app/components/organisms/admin/stockRequestNote/Index';
import type { State } from '@/app/utils/formSchema/stockRequest';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import { css } from '@/styled/css';
import { flex } from '@/styled/patterns';
import type { FC } from 'react';

type CartProducts = {
  productId: number;
  count: number;
  product: ProductListItemFieldsFragment;
}[];

type Props = {
  stockRequest: {
    id: GetStockRequestQuery['stockRequest']['id'];
    internalUser: GetStockRequestQuery['stockRequest']['internalUser'];
    cartProducts: CartProducts;
  };
};

export const StockRequestEditForm: FC<Props> = ({ stockRequest }) => {
  const [cartProducts, setCartProducts] = useState<CartProducts>([]);
  const initialState: State = { message: '', errors: { _errors: [] } };
  const [state, dispatch] = useActionState(
    updateStockRequestAction,
    initialState,
  );

  useEffect(() => {
    if (cartProducts.length === 0) {
      setCartProducts(stockRequest.cartProducts);
    }
  }, [cartProducts, stockRequest]);

  const handleCountChange = (productId: number, count: number) => {
    const newCartProducts = cartProducts.map((cartProduct) => {
      if (cartProduct.productId === productId) {
        return { ...cartProduct, count };
      } else {
        return cartProduct;
      }
    });
    setCartProducts(newCartProducts);
  };

  const handleRemoveItem = (productId: number) => {
    const newCartProducts = cartProducts.filter(
      (cartProduct) => cartProduct.productId !== productId,
    );
    setCartProducts(newCartProducts);
  };

  return (
    <Card
      className={css({
        p: {
          base: 'md',
          sm: 'lg',
        },
        width: '100%',
      })}
    >
      <form
        className={css({
          display: 'flex',
          flexDir: 'column',
          gap: 'lg',
          width: '100%',
        })}
        action={dispatch}
      >
        {state.message && <Alert visual="error">{state.message}</Alert>}
        {state.errors?.requestProducts?._errors &&
          state.errors.requestProducts._errors.map((error) => (
            <Alert key={error} visual="error">
              {error}
            </Alert>
          ))}
        <input hidden id="id" name="id" value={stockRequest.id} readOnly />
        {cartProducts.map((cartProduct, index) => {
          const collection = createListCollection({
            items: Array(cartProduct.product.remainingStockAmount)
              .fill('')
              .map((_, i) => String(i + 1)),
          });
          return (
            <div key={cartProduct.product.id}>
              <div
                className={flex({
                  justifyContent: 'space-between',
                  alignItems: 'center',
                })}
              >
                <ProductSummary product={cartProduct.product} />
              </div>
              <input
                hidden
                id={`requestProducts[${index}].productId`}
                name={`requestProducts[${index}].productId`}
                value={cartProduct.product.id}
                readOnly
              />
              <input
                hidden
                id={`requestProducts[${index}].count`}
                name={`requestProducts[${index}].count`}
                value={cartProduct.count}
                readOnly
              />
              <div
                className={flex({
                  alignItems: 'end',
                  gap: 'sm',
                })}
              >
                <Select.Root
                  positioning={{ sameWidth: true }}
                  width="100%"
                  collection={collection}
                  onValueChange={(e) =>
                    handleCountChange(cartProduct.productId, Number(e.items[0]))
                  }
                  value={[String(cartProduct.count)]}
                >
                  <Select.Label>数量</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="欲しい在庫の数を選択してください。"></Select.ValueText>
                      <Icon
                        source={<AnglesUpDownIcon />}
                        width={10}
                        height={10}
                      />
                    </Select.Trigger>
                  </Select.Control>
                  <Select.Positioner>
                    <Select.Content>
                      {collection.items.map((item) => (
                        <Select.Item key={item} item={item}>
                          <Select.ItemText>{item}</Select.ItemText>
                          <Select.ItemIndicator>
                            <Icon
                              source={<CheckIcon />}
                              width={15}
                              height={15}
                            />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>
                <Button
                  visual="outlined"
                  onClick={() => handleRemoveItem(cartProduct.productId)}
                  className={css({
                    w: '80px',
                  })}
                  disabled={cartProducts.length === 1}
                >
                  削除
                </Button>
              </div>
            </div>
          );
        })}
        <StockRequestNote />
        <SubmitButton text="在庫リクエストを更新する" />
      </form>
    </Card>
  );
};
