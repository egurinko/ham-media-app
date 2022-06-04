import { memo } from 'react';
import { FlashMessage } from './FlashMessage';
import type { ApolloError } from '@apollo/client';
import type { FC } from 'react';

type Props = {
  error?: ApolloError;
};

const ErrorMessage: FC<Props> = ({ error }) =>
  !error ? null : error.graphQLErrors.length !== 0 ? (
    <FlashMessage status="error" message={error.graphQLErrors[0].message} />
  ) : (
    <FlashMessage status="error" message={error.message} />
  );

const Memoed = memo(ErrorMessage);

export { Memoed as ErrorMessage };
