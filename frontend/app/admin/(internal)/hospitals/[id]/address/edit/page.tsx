import { Suspense } from 'react';
import { ErrorMessages } from '@/app/components/molecules/FlashMessage';
import {
  HospitalBreadcrumbs,
  HOSPITAL_ROUTES,
} from '@/app/components/organisms/admin/hospitalBreadcrumbs/Index';
import { HospitalAddressForm } from '@/app/components/organisms/admin/hospitalForm/address/Index';
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
      <ErrorMessages />
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: 'xs',
        })}
      >
        <HospitalBreadcrumbs
          route={HOSPITAL_ROUTES.ADDRESS_EDIT}
          id={Number(params.id)}
        />
      </div>
      <Suspense fallback={<FormSkeleton />}>
        <HospitalAddressForm id={Number(params.id)} />
      </Suspense>
    </div>
  );
}
