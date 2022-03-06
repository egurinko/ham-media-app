import { FlashMessage } from './FlashMessage';
import type { ApolloError } from '@apollo/client';

type Props = {
  error?: ApolloError;
};

const ErrorMessage: React.FC<Props> = ({ error }) => !error ? null : error.graphQLErrors.length !== 0 ? (
    <FlashMessage status="error" message={error.graphQLErrors[0].message} />
  ) : (
    <FlashMessage status="error" message={error.message} />
  );

export { ErrorMessage };
