import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import { createUploadLink } from 'apollo-upload-client';
import { getCookie } from '@/utils/cookies';

const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const getHttpLink = () =>
  new RetryLink({ attempts: { max: 0 } }).split(
    (operation) => operation.operationName.includes('Internal'),
    //@ts-ignore
    createUploadLink({
      uri: `${base}/internal_api/graphql`,
    }),
    createHttpLink({
      uri: `${base}/public_api/graphql`,
    })
  );

const authLink = setContext((_, { headers }) => {
  const token = getCookie();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const getLink = () => authLink.concat(getHttpLink());

export { getLink };
