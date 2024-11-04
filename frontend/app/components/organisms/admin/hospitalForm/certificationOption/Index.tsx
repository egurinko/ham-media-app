import { Form } from './Form';
import { getHospitalCertificationOption } from './index.api';
import type { FC } from 'react';

type Props = {
  id: number;
};

export const HospitalCertificationOptionForm: FC<Props> = async ({ id }) => {
  const hospital = await getHospitalCertificationOption({ id });

  return (
    hospital.hospitalCertificationOption && (
      <Form
        initialHospitalCertificationOption={{
          hospitalId: hospital.id,
          nichijuRegistered:
            hospital.hospitalCertificationOption.nichiju_registered,
          jsavaRegistered:
            hospital.hospitalCertificationOption.jsava_registered,
        }}
      />
    )
  );
};
