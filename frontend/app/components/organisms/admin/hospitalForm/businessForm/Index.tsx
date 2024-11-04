import { Form } from './Form';
import { getHospitalBusinessForm } from './index.api';
import type { FC } from 'react';

type Props = {
  id: number;
};

export const HospitalBusinessFormForm: FC<Props> = async ({ id }) => {
  const hospital = await getHospitalBusinessForm({ id });

  return (
    hospital.hospitalBusinessForm && (
      <Form
        initialHospitalBusinessForm={{
          hospitalId: hospital.id,
          businessHour: hospital.hospitalBusinessForm.business_hour,
          closedDay: hospital.hospitalBusinessForm.closed_day,
          insuranceEnabled: hospital.hospitalBusinessForm.insurance_enabled,
          remark: hospital.hospitalBusinessForm.remark,
        }}
      />
    )
  );
};
