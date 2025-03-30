import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  GetProductEditMasterQuery,
  GetProductEditMasterQueryVariables,
  UpdateProductMutation,
  UpdateProductMutationVariables,
} from './page.api.generated';

const getProductEditMasterGql = gql`
  query GetProductEditMaster($productId: Int!) {
    product(id: $productId) {
      id
      name
      remark
      url
      maker {
        id
        name
      }
      productTaggings {
        id
        productTag {
          id
          name
        }
      }
      totalStockAmount
      allocatedStockAmount
      remainingStockAmount
    }
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
  product: GetProductEditMasterQuery['product'];
  makers: { value: string; label: string }[];
  productTags: { value: string; label: string }[];
};

export const getProductEditMaster = async (
  variables: GetProductEditMasterQueryVariables,
): Promise<ProductNewMaster> => {
  const { data } = await getInternalClient().query<
    GetProductEditMasterQuery,
    GetProductEditMasterQueryVariables
  >({
    query: getProductEditMasterGql,
    variables,
  });
  return {
    product: data.product,
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

const updateProductGql = gql`
  mutation UpdateProduct(
    $id: Int!
    $makerId: Int!
    $name: String!
    $remark: String!
    $file: Upload
    $productTagIds: [Int!]!
  ) {
    updateProduct(
      id: $id
      makerId: $makerId
      name: $name
      remark: $remark
      file: $file
      productTagIds: $productTagIds
    ) {
      id
    }
  }
`;

export const updateProduct = async (
  variables: UpdateProductMutationVariables,
): Promise<UpdateProductMutation['updateProduct']> => {
  const { data } = await getInternalClient().mutate<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >({
    mutation: updateProductGql,
    variables,
  });
  return data!.updateProduct;
};
