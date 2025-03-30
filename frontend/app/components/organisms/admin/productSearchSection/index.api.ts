import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetSearchMasterQuery,
  GetSearchMasterQueryVariables,
} from './index.api.generated';
import 'server-only';

const getSearchMasterGql = gql`
  query GetSearchMaster {
    makers {
      id
      name
    }
    productTagGroups {
      id
      name
      productTags {
        id
        name
      }
    }
    internalUsers {
      id
      name
    }
  }
`;

type SearchMaster = {
  makers: { value: string; label: string }[];
  productTags: { value: string; label: string }[];
  internalUsers: { value: string; label: string }[];
};

export const getSearchMaster = async (): Promise<SearchMaster> => {
  const { data } = await getInternalClient().query<
    GetSearchMasterQuery,
    GetSearchMasterQueryVariables
  >({
    query: getSearchMasterGql,
  });
  return {
    makers: data.makers.map((maker) => ({
      value: String(maker.id),
      label: maker.name,
    })),
    productTags: data.productTagGroups
      .map((productTagGroup) =>
        productTagGroup.productTags.map((productTag) => ({
          value: String(productTag.id),
          label: productTag.name,
        })),
      )
      .flat(),
    internalUsers: data.internalUsers.map((internalUser) => ({
      value: String(internalUser.id),
      label: internalUser.name,
    })),
  };
};
