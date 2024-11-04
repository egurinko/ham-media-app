import { HospitalForm } from './Index';
import { createHospitalAction } from './hospitalNewForm.action';
import type { FC } from 'react';

export const HospitalNewForm: FC<NoProps> = () => (
  <HospitalForm
    handleSubmit={createHospitalAction}
    initialHospital={{
      name: '',
      url: '',
      deleted: 'true',
      internalMemo: '',
    }}
  />
);
