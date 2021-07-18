import { ApolloClient, InMemoryCache } from '@apollo/client';

const getApiUrl = (): string =>
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const API_TARGET = {
  INTERNAL: 'internal',
  PUBLIC: 'public',
} as const;

type API_TARGET_TYPE = typeof API_TARGET[keyof typeof API_TARGET];

const getClient = (apiTarget: API_TARGET_TYPE) => {
  let uri = '';
  if (apiTarget === API_TARGET.INTERNAL) {
    uri = `${getApiUrl()}/internal_api/graphql`;
  } else {
    uri = `${getApiUrl()}/public_api/graphql`;
  }
  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
};

const internalApiClient = getClient(API_TARGET.INTERNAL);
const publicApiClient = getClient(API_TARGET.PUBLIC);

export { internalApiClient, publicApiClient };
