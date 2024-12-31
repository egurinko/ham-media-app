import type * as Types from '@/app/utils/api/types';

export type CreateProductTagsMutationVariables = Types.Exact<{
  productTagGroupId: Types.Scalars['Int']['input'];
  productTags:
    | Array<Types.CreateProductTagsProductTagInputType>
    | Types.CreateProductTagsProductTagInputType;
}>;

export type CreateProductTagsMutation = {
  __typename?: 'Mutation';
  createProductTags: { __typename?: 'BatchPayload'; count: number };
};
