import { gql } from '@apollo/client';
import { getInternalClient, getPublicClient } from '@/app/utils/client';
import type {
  GetEditableHospitalAddressQuery,
  GetEditableHospitalAddressQueryVariables,
  GetPrefecturesQuery,
  GetPrefecturesQueryVariables,
} from './index.api.generated';

const getHospitalAddressGql = gql`
  query GetEditableHospitalAddress($id: BigInt!) {
    hospital(id: $id) {
      id
      hospitalAddress {
        address
        phone_number
        prefecture {
          id
          name
        }
      }
    }
  }
`;

const getPrefecturesGql = gql`
  query GetPrefectures {
    prefectures {
      id
      name
    }
  }
`;

export const getEditableHospitalAddress = async (
  variables: GetEditableHospitalAddressQueryVariables,
): Promise<{
  hospital: GetEditableHospitalAddressQuery['hospital'];
  prefectures: { value: string; label: string }[];
}> => {
  const [
    {
      data: { prefectures },
    },
    {
      data: { hospital },
    },
  ] = await Promise.all([
    getPublicClient().query<GetPrefecturesQuery, GetPrefecturesQueryVariables>({
      query: getPrefecturesGql,
    }),
    getInternalClient().query<
      GetEditableHospitalAddressQuery,
      GetEditableHospitalAddressQueryVariables
    >({
      query: getHospitalAddressGql,
      variables,
    }),
  ]);

  return {
    hospital,
    prefectures: prefectures.map((prefecture) => ({
      value: String(prefecture.id),
      label: prefecture.name,
    })),
  };
};
