import { cookies } from 'next/headers';
import { HAMEDIA_SESSION } from './constant';

export const getSessionToken = (): string | undefined =>
  cookies().get(HAMEDIA_SESSION)?.value;
