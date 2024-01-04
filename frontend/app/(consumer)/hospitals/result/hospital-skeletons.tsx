import { Card } from '@/app/components/atoms/Card';
import { SkeletonText } from '@/app/components/atoms/SkeletonText';
import { css } from '@/styled/css';
import type { FC } from 'react';

export const HospitalSkeletons: FC<NoProps> = () => (
  <>
    {[...Array(3)].map((_, i) => (
      <Card key={i} className={css({ width: '100%', p: 'lg' })}>
        <div className={css({ width: '100%', mb: 'sm' })}>
          <SkeletonText noOfLines={1} skeletonHeight="20px" />
        </div>
        <div className={css({ width: '50%', mb: 'md' })}>
          <SkeletonText noOfLines={1} skeletonHeight="10px" />
        </div>
        <div className={css({ width: '30%', mb: 'md' })}>
          <SkeletonText noOfLines={4} skeletonHeight="16px" />
        </div>
        <div className={css({ width: '100%' })}>
          <SkeletonText noOfLines={1} skeletonHeight="20px" />
        </div>
      </Card>
    ))}
  </>
);
