import { Breadcrumbs } from '@/app/components/molecules/Breadcrumbs';
import { InternalUserForm } from '@/app/components/organisms/admin/InternalUserForm';
import { css } from '@/styled/css';
import { ADMIN_INTERNAL_USERS_PATH } from '@/utils/routes';
import { updateInternalUserAction } from './page.action';
import { getRoles, getInternalUser } from './page.api';

type Props = {
  params: Params;
};

type Params = {
  id: string;
};

export const dynamicParams = true;
export async function generateStaticParams(): Promise<Params[]> {
  return [];
}

export default async function Page({ params }: Props) {
  const { data: roleData } = await getRoles({});
  const { data: internalUserData } = await getInternalUser({
    id: Number(params.id),
  });

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
            { title: 'ユーザ編集' },
          ]}
        />
      </div>

      <InternalUserForm
        roles={roleData.roles}
        handleSubmit={updateInternalUserAction}
        initialInternalUser={{
          id: String(internalUserData.internalUser.id),
          name: internalUserData.internalUser.name,
          email: internalUserData.internalUser.email,
          password: '',
          discordUserId: internalUserData.internalUser.discord_user_id,
          roleId: [String(internalUserData.internalUser.role.id)],
        }}
        submitLabel="更新する"
      />
    </div>
  );
}
