import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/app/components/atoms/Button';
import { FlashMessage } from '@/app/components/molecules/FlashMessage';
import { HospitalListSkeleton } from '@/app/components/organisms/admin/HospitalListSkeleton';
import {
  HospitalBreadcrumbs,
  HOSPITAL_ROUTES,
} from '@/app/components/organisms/admin/hospitalBreadcrumbs/Index';
import { HospitalList } from '@/app/components/organisms/admin/hospitalList/Index';
import { HopistalSearchSection } from '@/app/components/organisms/admin/hospitalSearchSection/Index';
import { css } from '@/styled/css';
import { ADMIN_HOSPIALS_NEW_PATH } from '@/utils/routes';

type Props = {
  searchParams: SearchParams;
};

type SearchParams = Promise<{
  name?: string;
  prefectureId?: string;
  star?: string;
  published?: string;
}>;

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const name = searchParams.name || '';
  const prefectureId = searchParams.prefectureId
    ? Number(searchParams.prefectureId)
    : undefined;
  const star = searchParams.star ? Number(searchParams.star) : undefined;
  const published = searchParams.published === 'false' ? false : true;

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
          justifyContent: 'space-between',
          width: '100%',
        })}
      >
        <HospitalBreadcrumbs route={HOSPITAL_ROUTES.INDEX} />
        <Link href={ADMIN_HOSPIALS_NEW_PATH}>
          <Button visual="tonal">新規登録する</Button>
        </Link>
      </div>
      <HopistalSearchSection />
      <Suspense fallback={<HospitalListSkeleton />}>
        <HospitalList
          name={name}
          prefectureId={prefectureId}
          star={star}
          published={published}
        />
      </Suspense>
    </div>
  );
}
