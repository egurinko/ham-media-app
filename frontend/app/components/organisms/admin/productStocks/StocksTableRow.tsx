'use client';

import { createListCollection } from '@ark-ui/react';
import dayjs from 'dayjs';
import { useState, useTransition } from 'react';
import { Table, Select } from '@/app/components/atoms';
import { Alert } from '@/app/components/atoms/Alert';
import { Button } from '@/app/components/atoms/Button';
import { Icon } from '@/app/components/atoms/Icon';
import { IconButton } from '@/app/components/atoms/IconButton';
import { Typography } from '@/app/components/atoms/Typography';
import AnglesUpDownIcon from '@/assets/angles-up-down.svg';
import CheckIcon from '@/assets/check.svg';
import TranshIcon from '@/assets/trash.svg';
import { css } from '@/styled/css';
import {
  allocateStockAction,
  returnStockAction,
  updateStockInternalUserAction,
  deleteStockAction,
} from './stockTableRow.action';
import type {
  GetStocksQuery,
  GetInternalUsersForAllocationQuery,
} from './index.api.generated';
import type { FC } from 'react';

type Props = {
  stock: GetStocksQuery['stocks'][number];
  adminInternalUsers: GetInternalUsersForAllocationQuery['internalUsers'];
  internalUsers: GetInternalUsersForAllocationQuery['internalUsers'];
};

export const StocksTableRow: FC<Props> = ({
  stock,
  adminInternalUsers,
  internalUsers,
}) => {
  const [adminMessage, setAdminMessage] = useState('');
  const [isAdminPending, startAdminTransition] = useTransition();
  const adminCollection = createListCollection({
    items: adminInternalUsers.map((i) => ({
      label: i.name,
      value: String(i.id),
    })),
  });
  const [adminInternalUserIds, setAdminInternalUserIds] = useState([
    String(stock.internalUser.id),
  ]);
  const [allocateMessage, setAllocateMessage] = useState('');
  const [isAllocatePending, startAllocateTransition] = useTransition();
  const internalUsersCollection = createListCollection({
    items: internalUsers.map((i) => ({
      label: i.name,
      value: String(i.id),
    })),
  });
  const [internalUsersInternalUserIds, setInternalUsersInternalUserIds] =
    useState(
      !!stock.stockAllocation
        ? [String(stock.stockAllocation.internalUser.id)]
        : [],
    );
  const allocatedInternalUserItem = internalUsersCollection.items.find(
    (item) => item.value === internalUsersInternalUserIds[0],
  );
  const [isReturnPending, startReturnTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

  return (
    <Table.Row>
      <Table.Cell>
        <div
          className={css({
            display: 'flex',
            flexDir: 'column',
          })}
        >
          <Typography variant="caption">id: {stock.id}</Typography>
          <Typography variant="caption">
            期限:{' '}
            {dayjs(stock.expired_at).isBefore('2100-00-00')
              ? dayjs(stock.expired_at).format('YYYY年M月D日')
              : 'なし'}
          </Typography>
          <Typography variant="caption">
            作成日: {dayjs(stock.created_at).format('YYYY年M月D日')}
          </Typography>
        </div>
      </Table.Cell>
      <Table.Cell>
        {adminMessage !== '' && (
          <Alert visual="success" className={css({ my: 'xs' })}>
            {adminMessage}
          </Alert>
        )}
        <Select.Root
          positioning={{ sameWidth: true }}
          collection={adminCollection}
          onValueChange={(details) => {
            startAdminTransition(async () => {
              const { message } = await updateStockInternalUserAction(
                stock.id,
                Number(details.value[0]),
              );
              setAdminMessage(message);
              setAdminInternalUserIds(details.value);
            });
          }}
          value={adminInternalUserIds}
          name="adminInternalUserId"
          className={css({ w: { base: '100%', sm: '200px' } })}
          disabled={isAdminPending}
        >
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder=""></Select.ValueText>
              <Icon source={<AnglesUpDownIcon />} width={10} height={10} />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {adminCollection.items.map((adminInternalUser) => (
                <Select.Item
                  key={adminInternalUser.value}
                  item={adminInternalUser}
                >
                  <Select.ItemText>{adminInternalUser.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Icon source={<CheckIcon />} width={15} height={15} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </Table.Cell>
      <Table.Cell>
        {allocateMessage !== '' && (
          <Alert visual="success" className={css({ my: 'xs' })}>
            {allocateMessage}
          </Alert>
        )}
        {!allocatedInternalUserItem ? (
          <Select.Root
            positioning={{ sameWidth: true }}
            collection={internalUsersCollection}
            onValueChange={(details) => {
              startAllocateTransition(async () => {
                const { message } = await allocateStockAction(
                  stock.id,
                  Number(details.value[0]),
                );
                setAllocateMessage(message);
                setInternalUsersInternalUserIds(details.value);
              });
            }}
            value={internalUsersInternalUserIds}
            name="allocatedInternalUserId"
            className={css({ w: { base: '100%', sm: '200px' } })}
            disabled={isAllocatePending}
          >
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="スタッフを選択"></Select.ValueText>
                <Icon source={<AnglesUpDownIcon />} width={10} height={10} />
              </Select.Trigger>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                {internalUsersCollection.items.map((internalUser) => (
                  <Select.Item key={internalUser.value} item={internalUser}>
                    <Select.ItemText>{internalUser.label}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Icon source={<CheckIcon />} width={15} height={15} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        ) : (
          <>
            <Typography variant="body2" display="inline">
              {allocatedInternalUserItem.label}
            </Typography>
            <Button
              size="xs"
              visual="tonal"
              onClick={() => {
                startReturnTransition(async () => {
                  const { message } = await returnStockAction(stock.id);
                  setAllocateMessage(message);
                  setInternalUsersInternalUserIds([]);
                });
              }}
              disabled={isReturnPending}
            >
              返却
            </Button>
          </>
        )}
      </Table.Cell>
      <Table.Cell>
        <IconButton
          size="sm"
          visual="text"
          onClick={() => {
            startDeleteTransition(async () => {
              await deleteStockAction(stock.id);
            });
          }}
          disabled={isDeletePending}
          className={css({
            p: 0,
          })}
        >
          <Icon source={<TranshIcon />} width="20px" height="20px" />
        </IconButton>
      </Table.Cell>
    </Table.Row>
  );
};
