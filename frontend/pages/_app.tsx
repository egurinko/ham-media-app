import type { AppProps } from 'next/app';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import 'json-bigint-patch';
import { store } from '@/store/index';
import { apiClient } from '@/utils/apollo';
import { theme } from '@/utils/theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ApolloProvider client={apiClient}>
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ColorModeProvider>
    </ChakraProvider>
  </ApolloProvider>
);

export default App;
