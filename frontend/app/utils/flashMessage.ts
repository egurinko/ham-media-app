import { cookies } from 'next/headers';
import { FLASH_SESSION, FLASH_DISCARD_SESSION } from '@/app/utils/constant';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import type { RequestCookies } from 'next/dist/server/web/spec-extension/cookies';

const FLASH_MESSAGE_TYPE = {
  NOTICE: 'notice',
  ALERT: 'alert',
} as const;

export type FlashMessageTypes =
  (typeof FLASH_MESSAGE_TYPE)[keyof typeof FLASH_MESSAGE_TYPE];

export const setFlashMessage = ({
  message,
  type,
}: {
  message: string;
  type: FlashMessageTypes;
}) => {
  cookies().set(FLASH_SESSION, JSON.stringify({ [type]: message }));
};

export type FlashMessages = {
  notice?: string;
  alert?: string;
};

export const getFlashMessages = (
  cookies: ReadonlyRequestCookies | RequestCookies,
): FlashMessages => {
  const flashMessages = cookies.get(FLASH_SESSION);
  if (flashMessages) {
    return JSON.parse(flashMessages?.value) as FlashMessages;
  }
  return {};
};

type FlashMessageDiscards = FlashMessageTypes[];

const getFlashMessageDiscards = (
  cookies: ReadonlyRequestCookies | RequestCookies,
): FlashMessageDiscards => {
  const flashMessageDiscards = cookies.get(FLASH_DISCARD_SESSION);
  if (flashMessageDiscards) {
    return JSON.parse(flashMessageDiscards?.value) as FlashMessageDiscards;
  }

  return [];
};

export const getRefreshFlashMessages = (
  cookies: ReadonlyRequestCookies | RequestCookies,
): {
  flashMessages: FlashMessages;
  flashMessageDiscards: FlashMessageDiscards;
} => {
  const flashMessageDiscards = getFlashMessageDiscards(cookies);
  const flashMessages = getFlashMessages(cookies);
  flashMessageDiscards.forEach((flashMessageDiscard) => {
    delete flashMessages[flashMessageDiscard];
  });
  const newFlashMessageDiscards = Object.keys(
    flashMessages,
  ) as FlashMessageDiscards;

  return {
    flashMessages,
    flashMessageDiscards: newFlashMessageDiscards,
  };
};
