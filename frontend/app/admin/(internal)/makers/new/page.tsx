import { Breadcrumbs } from '@/app/components/molecules/Breadcrumbs';
import { MakerForm } from '@/app/components/organisms/admin/makerForm/Index';
import { css } from '@/styled/css';
import { ADMIN_MAKERS_PATH } from '@/utils/routes';
import { createMakerAction } from './page.action';

export default async function Page() {
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
            { title: 'メーカー一覧', href: ADMIN_MAKERS_PATH },
            { title: 'メーカー登録' },
          ]}
        />
      </div>

      <MakerForm
        handleSubmit={createMakerAction}
        initialMaker={{
          name: '',
        }}
        submitLabel="登録する"
      />
    </div>
  );
}
