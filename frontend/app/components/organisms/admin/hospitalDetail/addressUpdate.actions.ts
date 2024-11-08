'use server';

import { upsertHospitalAddressGeoLocation } from './addressUpdate.api';
import type { UpsertHospitalAddressGeoLocationMutationVariables } from './addressUpdate.api.generated';

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function upsertHospitalAddressGeoLocationAction(
  variables: UpsertHospitalAddressGeoLocationMutationVariables,
) {
  try {
    await upsertHospitalAddressGeoLocation(variables);
  } catch {
    return {
      message: 'メールアドレスまたはパスワードが違います。',
    };
  }
}
