import { HAMEDIA_SESSION } from './constant';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import type { RequestCookies } from 'next/dist/server/web/spec-extension/cookies';

export const getSessionToken = (
  cookies: ReadonlyRequestCookies | RequestCookies,
): string | undefined => cookies.get(HAMEDIA_SESSION)?.value;
