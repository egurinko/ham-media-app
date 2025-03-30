import { CardSkeleton } from '@/app/components/organisms/admin/skeletons/CardSkeleton';
import type { FC } from 'react';

export const CardsSkeleton: FC<NoProps> = () => (
  <>
    {[...Array(3)].map((_, i) => (
      <CardSkeleton key={i}></CardSkeleton>
    ))}
  </>
);
