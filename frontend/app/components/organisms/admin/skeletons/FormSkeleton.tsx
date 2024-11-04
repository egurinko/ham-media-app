import { SkeletonText } from '@/app/components/atoms/SkeletonText';
import { css } from '@/styled/css';
import type { FC } from 'react';

export const FormSkeleton: FC<NoProps> = () => (
  <>
    <>
      {[...Array(5)].map((_, i) => (
        <div key={i} className={css({ width: '100%' })}>
          <div className={css({ width: '100px', mb: 'sm' })}>
            <SkeletonText noOfLines={1} skeletonHeight="20px" />
          </div>
          <div>
            <SkeletonText noOfLines={1} skeletonHeight="40px" />
          </div>
        </div>
      ))}
    </>
  </>
);
