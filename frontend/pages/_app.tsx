import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import 'json-bigint-patch';
import { apiClient } from '@/utils/apollo';
import { theme } from '@/utils/theme';
import type { AppProps } from 'next/app';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ApolloProvider client={apiClient}>
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
