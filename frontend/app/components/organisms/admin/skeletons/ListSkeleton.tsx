import { SkeletonCircle } from '@/app/components/atoms/SkeletonCircle';
import { SkeletonText } from '@/app/components/atoms/SkeletonText';
import { css } from '@/styled/css';
import type { FC } from 'react';

export const ListSkeleton: FC<NoProps> = () => (
  <>
    {[...Array(5)].map((_, i) => (
      <div key={i} className={css({ width: '100%' })}>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 'md',
            height: '40px',
          })}
        >
          <SkeletonCircle size="30px" />
          <SkeletonText noOfLines={2} skeletonHeight="20px" />
        </div>
        <div className={css({ width: '50%', mb: 'md' })}>
          <SkeletonCircle size="15px" />
        </div>
      </div>
    ))}
  </>
);
