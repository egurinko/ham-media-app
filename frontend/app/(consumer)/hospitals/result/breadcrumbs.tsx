import { Breadcrumb } from '@/app/components/atoms/Breadcrumb';
import { BreadcrumbIcon } from '@/app/components/atoms/BreadcrumbIcon';
import { css } from '@/styled/css';
import { HOSPITALS_PATH } from '@/utils/routes';
import type { FC } from 'react';

export const Breadcrumbs: FC<NoProps> = async () => (
  <div
    className={css({
      display: 'flex',
      alignItems: 'center',
    })}
  >
    <Breadcrumb href={HOSPITALS_PATH} text="検索トップに戻る" />
    <BreadcrumbIcon />
  </div>
);
