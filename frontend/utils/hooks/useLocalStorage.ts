import { useCallback } from 'react';

export const useLocalStorage = <T = any>(key: string) => {
  const setLocalStorage = useCallback(
    (value: any) => {
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  const getLocalStorage = useCallback((): T | null => {
    const stored = window.localStorage.getItem(key);

    return stored ? JSON.parse(stored) : null;
  }, [key]);

  return { setLocalStorage, getLocalStorage };
};
