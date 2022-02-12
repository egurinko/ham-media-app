import { ApolloClient } from '@apollo/client';
import { getLink } from './apollo/link';
import { getCache } from './apollo/cache';

const apiClient = new ApolloClient({
  link: getLink(),
  cache: getCache(),
});

export { apiClient };
