import { getInternalClient } from '@/app/utils/client';
import type {
  InternalUpdateHospitalBusinessFormMutation,
  InternalUpdateHospitalBusinessFormMutationVariables,
} from '@/services/api/internal_api/types';
import { updateHospitalBusinessForm as updateHospitalBusinessFormGql } from '@/services/api/internal_api/updateHospitalBusinessForm';
import type { FetchResult } from '@apollo/client';
import 'server-only';

export const updateHospitalBusinessForm = async (
  variables: InternalUpdateHospitalBusinessFormMutationVariables,
): Promise<FetchResult<InternalUpdateHospitalBusinessFormMutation>> =>
  await getInternalClient().mutate<
    InternalUpdateHospitalBusinessFormMutation,
    InternalUpdateHospitalBusinessFormMutationVariables
  >({
    mutation: updateHospitalBusinessFormGql,
    variables,
  });
