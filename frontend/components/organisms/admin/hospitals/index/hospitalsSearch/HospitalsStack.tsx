import { VStack, Divider } from '@chakra-ui/react';
import { Fragment, memo } from 'react';
import { HospitalSummary } from './hospitalsStack/HospitalSummary';
import type { Hospitals } from '../types';
import type { FC } from 'react';

type Props = {
  hospitals: Hospitals;
};

const HospitalsStack: FC<Props> = ({ hospitals }) => (
  <VStack spacing="0" mt="4" alignItems="flex-start">
    <Divider />
    {hospitals?.map((hospital) =>
      hospital ? (
        <Fragment key={Number(hospital.id)}>
          <HospitalSummary hospital={hospital} />
          <Divider />
        </Fragment>
      ) : null,
    )}
  </VStack>
);

const Memoed = memo(HospitalsStack);

export { Memoed as HospitalsStack };
