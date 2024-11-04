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
    console.log({ variables });
    await upsertHospitalAddressGeoLocation(variables);
  } catch (e) {
    console.log({ e });
    return {
      message: 'メールアドレスまたはパスワードが違います。',
    };
  }
}
