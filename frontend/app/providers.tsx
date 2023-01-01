'use client';

import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { GoogleTagManager } from '@/components/atoms/GoogleTagManager';
import { apiClient } from '@/utils/apollo';
import { GOOGLE_TAG_MANAGER_ID } from '@/utils/googleTagManager';
import { theme } from '@/utils/theme';
import type { FC, PropsWithChildren } from 'react';

const Providers: FC<PropsWithChildren<NoProps>> = ({ children }) => (
  <>
    <GoogleTagManager containerId={GOOGLE_TAG_MANAGER_ID} />
    <ApolloProvider client={apiClient}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          {children}
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  </>
);

export { Providers };
