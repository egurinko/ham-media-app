import { InMemoryCache, makeVar } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import type { CreateStockRequestRequestProductsInputType } from '@/api/internal_api/types';

const productCartItemsVar = makeVar<
  CreateStockRequestRequestProductsInputType[]
>([]);

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
          productCartItems: {
            read() {
              return productCartItemsVar();
            },
          },
        },
      },
    },
  });

export { getCache, productCartItemsVar };
