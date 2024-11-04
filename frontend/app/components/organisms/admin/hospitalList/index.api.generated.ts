import type * as Types from '@/app/utils/api/types';

export type GetHospitalConnectionQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  deleted: Types.Scalars['Boolean']['input'];
  prefectureId?: Types.InputMaybe<Types.Scalars['BigInt']['input']>;
  internalReputationStar?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type GetHospitalConnectionQuery = {
  __typename?: 'Query';
  hospitalConnection?: {
    __typename?: 'HospitalConnection';
    edges?: Array<{
      __typename?: 'HospitalEdge';
      node?: {
        __typename?: 'Hospital';
        id: number;
        name: string;
        deleted: boolean;
        hospitalAddress?: {
          __typename?: 'HospitalAddress';
          address: string;
          phone_number: string;
          prefecture: { __typename?: 'Prefecture'; name: string };
        } | null;
      } | null;
    } | null> | null;
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      endCursor?: string | null;
    };
  } | null;
};
