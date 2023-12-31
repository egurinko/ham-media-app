import { Icon } from '@/app/components/atoms/Icon';
import ChevronRightIcon from '@/assets/chevron_right.svg';
import { css } from '@/styled/css';
import type { FC } from 'react';

export const BreadcrumbIcon: FC<NoProps> = () => (
  <div
    className={css({
      color: 'text.secondary',
    })}
  >
    <Icon source={<ChevronRightIcon />} width={20} height={20} />
  </div>
);
