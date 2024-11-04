import { getInternalClient } from '@/app/utils/client';
import type {
  InternalUpdateHospitalAddressMutation,
  InternalUpdateHospitalAddressMutationVariables,
} from '@/services/api/internal_api/types';
import { updateHospitalAddress as updateHospitalAddressGql } from '@/services/api/internal_api/updateHospitalAddress';
import type { FetchResult } from '@apollo/client';
import 'server-only';

export const updateHospitalAddress = async (
  variables: InternalUpdateHospitalAddressMutationVariables,
): Promise<FetchResult<InternalUpdateHospitalAddressMutation>> =>
  await getInternalClient().mutate<
    InternalUpdateHospitalAddressMutation,
    InternalUpdateHospitalAddressMutationVariables
  >({
    mutation: updateHospitalAddressGql,
    variables,
  });
