'use client';

import { BaseLayout } from './BaseLayout';
import type { FC, PropsWithChildren } from 'react';

const PublicLayout: FC<PropsWithChildren<NoProps>> = ({ children }) => (
  <BaseLayout>
    <main>{children}</main>
  </BaseLayout>
);

export { PublicLayout };
