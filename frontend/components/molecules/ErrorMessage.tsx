import { ApolloError } from '@apollo/client';
import { FlashMessage } from './FlashMessage';

type Props = {
  error: ApolloError;
};

const ErrorMessage: React.FC<Props> = ({ error }) => {
  return error.graphQLErrors.length !== 0 ? (
    <FlashMessage status="error" message={error.graphQLErrors[0].message} />
  ) : (
    <FlashMessage status="error" message={error.message} />
  );
};

export { ErrorMessage };
