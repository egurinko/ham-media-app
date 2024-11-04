import { cookies } from 'next/headers';
import { Alert } from '@/app/components/atoms/Alert';
import { getFlashMessages } from '@/app/utils/flashMessage';
import { css } from '@/styled/css';
import type { FC } from 'react';

export const FlashMessage: FC<NoProps> = async () => {
  const cookiesStore = await cookies();
  const flashMessages = getFlashMessages(cookiesStore);

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
