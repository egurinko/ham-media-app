import { ChavronRightIcon } from '@/app/components/assets/ChavronRightIcon';
import { css } from '@/styled/css';
import type { FC } from 'react';

export const BreadcrumbIcon: FC<NoProps> = () => (
  <div
    className={css({
      color: 'text.secondary',
    })}
  >
    <ChavronRightIcon width={20} height={20} />
  </div>
);
