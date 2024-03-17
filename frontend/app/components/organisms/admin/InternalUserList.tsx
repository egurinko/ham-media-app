import Link from 'next/link';
import { Icon } from '@/app/components/atoms/Icon';
import { Typography } from '@/app/components/atoms/Typography';
import { DeleteDialog } from '@/app/components/organisms/admin/DeleteDialog';
import { deleteInternalUser } from '@/app/utils/actions/internalUser';
import { getInternalUsers } from '@/app/utils/api/internalApi/internalUser';
import StarIcon from '@/assets/star.svg';
import UserIcon from '@/assets/user_profile.svg';
import { css } from '@/styled/css';
import { ADMIN_INTERNAL_USERS_EDIT_PATH } from '@/utils/routes';
import type { FC } from 'react';

export const InternalUserList: FC<NoProps> = async () => {
  const { data } = await getInternalUsers({});

  return (
    <ul
      className={css({
        width: '100%',
        borderBottomWidth: 'thin',
        borderColor: 'outline.main',
      })}
    >
      {data?.internalUsers.map((internalUser) => (
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
              return await deleteInternalUser(internalUser.id);
            }}
          />
        </li>
      ))}
    </ul>
  );
};
