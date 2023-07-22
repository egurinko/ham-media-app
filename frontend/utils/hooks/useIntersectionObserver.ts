import { useCallback, useState, useEffect } from 'react';
import type { RefObject } from 'react';

export const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  options?: IntersectionObserverInit,
) => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [intersect, setIntersect] = useState(false);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], _observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        setIntersect(entry.isIntersecting);
      });
    },
    [],
  );

  const cleanup = useCallback(() => {
    if (ref.current !== null && observer !== null) {
      observer.unobserve(ref.current);
      setObserver(null);
      setIntersect(false);
    }
  }, [ref.current, observer]);

  useEffect(() => {
    if (ref.current === null) return;

    const iobserver = new IntersectionObserver(callback, options);
    iobserver.observe(ref.current);
    setObserver(iobserver);

    return cleanup;
  }, [ref, callback, options]);

  return { isIntersect: intersect };
};
