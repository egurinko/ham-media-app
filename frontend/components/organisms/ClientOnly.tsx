import { useEffect, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';

// ref: https://www.joshwcomeau.com/react/the-perils-of-rehydration/

const ClientOnly: FC<PropsWithChildren<NoProps>> = ({
  children,
  ...delegated
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
};

export { ClientOnly };
