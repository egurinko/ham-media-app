import Link from 'next/link';
import { Typography } from '@/app/components/atoms/Typography';
import { ActionDialog } from '@/app/components/organisms/admin/ActionDialog';
import { css } from '@/styled/css';
import { ADMIN_MAKERS_EDIT_PATH } from '@/utils/routes';
import { deleteMakerAction } from './listItem.action';
import type { MakerListItemFieldsFragment } from './listItem.api.generated';
import type { FC } from 'react';

type Props = {
  maker: MakerListItemFieldsFragment;
};

export const ListItem: FC<Props> = ({ maker }) => (
  <li
    className={css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      borderTopWidth: 'thin',
      borderColor: 'outline.main',
      p: 'sm',
    })}
  >
    <Link
      href={ADMIN_MAKERS_EDIT_PATH(maker.id)}
      className={css({
        textDecoration: 'underline',
      })}
    >
      <Typography variant="body1" bold={true}>
        {maker.name}
      </Typography>
    </Link>
    <ActionDialog
      handleClick={async () => {
        'use server';
        return await deleteMakerAction(maker.id);
      }}
      title="メーカーの削除"
      description={`${maker.name}を削除してもよろしいですか？`}
      submitLabel="削除する"
    />
  </li>
);
