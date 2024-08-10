import { Breadcrumbs } from '@/app/components/molecules/Breadcrumbs';
import { InternalUserForm } from '@/app/components/organisms/admin/InternalUserForm';
import { css } from '@/styled/css';
import { ADMIN_INTERNAL_USERS_PATH } from '@/utils/routes';
import { createInternalUserAction } from './page.action';
import { getRoles } from './page.api';

export default async function Page() {
  const { data } = await getRoles({});

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        alignItems: 'flex-start',
        gap: 'lg',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 'xs',
        })}
      >
        <Breadcrumbs
          breadcrumbs={[
            { title: 'ユーザ一覧', href: ADMIN_INTERNAL_USERS_PATH },
            { title: 'ユーザ登録' },
          ]}
        />
      </div>

      <InternalUserForm
        roles={data.roles}
        handleSubmit={createInternalUserAction}
        initialInternalUser={{
          name: '',
          email: '',
          password: '',
          discordUserId: '',
          roleId: [],
        }}
        submitLabel="登録する"
      />
    </div>
  );
}
