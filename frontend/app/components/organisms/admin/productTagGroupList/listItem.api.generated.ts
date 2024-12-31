/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Types from '@/app/utils/api/types';

export type ProductTagGroupListItemFieldsFragment = {
  __typename?: 'ProductTagGroup';
  id: number;
  name: string;
  productTags: Array<{ __typename?: 'ProductTag'; id: number; name: string }>;
};
