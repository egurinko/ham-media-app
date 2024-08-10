import { css } from '@/styled/css';
import { ListItem } from './ListItem';
import { getInternalUsers } from './index.api';
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
        <ListItem key={internalUser.id} internalUser={internalUser} />
      ))}
    </ul>
  );
};
