import { Suspense } from 'react';
import { FlashMessage } from '@/app/components/molecules/FlashMessage';
import {
  HospitalBreadcrumbs,
  HOSPITAL_ROUTES,
} from '@/app/components/organisms/admin/hospitalBreadcrumbs/Index';
import { HospitalBusinessFormForm } from '@/app/components/organisms/admin/hospitalForm/businessForm/Index';
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
      <FlashMessage />
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 'xs',
        })}
      >
        <HospitalBreadcrumbs
          route={HOSPITAL_ROUTES.BUSINESS_FORM_EDIT}
          id={Number(params.id)}
        />
      </div>
      <Suspense fallback={<FormSkeleton />}>
        <HospitalBusinessFormForm id={Number(params.id)} />
      </Suspense>
    </div>
  );
}
