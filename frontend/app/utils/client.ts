import { HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  registerApolloClient,
  InMemoryCache,
  ApolloClient,
} from '@apollo/experimental-nextjs-app-support';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { cookies } from 'next/headers';
import { getSessionToken } from '@/app/utils/cookies';

const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const publicLink = new HttpLink({
  uri: `${base}/public_api/graphql`,
});

const internalHttpLink = createUploadLink({
  uri: `${base}/internal_api/graphql`,
});
const internalAuthLink = setContext(async (_, { headers }) => {
  const cookieStore = await cookies();
  const sessionToken = getSessionToken(cookieStore);

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
    new ApolloClient({
      cache: new InMemoryCache(),
      link: publicLink,
    }),
);

export const { getClient: getInternalClient } = registerApolloClient(
  () =>
    new ApolloClient({
      cache: new InMemoryCache(),
      link: internalLink,
    }),
);
