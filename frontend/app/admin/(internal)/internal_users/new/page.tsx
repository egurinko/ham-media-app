import { Breadcrumbs } from '@/app/components/molecules/Breadcrumbs';
import { InternalUserForm } from '@/app/components/organisms/admin/InternalUserForm';
import { createInternalUser } from '@/app/utils/actions/internalUser';
import { getRoles } from '@/app/utils/api/internalApi/role';
import { css } from '@/styled/css';
import { ADMIN_INTERNAL_USERS_PATH } from '@/utils/routes';

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
        handleSubmit={createInternalUser}
        initialInternalUser={{
          name: '',
          email: '',
          password: '',
          discordUserId: '',
          roleId: [],
        }}
      />
    </div>
  );
}
