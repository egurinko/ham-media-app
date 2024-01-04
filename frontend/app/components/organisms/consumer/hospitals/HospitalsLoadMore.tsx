'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/app/components/atoms/Button';
import { HospitalOutlineCards } from '@/app/components/organisms/consumer/hospitals/HospitalOutlineCards';
import { HospitalSkeletons } from '@/app/components/organisms/consumer/hospitals/HospitalSkeletons';
import type {
  PublicGetHospitalConnectionQuery,
  PublicGetHospitalConnectionQueryVariables,
} from '@/services/api/public_api/types';
import type { FC } from 'react';

type Props = {
  loadMoreAction: (
    variables: PublicGetHospitalConnectionQueryVariables,
  ) => Promise<PublicGetHospitalConnectionQuery>;
  initialEndCursor?: string | null;
  initialHasNextPage?: boolean;
};

export const HospitalsLoadMore: FC<Props> = ({
  loadMoreAction,
  initialEndCursor,
  initialHasNextPage,
}) => {
  const [hospitalEdges, setHospitalEdges] = useState<
    NonNullable<
      NonNullable<
        PublicGetHospitalConnectionQuery['publicHospitalConnection']
      >['edges']
    >
  >([]);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [endCursor, setEndCursor] = useState(initialEndCursor);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const loadMore = () => {
    if (hasNextPage && endCursor) {
      setLoading(true);
      loadMoreAction({
        first: 10,
        after: endCursor,
        searchText: searchParams?.get('searchText') || '',
        currentLocation:
          searchParams?.get('latitude') && searchParams?.get('longitude')
            ? {
                latitude: Number(searchParams.get('latitude')),
                longitude: Number(searchParams.get('longitude')),
              }
            : null,
        reservable: searchParams?.get('reservable') === 'true',
        nightServiceOption: searchParams?.get('nightServiceOption') === 'true',
        insuranceEnabled: searchParams?.get('insuranceEnabled') === 'true',
        jsavaOption: searchParams?.get('jsavaOption') === 'true',
        nichijuOption: searchParams?.get('nichijuOption') === 'true',
        recommended: searchParams?.get('recommended') === 'true',
      })
        .then((result) => {
          if (result.publicHospitalConnection?.edges) {
            setHospitalEdges([
              ...hospitalEdges,
              ...result.publicHospitalConnection.edges,
            ]);
            setHasNextPage(
              result.publicHospitalConnection.pageInfo.hasNextPage,
            );
            setEndCursor(result.publicHospitalConnection.pageInfo.endCursor);
          }
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      <HospitalOutlineCards hospitalEdges={hospitalEdges} />
      {loading && <HospitalSkeletons />}
      {hasNextPage && !loading && (
        <Button visual="outlined" onClick={loadMore}>
          もっと見る
        </Button>
      )}
    </>
  );
};
