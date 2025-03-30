import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetProductNewMasterQuery,
  GetProductNewMasterQueryVariables,
  CreateProductMutation,
  CreateProductMutationVariables,
} from './page.api.generated';
import type { FetchResult } from '@apollo/client';

const getProductNewMasterGql = gql`
  query GetProductNewMaster {
    makers {
      id
      name
    }
    productTagGroups {
      productTags {
        id
        name
      }
    }
  }
`;

type ProductNewMaster = {
  makers: { value: string; label: string }[];
  productTags: { value: string; label: string }[];
};

export const getProductNewMaster = async (
  variables: GetProductNewMasterQueryVariables,
): Promise<ProductNewMaster> => {
  const { data } = await getInternalClient().query<
    GetProductNewMasterQuery,
    GetProductNewMasterQueryVariables
  >({
    query: getProductNewMasterGql,
    variables,
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
  };
};

const createProductGql = gql`
  mutation CreateProduct(
    $name: String!
    $remark: String!
    $makerId: Int!
    $file: Upload!
    $productTagIds: [Int!]!
  ) {
    createProduct(
      name: $name
      remark: $remark
      makerId: $makerId
      file: $file
      productTagIds: $productTagIds
    ) {
      id
    }
  }
`;

export const createProduct = async (
  variables: CreateProductMutationVariables,
): Promise<FetchResult<CreateProductMutation>> =>
  await getInternalClient().mutate<
    CreateProductMutation,
    CreateProductMutationVariables
  >({
    mutation: createProductGql,
    variables,
  });
