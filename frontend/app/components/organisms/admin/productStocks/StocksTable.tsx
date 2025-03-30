'use client';

import { Table } from '@/app/components/atoms';
import { StocksTableRow } from './StocksTableRow';
import type {
  GetStocksQuery,
  GetInternalUsersForAllocationQuery,
} from './index.api.generated';
import type { FC } from 'react';

type Props = {
  stocks: GetStocksQuery['stocks'];
  adminInternalUsers: GetInternalUsersForAllocationQuery['internalUsers'];
  internalUsers: GetInternalUsersForAllocationQuery['internalUsers'];
};

export const StocksTable: FC<Props> = ({
  stocks,
  adminInternalUsers,
  internalUsers,
}) => (
  <Table.Root w="100%">
    <Table.Head>
      <Table.Row>
        <Table.Header>サマリ</Table.Header>
        <Table.Header>責任者</Table.Header>
        <Table.Header>割当状況</Table.Header>
        <Table.Header></Table.Header>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {stocks.map((stock) => (
        <StocksTableRow
          key={stock.id}
          stock={stock}
          adminInternalUsers={adminInternalUsers}
          internalUsers={internalUsers}
        ></StocksTableRow>
      ))}
      {stocks.length === 0 && (
        <Table.Row>
          <Table.Cell
            colSpan={3}
            style={{ textAlign: 'center', padding: '16px' }}
          >
            在庫情報がありません
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table.Root>
);
