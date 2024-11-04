import { Form } from './Form';
import { getHospitalNightServiceOption } from './index.api';
import type { FC } from 'react';

type Props = {
  id: number;
};

export const HospitalNightServiceOptionForm: FC<Props> = async ({ id }) => {
  const hospital = await getHospitalNightServiceOption({ id });

  return (
    hospital.hospitalNightServiceOption && (
      <Form
        initialHospitalNightServiceOption={{
          hospitalId: hospital.id,
          status: hospital.hospitalNightServiceOption.status,
          remark: hospital.hospitalNightServiceOption.remark,
        }}
      />
    )
  );
};
