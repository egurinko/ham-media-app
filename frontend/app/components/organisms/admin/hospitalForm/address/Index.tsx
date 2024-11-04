import { Form } from './Form';
import { getEditableHospitalAddress } from './index.api';
import type { FC } from 'react';

type Props = {
  id: number;
};

export const HospitalAddressForm: FC<Props> = async ({ id }) => {
  const { prefectures, hospital } = await getEditableHospitalAddress({ id });

  return (
    hospital.hospitalAddress && (
      <Form
        prefectures={prefectures}
        initialHospitalAddress={{
          hospitalId: hospital.id,
          prefectureId: hospital.hospitalAddress.prefecture.id,
          address: hospital.hospitalAddress.address,
          phoneNumber: hospital.hospitalAddress.phone_number,
        }}
      />
    )
  );
};
