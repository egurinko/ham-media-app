import { getHospital } from '@/app/components/organisms/admin/hospitalForm/hospitalEditForm.api';
import { HospitalForm } from './Index';
import { updateHospitalAction } from './hospitalEditForm.action';
import type { FC } from 'react';

type Props = {
  id: number;
};

export const HospitalEditForm: FC<Props> = async ({ id }) => {
  const { data } = await getHospital({ id });
  const { hospital } = data;

  return (
    <HospitalForm
      handleSubmit={updateHospitalAction}
      initialHospital={{
        id: hospital.id,
        name: hospital.name,
        url: hospital.url,
        deleted: hospital.deleted ? 'true' : 'false',
        internalMemo: hospital.internal_memo,
      }}
    />
  );
};
