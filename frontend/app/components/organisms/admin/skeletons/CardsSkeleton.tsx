import { Card } from '@/app/components/atoms/Card';
import { SkeletonText } from '@/app/components/atoms/SkeletonText';
import { css } from '@/styled/css';
import type { FC } from 'react';

export const CardsSkeleton: FC<NoProps> = () => (
  <>
    {[...Array(3)].map((_, i) => (
      <Card
        key={i}
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
          gap: 'xl',
          width: '100%',
          p: 'lg',
        })}
      >
        <SkeletonText noOfLines={2} skeletonHeight="20px" />
        <SkeletonText noOfLines={2} skeletonHeight="20px" />
        <SkeletonText noOfLines={2} skeletonHeight="20px" />
      </Card>
    ))}
  </>
);
