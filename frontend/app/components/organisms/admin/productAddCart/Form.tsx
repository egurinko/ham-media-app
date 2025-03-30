'use client';

import { createListCollection } from '@ark-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { Select } from '@/app/components/atoms';
import { Alert } from '@/app/components/atoms/Alert';
import { Button } from '@/app/components/atoms/Button';
import { Icon } from '@/app/components/atoms/Icon';
import { Typography } from '@/app/components/atoms/Typography';
import { useCart } from '@/app/utils/hooks/useCart';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import { flex } from '@/styled/patterns';
import type { FC } from 'react';

type Props = {
  productId: number;
  remainingStockAmount: number;
};

export const Form: FC<Props> = ({ productId, remainingStockAmount }) => {
  const { addItem } = useCart();
  const collection = createListCollection({
    items: Array(remainingStockAmount)
      .fill('')
      .map((_, i) => String(i + 1)),
  });
  const [count, setCount] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const handleAddProductCartItem = () => {
    const selected = count[0];
    if (selected) {
      addItem(productId, Number(selected));
      setMessage(`カートに${Number(selected)}個追加しました`);

      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddProductCartItem();
        }}
        className={flex({
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'md',
          mt: 'lg',
        })}
      >
        <Select.Root
          positioning={{ sameWidth: true }}
          width="100%"
          collection={collection}
          onValueChange={(e) => setCount(e.items)}
          value={count}
          name="required-stock-amount"
        >
          <Select.Label>数量</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="欲しい在庫の数を選択してください。"></Select.ValueText>
              <Icon source={<AnglesUpDownIcon />} width={10} height={10} />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {collection.items.map((item) => (
                <Select.Item key={item} item={item}>
                  <Select.ItemText>{item}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Icon source={<CheckIcon />} width={15} height={15} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
        {message !== '' && <Alert visual="success">{message}</Alert>}
        <div
          className={flex({
            w: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'sm',
          })}
        >
          <Button fullWidth type="submit" disabled={remainingStockAmount === 0}>
            <AddIcon />
            在庫リクエストに入れる
          </Button>
          <Typography variant="caption">
            ※残数がない場合リクエストできません
          </Typography>
        </div>
      </form>
    </>
  );
};
