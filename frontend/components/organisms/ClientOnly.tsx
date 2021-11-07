import { useEffect, useState } from 'react';

// ref: https://www.joshwcomeau.com/react/the-perils-of-rehydration/

const ClientOnly: React.FC<{}> = ({ children, ...delegated }) => {
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
