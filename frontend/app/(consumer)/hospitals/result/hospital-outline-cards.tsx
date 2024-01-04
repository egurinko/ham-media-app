import { HospitalOutlineCard } from '@/app/(consumer)/hospitals/result/hospital-outline-card';
import { getNodesFromConnectionEdges } from '@/app/utils/connection';
import type { PublicGetHospitalConnectionQuery } from '@/services/api/public_api/types';
import type { FC } from 'react';

type Props = {
  hospitalEdges: NonNullable<
    PublicGetHospitalConnectionQuery['publicHospitalConnection']
  >['edges'];
};

export const HospitalOutlineCards: FC<Props> = ({ hospitalEdges }) => (
  <>
    {getNodesFromConnectionEdges(hospitalEdges).map((node) => (
      <HospitalOutlineCard key={node.id} hospital={node} />
    ))}
  </>
);
