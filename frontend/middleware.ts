import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { NextResponse } from 'next/server';
import {
  INTERNAL_API_URL,
  FLASH_SESSION,
  FLASH_DISCARD_SESSION,
} from '@/app/utils/constant';
import { getSessionToken } from '@/app/utils/cookies';
import { getRefreshFlashMessages } from '@/app/utils/flashMessage';
import { getSession } from '@/services/api/internal_api/getSession';
import type {
  InternalGetSessionQuery,
  InternalGetSessionQueryVariables,
} from '@/services/api/internal_api/types';
import { ADMIN_LOGIN_PATH, ADMIN_INTERNAL_USERS_PATH } from '@/utils/routes';
import type { NextRequest } from 'next/server';

const internalHttpLink = new HttpLink({
  uri: INTERNAL_API_URL,
});

export async function middleware(request: NextRequest) {
  let response: NextResponse | undefined;

  if (request.nextUrl.pathname.startsWith(ADMIN_LOGIN_PATH)) {
    try {
      await checkSessionToken(getSessionToken(request.cookies));

      response = NextResponse.redirect(
        new URL(ADMIN_INTERNAL_USERS_PATH, request.url),
      );
    } catch {}
  } else if (request.nextUrl.pathname.startsWith('/admin')) {
    try {
      await checkSessionToken(getSessionToken(request.cookies));
    } catch {
      response = NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
    }
  }

  const { flashMessageDiscards, flashMessages } = getRefreshFlashMessages(
    request.cookies,
  );
  response = response || NextResponse.next();
  response.cookies.set(FLASH_SESSION, JSON.stringify(flashMessages));
  response.cookies.set(
    FLASH_DISCARD_SESSION,
    JSON.stringify(flashMessageDiscards),
  );

  return response;
}

const checkSessionToken = async (sessionToken?: string) => {
  const client = getClient(sessionToken);

  return await client.query<
    InternalGetSessionQuery,
    InternalGetSessionQueryVariables
  >({ query: getSession });
};

const getClient = (sessionToken?: string) => {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: sessionToken ? `Bearer ${sessionToken}` : '',
    },
  }));

  return new ApolloClient({
    link: authLink.concat(internalHttpLink),
    cache: new InMemoryCache(),
  });
};
