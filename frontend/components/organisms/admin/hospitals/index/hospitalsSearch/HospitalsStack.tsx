import { VStack, Divider } from '@chakra-ui/react';
import { Fragment } from 'react';
import { HospitalSummary } from './hospitalsStack/HospitalSummary';
import type { Hospitals } from '../types';

type Props = {
  hospitals: Hospitals;
};

const HospitalsStack: React.VFC<Props> = ({ hospitals }) => (
    <VStack spacing="0" mt="4" alignItems="flex-start">
      <Divider />
      {hospitals?.map((hospital) => hospital ? (
          <Fragment key={Number(hospital.id)}>
            <HospitalSummary hospital={hospital} />
            <Divider />
          </Fragment>
        ) : null)}
    </VStack>
  );

export { HospitalsStack };
