import { useCallback, useState, useEffect, RefObject } from 'react';

export const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) => {
  const [observing, setObserving] = useState(false);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [intersect, setIntersect] = useState(false);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], _observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        setIntersect(entry.isIntersecting);
      });
    },
    []
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

    if (observing) {
      const observer = new IntersectionObserver(callback, options);
      observer.observe(ref.current);
      setObserver(observer);
    } else {
      cleanup();
    }

    return cleanup;
  }, [ref.current, observing]);

  return { startObserving: setObserving, isIntersect: intersect };
};
