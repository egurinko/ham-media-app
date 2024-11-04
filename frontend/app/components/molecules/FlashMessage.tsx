import { cookies, type UnsafeUnwrappedCookies } from 'next/headers';
import { Alert } from '@/app/components/atoms/Alert';
import { getFlashMessages } from '@/app/utils/flashMessage';
import { css } from '@/styled/css';
import type { FC } from 'react';

export const FlashMessage: FC<NoProps> = () => {
  const flashMessages = getFlashMessages(
    cookies() as unknown as UnsafeUnwrappedCookies,
  );

  return flashMessages?.alert || flashMessages?.notice ? (
    <div
      className={css({
        width: '100%',
      })}
    >
      {flashMessages?.alert && (
        <Alert
          visual="error"
          className={css({
            width: '100%',
          })}
        >
          {flashMessages.alert}
        </Alert>
      )}
      {flashMessages?.notice && (
        <Alert visual="success">{flashMessages.notice}</Alert>
      )}
    </div>
  ) : null;
};
