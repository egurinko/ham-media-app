import Cookies from 'js-cookie';

const HAMEDIA_SESSION = 'hamediaSession';

export const setCookie = (value: string, name = HAMEDIA_SESSION): void => {
  Cookies.set(name, value, { expires: 30 });
};

export const getCookie = (name = HAMEDIA_SESSION): string | undefined => {
  return Cookies.get(name);
};

export const removeCookie = (name = HAMEDIA_SESSION): void => {
  Cookies.remove(name);
};
