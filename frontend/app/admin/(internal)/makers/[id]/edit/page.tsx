import { Breadcrumbs } from '@/app/components/molecules/Breadcrumbs';
import { MakerForm } from '@/app/components/organisms/admin/makerForm/Index';
import { css } from '@/styled/css';
import { ADMIN_MAKERS_PATH } from '@/utils/routes';
import { updateMakerAction } from './page.action';
import { getMaker } from './page.api';

type Props = {
  params: Params;
};

type Params = Promise<{
  id: string;
}>;

export const dynamicParams = true;
export async function generateStaticParams(): Promise<Params[]> {
  return [];
}

export default async function Page(props: Props) {
  const params = await props.params;
  const maker = await getMaker({
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
            { title: 'メーカー一覧', href: ADMIN_MAKERS_PATH },
            { title: 'メーカー編集' },
          ]}
        />
      </div>

      <MakerForm
        handleSubmit={updateMakerAction}
        initialMaker={{
          id: String(maker.id),
          name: maker.name,
        }}
        submitLabel="更新する"
      />
    </div>
  );
}
