import { Form } from './Form';
import { getHospitalNightUrgentActionOption } from './index.api';
import type { FC } from 'react';

type Props = {
  id: number;
};

export const HospitalNightUrgentActionOptionForm: FC<Props> = async ({
  id,
}) => {
  const hospital = await getHospitalNightUrgentActionOption({ id });

  return (
    hospital.hospitalNightUrgentActionOption && (
      <Form
        initialHospitalNightUrgentActionOption={{
          hospitalId: hospital.id,
          status: hospital.hospitalNightUrgentActionOption.status,
        }}
      />
    )
  );
};
