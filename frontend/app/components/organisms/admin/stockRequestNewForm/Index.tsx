'use client';

import { createListCollection } from '@ark-ui/react';
import { useRouter } from 'next/navigation';
import { useState, useActionState, useEffect } from 'react';
import { Select } from '@/app/components/atoms';
import { Alert } from '@/app/components/atoms/Alert';
import { Button } from '@/app/components/atoms/Button';
import { Card } from '@/app/components/atoms/Card';
import { Icon } from '@/app/components/atoms/Icon';
import { SubmitButton } from '@/app/components/atoms/SubmitButton';
import type { ProductListItemFieldsFragment } from '@/app/components/organisms/admin/productListItem/index.api.generated';
import { ProductSummary } from '@/app/components/organisms/admin/productSummary/Index';
import {
  getProductsByIdsAction,
  createStockRequestAction,
} from '@/app/components/organisms/admin/stockRequestNewForm/index.action';
import { StockRequestNote } from '@/app/components/organisms/admin/stockRequestNote/Index';
import type { State } from '@/app/utils/formSchema/stockRequest';
import { useCart } from '@/app/utils/hooks/useCart';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import { css } from '@/styled/css';
import { flex } from '@/styled/patterns';
import { ADMIN_STOCK_REQUESTS_PATH } from '@/utils/routes';
import type { FC } from 'react';

type CartProducts = {
  productId: number;
  count: number;
  product: ProductListItemFieldsFragment;
}[];

export const StockRequestNewForm: FC<NoProps> = ({}) => {
  const router = useRouter();
  const { cart, replaceItems } = useCart();
  const [cartProducts, setCartProducts] = useState<CartProducts>([]);

  const initialState: State = { message: '', errors: { _errors: [] } };
  const [state, dispatch] = useActionState(
    async (prev: State, formData: FormData) => {
      const result = await createStockRequestAction(prev, formData);
      if (result.message === '在庫リクエストをしました。') {
        setSuccess(true);
        replaceItems({ items: {} });
        router.push(ADMIN_STOCK_REQUESTS_PATH);
      }
      return result;
    },
    initialState,
  );
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (Object.keys(cart.items).length !== 0 && cartProducts.length === 0) {
      const ids = Object.values(cart.items).map((item) =>
        Number(item.productId),
      );
      getProductsByIdsAction({ ids }).then((products) => {
        const newCartProducts = products.reduce((acc, product) => {
          const item = Object.values(cart.items).find(
            (item) => item.productId === product.id,
          );
          if (item) {
            return [
              ...acc,
              { productId: product.id, count: item.count, product },
            ];
          } else {
            return acc;
          }
        }, [] as CartProducts);
        setCartProducts(newCartProducts);
      });
    }
  }, [cart, cartProducts]);

  const handleCountChange = (productId: number, count: number) => {
    const newCartProducts = cartProducts.map((cartProduct) => {
      if (cartProduct.productId === productId) {
        return { ...cartProduct, count };
      } else {
        return cartProduct;
      }
    });
    setCartProducts(newCartProducts);
    replaceItems({
      items: newCartProducts.map((item) => ({
        productId: item.productId,
        count: item.count,
      })),
    });
  };

  const handleRemoveItem = (productId: number) => {
    const newCartProducts = cartProducts.filter(
      (cartProduct) => cartProduct.productId !== productId,
    );
    setCartProducts(newCartProducts);
    replaceItems({
      items: newCartProducts.map((item) => ({
        productId: item.productId,
        count: item.count,
      })),
    });
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
        {success && <Alert visual="success">在庫リクエストをしました。</Alert>}
        {state.message && <Alert visual="error">{state.message}</Alert>}
        {state.errors?.requestProducts?._errors &&
          state.errors.requestProducts._errors.map((error) => (
            <Alert key={error} visual="error">
              {error}
            </Alert>
          ))}
        {cartProducts.map((cartProduct, index) => {
          const collection = createListCollection({
            items: Array(cartProduct.product.remainingStockAmount)
              .fill('')
              .map((_, i) => String(i + 1)),
          });
          return (
            <div key={cartProduct.productId}>
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
                value={cartProduct.productId}
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
                  type="button"
                  visual="outlined"
                  onClick={() => handleRemoveItem(cartProduct.productId)}
                  className={css({
                    w: '80px',
                  })}
                >
                  削除
                </Button>
              </div>
            </div>
          );
        })}
        <StockRequestNote />
        <SubmitButton text="在庫リクエストをする" />
      </form>
    </Card>
  );
};
