import { Breadcrumb } from '@/app/components/atoms/Breadcrumb';
import { BreadcrumbIcon } from '@/app/components/atoms/BreadcrumbIcon';
import { getHospital } from '@/app/utils/api/publicApi/getHospital';
import { css } from '@/styled/css';
import { HOSPITALS_RESULT_PATH } from '@/utils/routes';
import type { FC } from 'react';

type Props = {
  hospitalId: string;
};

export const Breadcrumbs: FC<Props> = async ({ hospitalId }) => {
  const hospital = await getHospital(hospitalId);

  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
      })}
    >
      <Breadcrumb href={HOSPITALS_RESULT_PATH} text="検索結果に戻る" />
      <BreadcrumbIcon />
      <Breadcrumb text={hospital.name} />
    </div>
  );
};
