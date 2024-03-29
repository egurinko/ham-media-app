import { getHospitalsMore } from '@/app/(consumer)/hospitals/result/actions';
import { HospitalOutlineCards } from '@/app/components/organisms/consumer/hospitals/HospitalOutlineCards';
import { HospitalsLoadMore } from '@/app/components/organisms/consumer/hospitals/HospitalsLoadMore';
import { getHospitalConnection } from '@/app/utils/api/publicApi/getHospitalConnection';
import { css } from '@/styled/css';
import type { FC } from 'react';

type Props = {
  searchText: string;
  latitude: number;
  longitude: number;
  nightServiceOption: boolean;
  recommended: boolean;
  reservable: boolean;
  insuranceEnabled: boolean;
  jsavaOption: boolean;
  nichijuOption: boolean;
};

export const Hospitals: FC<Props> = async ({
  searchText,
  reservable,
  nightServiceOption,
  insuranceEnabled,
  jsavaOption,
  nichijuOption,
  recommended,
  latitude,
  longitude,
}) => {
  const { data } = await getHospitalConnection({
    first: 10,
    searchText,
    reservable,
    nightServiceOption,
    insuranceEnabled,
    jsavaOption,
    nichijuOption,
    recommended,
    currentLocation:
      latitude && longitude
        ? {
            latitude,
            longitude,
          }
        : undefined,
  });

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        gap: 'md',
        width: '100%',
      })}
    >
      {data.publicHospitalConnection ? (
        <HospitalOutlineCards
          hospitalEdges={data.publicHospitalConnection.edges}
        />
      ) : null}
      <HospitalsLoadMore
        loadMoreAction={getHospitalsMore}
        initialEndCursor={data.publicHospitalConnection?.pageInfo.endCursor}
        initialHasNextPage={data.publicHospitalConnection?.pageInfo.hasNextPage}
      />
    </div>
  );
};
