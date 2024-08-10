import Link from 'next/link';
import { Icon } from '@/app/components/atoms/Icon';
import { Typography } from '@/app/components/atoms/Typography';
import StarIcon from '@/assets/star.svg';
import UserIcon from '@/assets/user_profile.svg';
import { css } from '@/styled/css';
import { ADMIN_INTERNAL_USERS_EDIT_PATH } from '@/utils/routes';
import { DeleteDialog } from './DeleteDialog';
import { deleteInternalUserAction } from './listItem.action';
import type { InternalUserListItemFieldsFragment } from './listItem.api.generated';
import type { FC } from 'react';

type Props = {
  internalUser: InternalUserListItemFieldsFragment;
};

export const ListItem: FC<Props> = ({ internalUser }) => (
  <li
    key={internalUser.id}
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
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 'sm',
      })}
    >
      <Icon
        source={
          <UserIcon
            className={css({
              color: 'background.on-main',
            })}
          />
        }
        width="30px"
        height="30px"
      />
      <div>
        <div
          className={css({
            display: 'flex',
            gap: 'sm',
            alignItems: 'center',
          })}
        >
          <Link
            href={ADMIN_INTERNAL_USERS_EDIT_PATH(internalUser.id)}
            className={css({
              textDecoration: 'underline',
            })}
          >
            <Typography variant="body1" bold={true}>
              {internalUser.name}
            </Typography>
          </Link>
          {internalUser.role.name === 'admin' && (
            <Icon source={<StarIcon />} width="20px" height="20px" />
          )}
        </div>
        <Typography variant="body2">{internalUser.email}</Typography>
      </div>
    </div>
    <DeleteDialog
      handleDelete={async () => {
        'use server';
        return await deleteInternalUserAction(internalUser.id);
      }}
    />
  </li>
);
