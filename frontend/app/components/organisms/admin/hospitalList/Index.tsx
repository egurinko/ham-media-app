import { getNodesFromConnectionEdges } from '@/app/utils/connection';
import { css } from '@/styled/css';
import { ListItem } from './ListItem';
import { LoadMore } from './LoadMore';
import { getHospitalsMoreAction } from './index.action';
import { getHospitalConnection } from './index.api';
import type { FC } from 'react';

type Props = {
  name: string;
  prefectureId?: number;
  star?: number;
  published: boolean;
};

export const HospitalList: FC<Props> = async ({
  name,
  prefectureId,
  star,
  published,
}) => {
  const { data } = await getHospitalConnection({
    first: 5,
    name,
    prefectureId,
    internalReputationStar: star,
    deleted: !published,
  });

  return (
    <ul
      className={css({
        width: '100%',
        borderBottomWidth: 'thin',
        borderColor: 'outline.main',
      })}
    >
      {getNodesFromConnectionEdges(data.hospitalConnection?.edges).map(
        (hospital) => (
          <ListItem key={hospital.id} hospital={hospital} />
        ),
      )}
      {data.hospitalConnection?.pageInfo.hasNextPage && (
        <LoadMore
          initialHasNextPage={data.hospitalConnection?.pageInfo.hasNextPage}
          initialEndCursor={data.hospitalConnection?.pageInfo.endCursor}
          name={name}
          prefectureId={prefectureId}
          internalReputationStar={star}
          deleted={!published}
          getHospitalsMoreAction={getHospitalsMoreAction}
        />
      )}
    </ul>
  );
};
