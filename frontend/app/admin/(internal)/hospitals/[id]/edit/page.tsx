import { Suspense } from 'react';
import {
  HospitalBreadcrumbs,
  HOSPITAL_ROUTES,
} from '@/app/components/organisms/admin/hospitalBreadcrumbs/Index';
import { HospitalEditForm } from '@/app/components/organisms/admin/hospitalForm/HospitalEditForm';
import { FormSkeleton } from '@/app/components/organisms/admin/skeletons/FormSkeleton';
import { css } from '@/styled/css';

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
        <HospitalBreadcrumbs
          route={HOSPITAL_ROUTES.EDIT}
          id={Number(params.id)}
        />
      </div>
      <Suspense fallback={<FormSkeleton />}>
        <HospitalEditForm id={Number(params.id)} />
      </Suspense>
    </div>
  );
}
