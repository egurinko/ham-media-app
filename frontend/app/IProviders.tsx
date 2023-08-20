'use client';

import { ApolloProvider } from '@apollo/client';
import { GoogleTagManager } from '@/components/atoms/GoogleTagManager';
import { apiClient } from '@/utils/apollo';
import { GOOGLE_TAG_MANAGER_ID } from '@/utils/googleTagManager';
import type { FC, PropsWithChildren } from 'react';

const Providers: FC<PropsWithChildren<NoProps>> = ({ children }) => (
  <>
    <GoogleTagManager containerId={GOOGLE_TAG_MANAGER_ID} />
    <ApolloProvider client={apiClient}>{children}</ApolloProvider>
  </>
);

export { Providers };
