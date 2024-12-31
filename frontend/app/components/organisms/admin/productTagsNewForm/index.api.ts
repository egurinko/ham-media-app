import { gql } from '@apollo/client';
import { getInternalClient } from '@/app/utils/client';
import type {
  CreateProductTagsMutation,
  CreateProductTagsMutationVariables,
} from './index.api.generated';
import type { FetchResult } from '@apollo/client';
import 'server-only';

const createProductTagsGql = gql`
  mutation CreateProductTags(
    $productTagGroupId: Int!
    $productTags: [CreateProductTagsProductTagInputType!]!
  ) {
    createProductTags(
      productTagGroupId: $productTagGroupId
      productTags: $productTags
    ) {
      count
    }
  }
`;

export const createProductTags = async (
  variables: CreateProductTagsMutationVariables,
): Promise<FetchResult<CreateProductTagsMutation>> =>
  await getInternalClient().mutate<
    CreateProductTagsMutation,
    CreateProductTagsMutationVariables
  >({
    mutation: createProductTagsGql,
    variables,
  });
