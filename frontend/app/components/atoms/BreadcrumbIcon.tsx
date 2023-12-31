import { ChevronRightIcon } from '@/app/components/assets/ChevronRightIcon';
import { css } from '@/styled/css';
import type { FC } from 'react';

export const BreadcrumbIcon: FC<NoProps> = () => (
  <div
    className={css({
      color: 'text.secondary',
    })}
  >
    <ChevronRightIcon width={20} height={20} />
  </div>
);
