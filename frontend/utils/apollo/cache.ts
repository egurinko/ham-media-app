import { InMemoryCache, makeVar } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import type {
  CreateStockRequestRequestProductsInputType,
  Session,
  RoleFieldsFragment,
} from '@/api/internal_api/types';
import type { HospitalSearch, ProductSearch } from '@/api/local_api/types';

const productCartItemsVar = makeVar<
  CreateStockRequestRequestProductsInputType[]
>([]);

const hospitalSearchVar = makeVar<HospitalSearch>({
  currentLocation: null,
  searchText: null,
  reservable: false,
  nightServiceOption: false,
  insuranceEnabled: false,
  jsavaOption: false,
  nichijuOption: false,
  recommended: false,
});

const productSearchVar = makeVar<ProductSearch>({
  name: '',
  makerId: undefined,
  productTagId: undefined,
  internalUserId: undefined,
  allocatedInternalUserId: undefined,
  hasStock: true,
});

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
          readIsAdmin: {
            read(_prev, { readField }) {
              const session = readField<Session>('session');
              const currentInternalUserRef = session?.internalUser;
              const currentInternalUserRoleRef = readField<RoleFieldsFragment>(
                'role',
                currentInternalUserRef
              );
              const currentInternalUserRoleName = readField<
                RoleFieldsFragment['name']
              >('name', currentInternalUserRoleRef);
              return { isAdmin: currentInternalUserRoleName === 'admin' };
            },
          },
          hospitalSearch: {
            read() {
              return hospitalSearchVar();
            },
          },
          productSearch: {
            read() {
              return productSearchVar();
            },
          },
        },
      },
    },
  });

export { getCache, productCartItemsVar, hospitalSearchVar, productSearchVar };
