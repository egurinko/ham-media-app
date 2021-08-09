import type { AppProps } from 'next/app';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import 'json-bigint-patch';
import { internalApiClient } from '@/utils/apollo';
import { theme } from '@/utils/theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ApolloProvider client={internalApiClient}>
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  </ApolloProvider>
);

export default App;
