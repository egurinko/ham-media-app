import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import 'json-bigint-patch';
import { GoogleTagManager } from '@/components/atoms/GoogleTagManager';
import { apiClient } from '@/utils/apollo';
import { GOOGLE_TAG_MANAGER_ID } from '@/utils/googleTagManager';
import { theme } from '@/utils/theme';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <GoogleTagManager containerId={GOOGLE_TAG_MANAGER_ID} />
      <ApolloProvider client={apiClient}>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeProvider
            options={{
              useSystemColorMode: true,
            }}
          >
            {getLayout(<Component {...pageProps} />)}
          </ColorModeProvider>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
