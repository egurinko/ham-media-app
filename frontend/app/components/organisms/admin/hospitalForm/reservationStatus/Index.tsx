import { Form } from './Form';
import { getHospitalReservationStatus } from './index.api';
import type { FC } from 'react';

type Props = {
  id: number;
};

export const HospitalReservationStatusForm: FC<Props> = async ({ id }) => {
  const hospital = await getHospitalReservationStatus({ id });

  return (
    hospital.hospitalReservationStatus && (
      <Form
        initialHospitalReservationStatus={{
          hospitalId: hospital.id,
          required: hospital.hospitalReservationStatus.required,
          reservable: hospital.hospitalReservationStatus.reservable,
          remark: hospital.hospitalReservationStatus.remark,
        }}
      />
    )
  );
};
