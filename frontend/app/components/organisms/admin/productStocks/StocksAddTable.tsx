'use client';

import { createListCollection } from '@ark-ui/react';
import dayjs from 'dayjs';
import { useActionState, useState, type FC } from 'react';
import { Table, Select } from '@/app/components/atoms';
import { Alert } from '@/app/components/atoms/Alert';
import { Button } from '@/app/components/atoms/Button';
import { Icon } from '@/app/components/atoms/Icon';
import { IconButton } from '@/app/components/atoms/IconButton';
import { Input } from '@/app/components/atoms/Input';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import PlusIcon from '@/assets/plus.svg';
import XmarkIcon from '@/assets/xmark.svg';
import { css } from '@/styled/css';
import { flex } from '@/styled/patterns';
import { createStocksAction } from './stockAddTable.action';
import type { GetInternalUsersForAllocationQuery } from './index.api.generated';

type Props = {
  adminInternalUsers: GetInternalUsersForAllocationQuery['internalUsers'];
  productId: number;
};

type AddingStock = {
  expired_at: string;
  amount: string;
  internal_user_id?: number;
};
const addingStockInitialState: AddingStock = {
  expired_at: '',
  amount: '1',
  internal_user_id: undefined,
};

export const StocksAddTable: FC<Props> = ({
  productId,
  adminInternalUsers,
}) => {
  const [state, dispatch, isPending] = useActionState(
    async () =>
      await createStocksAction(
        productId,
        addingStocks.map((stock) => ({
          amount: Number(stock.amount),
          expiredAt:
            stock.expired_at === ''
              ? dayjs('2100-12-00').toISOString()
              : dayjs(stock.expired_at).toISOString(),
          internalUserId: Number(stock.internal_user_id || 1),
        })),
      ),
    { message: '' },
  );
  const [addingStocks, setAddingStocks] = useState([addingStockInitialState]);
  const adminCollection = createListCollection({
    items: adminInternalUsers.map((i) => ({
      label: i.name,
      value: String(i.id),
    })),
  });

  const handleExpiredAtChange = (
    changingIndex: number,
    changingDate: string,
  ) => {
    const newAddingStocks = addingStocks.map((addingStock, index) => {
      if (changingIndex === index) {
        return { ...addingStock, expired_at: changingDate };
      }
      return addingStock;
    });
    setAddingStocks(newAddingStocks);
  };

  const handleInternalUserChange = (
    changingIndex: number,
    internalUserId: number,
  ) => {
    const newAddingStocks = addingStocks.map((addingStock, index) => {
      if (changingIndex === index) {
        return { ...addingStock, internal_user_id: internalUserId };
      }
      return addingStock;
    });
    setAddingStocks(newAddingStocks);
  };

  const handleAmountChange = (
    changingIndex: number,
    changingAmount: string,
  ) => {
    const newAddingStocks = addingStocks.map((addingStock, index) => {
      if (changingIndex === index) {
        return { ...addingStock, amount: changingAmount };
      }
      return addingStock;
    });
    setAddingStocks(newAddingStocks);
  };

  const handleAddingStocksDelete = (deletingIndex: number) => {
    const newAddingStocks = addingStocks.filter(
      (_, index) => index !== deletingIndex,
    );
    setAddingStocks(newAddingStocks);
  };

  const handleAddingStocksAdd = () => {
    setAddingStocks([...addingStocks, addingStockInitialState]);
  };

  return (
    <form
      action={dispatch}
      className={flex({ flexDirection: 'column', alignItems: 'center' })}
    >
      <Table.Root w="100%">
        <Table.Head>
          <Table.Row>
            <Table.Header>期限 (任意)</Table.Header>
            <Table.Header>責任者 (必須)</Table.Header>
            <Table.Header>数量 (必須)</Table.Header>
            <Table.Header></Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {addingStocks.map((addingStock, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Input
                  placeholder="2100/10/10"
                  type="date"
                  min={dayjs().add(1, 'day').format('YYYY-MM-DD')}
                  value={addingStock.expired_at}
                  onChange={(e) => handleExpiredAtChange(index, e.target.value)}
                />
              </Table.Cell>
              <Table.Cell>
                <Select.Root
                  required
                  positioning={{ sameWidth: true }}
                  collection={adminCollection}
                  onValueChange={(details) =>
                    handleInternalUserChange(index, Number(details.value[0]))
                  }
                  value={
                    addingStock.internal_user_id
                      ? [String(addingStock.internal_user_id)]
                      : undefined
                  }
                  name="adminInternalUserId"
                  className={css({ w: { base: '45%', sm: '200px' } })}
                >
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder=""></Select.ValueText>
                      <Icon
                        source={<AnglesUpDownIcon />}
                        width={10}
                        height={10}
                      />
                    </Select.Trigger>
                  </Select.Control>
                  <Select.Positioner>
                    <Select.Content>
                      {adminCollection.items.map((adminInternalUser) => (
                        <Select.Item
                          key={adminInternalUser.value}
                          item={adminInternalUser}
                        >
                          <Select.ItemText>
                            {adminInternalUser.label}
                          </Select.ItemText>
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
              </Table.Cell>
              <Table.Cell>
                <Input
                  placeholder="10"
                  type="number"
                  min="1"
                  value={addingStock.amount}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                  required
                  className={css({ w: { base: '40px', sm: '100px' } })}
                />
              </Table.Cell>
              <Table.Cell>
                <IconButton
                  size="sm"
                  visual="text"
                  onClick={() => handleAddingStocksDelete(index)}
                  disabled={addingStocks.length <= 1}
                >
                  <Icon source={<XmarkIcon />} width="20px" height="20px" />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
          {addingStocks.length === 0 && (
            <Table.Row>
              <Table.Cell
                colSpan={3}
                style={{ textAlign: 'center', padding: '16px' }}
              >
                追加情報がありません
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
      <IconButton
        size="sm"
        visual="tonal"
        onClick={() => handleAddingStocksAdd()}
        className={css({
          mb: 'md',
          mt: 'xs',
        })}
      >
        <Icon source={<PlusIcon />} width="20px" height="20px" />
      </IconButton>
      {state.message !== '' && (
        <Alert visual="success" className={css({ my: 'xs' })}>
          {state.message}
        </Alert>
      )}
      <Button type="submit" disabled={isPending}>
        在庫追加
      </Button>
    </form>
  );
};
