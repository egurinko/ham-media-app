import { InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

const getCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          hospitalConnection: relayStylePagination(),
          publicHospitalConnection: relayStylePagination([
            'searchText',
            'reservable',
            'nightServiceOption',
            'insuranceEnabled',
            'jsavaOption',
            'nichijuOption',
          ]),
          productConnection: relayStylePagination(),
          stockRequestConnection: relayStylePagination(),
        },
      },
    },
  });

export { getCache };
