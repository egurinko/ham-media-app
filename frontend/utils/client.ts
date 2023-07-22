import { HttpLink } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr';

const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const publicLink = new HttpLink({
  uri: `${base}/public_api/graphql`,
});

const internalLink = new HttpLink({
  uri: `${base}/internal_api/graphql`,
});

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
