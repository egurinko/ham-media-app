import { HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { getSessionToken } from '@/app/utils/cookies';

const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const publicLink = new HttpLink({
  uri: `${base}/public_api/graphql`,
});

const internalHttpLink = new HttpLink({
  uri: `${base}/internal_api/graphql`,
});
const internalAuthLink = setContext((_, { headers }) => {
  const sessionToken = getSessionToken();

  return {
    headers: {
      ...headers,
      authorization: sessionToken ? `Bearer ${sessionToken}` : '',
    },
  };
});
const internalLink = internalAuthLink.concat(internalHttpLink);

export const { getClient: getPublicClient } = registerApolloClient(
  () =>
    new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link: publicLink,
    }),
);

export const { getClient: getInternalClient } = registerApolloClient(
  () =>
    new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link: internalLink,
    }),
);
