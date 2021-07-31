import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getCookie } from '@/utils/cookies';

const getApiUrl = (apiTarget: API_TARGET_TYPE): string => {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  if (apiTarget === API_TARGET.INTERNAL) {
    return `${base}/internal_api/graphql`;
  } else {
    return `${base}/public_api/graphql`;
  }
};

const getHttpLink = (apiTarget: API_TARGET_TYPE) => {
  return createHttpLink({
    uri: getApiUrl(apiTarget),
  });
};

const API_TARGET = {
  INTERNAL: 'internal',
  PUBLIC: 'public',
} as const;

type API_TARGET_TYPE = typeof API_TARGET[keyof typeof API_TARGET];

const authLink = setContext((_, { headers }) => {
  const token = getCookie();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const getLink = (apiTarget: API_TARGET_TYPE) =>
  authLink.concat(getHttpLink(apiTarget));

const getClient = (apiTarget: API_TARGET_TYPE) => {
  return new ApolloClient({
    link: getLink(apiTarget),
    cache: new InMemoryCache(),
  });
};

const internalApiClient = getClient(API_TARGET.INTERNAL);
const publicApiClient = getClient(API_TARGET.PUBLIC);

export { internalApiClient, publicApiClient };
