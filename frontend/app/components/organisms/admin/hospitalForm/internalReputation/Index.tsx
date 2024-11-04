import { Form } from './Form';
import { getHospitalInternalReputation } from './index.api';
import type { FC } from 'react';

type Props = {
  id: number;
};

export const HospitalInternalReputationForm: FC<Props> = async ({ id }) => {
  const hospital = await getHospitalInternalReputation({ id });

  return (
    hospital.hospitalInternalReputation && (
      <Form
        initialHospitalInternalReputation={{
          hospitalId: hospital.id,
          star: hospital.hospitalInternalReputation.star,
          remark: hospital.hospitalInternalReputation.remark,
        }}
      />
    )
  );
};
