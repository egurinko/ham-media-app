'use client';

import { useState, useRef, useEffect } from 'react';
import { HospitalListSkeleton } from '@/app/components/organisms/admin/HospitalListSkeleton';
import type { GetHospitalsMoreActionResponse } from '@/app/components/organisms/admin/hospitalList/index.action';
import type { GetHospitalConnectionQueryVariables } from '@/app/components/organisms/admin/hospitalList/index.api.generated';
import { useIntersectionObserver } from '@/app/utils/hooks/useIntersectionObserver';
import { css } from '@/styled/css';
import { ListItem } from './ListItem';
import type { HospitalListItemFieldsFragment } from './listItem.api.generated';
import type { FC } from 'react';

type Props = {
  initialHasNextPage?: boolean;
  initialEndCursor?: string | null;
  name: string;
  prefectureId?: number;
  internalReputationStar?: number;
  deleted: boolean;
  getHospitalsMoreAction: (
    variables: GetHospitalConnectionQueryVariables,
  ) => GetHospitalsMoreActionResponse;
};

export const LoadMore: FC<Props> = ({
  initialHasNextPage,
  initialEndCursor,
  name,
  prefectureId,
  internalReputationStar,
  deleted,
  getHospitalsMoreAction,
}) => {
  const [isPending, setIsPending] = useState(false);
  const [hospitals, setHospitals] = useState<HospitalListItemFieldsFragment[]>(
    [],
  );
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage || false);
  const [endCursor, setEndCursor] = useState(initialEndCursor);
  const infiniteScrollTarget = useRef<HTMLDivElement>(null);
  const { isIntersect } = useIntersectionObserver(infiniteScrollTarget);

  useEffect(() => {
    setHasNextPage(initialHasNextPage || false);
  }, [initialHasNextPage]);

  useEffect(() => {
    if (isIntersect && hasNextPage && !isPending) {
      getHospitalsMoreAction({
        first: 10,
        after: endCursor,
        name,
        prefectureId,
        internalReputationStar,
        deleted,
      })
        .then(({ pageInfo, hospitals: newHospitals }) => {
          setHospitals([...new Set([...hospitals, ...newHospitals])]);
          setHasNextPage(pageInfo?.hasNextPage ?? false);
          setEndCursor(pageInfo?.endCursor ?? null);
        })
        .finally(() => {
          setIsPending(false);
        });
    }
  }, [
    isIntersect,
    hasNextPage,
    endCursor,
    isPending,
    deleted,
    getHospitalsMoreAction,
    hospitals,
    internalReputationStar,
    name,
    prefectureId,
  ]);

  return (
    <>
      {hospitals.map((h) => (
        <ListItem hospital={h} key={h.id} />
      ))}
      <div
        className={css({
          h: 10,
        })}
      >
        {hasNextPage && <div ref={infiniteScrollTarget} />}
      </div>
      {isPending && <HospitalListSkeleton />}
    </>
  );
};
