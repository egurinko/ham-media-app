import { ApolloClient } from '@apollo/client';
import { getCache } from './apollo/cache';
import { getLink } from './apollo/link';

const apiClient = new ApolloClient({
  link: getLink(),
  cache: getCache(),
});

export { apiClient };
