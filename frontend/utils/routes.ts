import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import type { NextRouter } from 'next/router';

export const ADMIN_LOGIN_PATH = '/admin/login';
export const ADMIN_INTERNAL_USERS_PATH = '/admin/internal_users';
export const ADMIN_INTERNAL_USERS_NEW_PATH = '/admin/internal_users/new';
export const ADMIN_INTERNAL_USERS_EDIT_PATH = (id: bigint) =>
  `/admin/internal_users/${id}/edit`;
export const ADMIN_HOSPIALS_PATH = '/admin/hospitals';
export const ADMIN_HOSPIALS_NEW_PATH = '/admin/hospitals/new';
export const ADMIN_HOSPIALS_EDIT_PATH = (id: bigint) =>
  `/admin/hospitals/${id}/edit`;
export const ADMIN_MAKERS_PATH = '/admin/makers';
export const ADMIN_MAKERS_NEW_PATH = '/admin/makers/new';
export const ADMIN_MAKERS_EDIT_PATH = (id: number) =>
  `/admin/makers/${id}/edit`;
export const ADMIN_PRODUCTS_PATH = '/admin/products';
export const ADMIN_PRODUCTS_NEW_PATH = '/admin/products/new';
export const ADMIN_PRODUCTS_DETAIL_PATH = (id: number) =>
  `/admin/products/${id}`;
export const ADMIN_PRODUCTS_EDIT_PATH = (id: number) =>
  `/admin/products/${id}/edit`;
export const ADMIN_STOCK_REQUESTS_PATH = '/admin/stock_requests';
export const ADMIN_STOCK_REQUESTS_NEW_PATH = '/admin/stock_requests/new';
export const ADMIN_STOCK_REQUESTS_EDIT_PATH = (id: number) =>
  `/admin/stock_requests/${id}/edit`;
export const ADMIN_PRODUCT_TAG_GROUPS_PATH = '/admin/product_tag_groups';
export const ADMIN_PRODUCT_TAG_GROUPS_NEW_PATH =
  '/admin/product_tag_groups/new';
export const ADMIN_PRODUCT_TAG_GROUPS_EDIT_PATH = (id: number) =>
  `/admin/product_tag_groups/${id}/edit`;

export const HOSPITALS_PATH = '/hospitals';
export const HOSPITALS_RESULT_PATH = '/hospitals/result';
export const HOSPITALS_DETAIL_PATH = (id: bigint) => `/hospitals/${id}`;

export const NOTFOUND_PATH = '/404';

const pushRouter = (router: NextRouter | AppRouterInstance, path: string) =>
  router.push(path);

export const goAdminLogin = (router: NextRouter | AppRouterInstance) =>
  pushRouter(router, ADMIN_LOGIN_PATH);

export const goAdminInternalUsers = (router: NextRouter | AppRouterInstance) =>
  pushRouter(router, ADMIN_INTERNAL_USERS_PATH);
export const goAdminInternalUserNew = (
  router: NextRouter | AppRouterInstance
) => pushRouter(router, ADMIN_INTERNAL_USERS_NEW_PATH);
export const goAdminInternalUserEdit = (
  router: NextRouter | AppRouterInstance,
  { id }: { id: bigint }
) => pushRouter(router, ADMIN_INTERNAL_USERS_EDIT_PATH(id));

export const goAdminHospitals = (router: NextRouter | AppRouterInstance) =>
  pushRouter(router, ADMIN_HOSPIALS_PATH);
export const goAdminHospitalsNew = (router: NextRouter | AppRouterInstance) =>
  pushRouter(router, ADMIN_HOSPIALS_NEW_PATH);
export const goAdminHospitalsEdit = (
  router: NextRouter | AppRouterInstance,
  { id }: { id: bigint }
) => pushRouter(router, ADMIN_HOSPIALS_EDIT_PATH(id));

export const goAdminMakers = (router: NextRouter | AppRouterInstance) =>
  pushRouter(router, ADMIN_MAKERS_PATH);
export const goAdminMakersNew = (router: NextRouter | AppRouterInstance) =>
  pushRouter(router, ADMIN_MAKERS_NEW_PATH);
export const goAdminMakersEdit = (
  router: NextRouter | AppRouterInstance,
  { id }: { id: number }
) => pushRouter(router, ADMIN_MAKERS_EDIT_PATH(id));

export const goAdminProducts = (router: NextRouter | AppRouterInstance) =>
  pushRouter(router, ADMIN_PRODUCTS_PATH);
export const goAdminProductsNew = (router: NextRouter | AppRouterInstance) =>
  pushRouter(router, ADMIN_PRODUCTS_NEW_PATH);
export const goAdminProductsDetail = (
  router: NextRouter | AppRouterInstance,
  { id }: { id: number }
) => pushRouter(router, ADMIN_PRODUCTS_DETAIL_PATH(id));
export const goAdminProductsEdit = (
  router: NextRouter | AppRouterInstance,
  { id }: { id: number }
) => pushRouter(router, ADMIN_PRODUCTS_EDIT_PATH(id));

export const goAdminStockRequests = (router: NextRouter | AppRouterInstance) =>
  pushRouter(router, ADMIN_STOCK_REQUESTS_PATH);
export const goAdminStockRequestsNew = (
  router: NextRouter | AppRouterInstance
) => pushRouter(router, ADMIN_STOCK_REQUESTS_NEW_PATH);
export const goAdminStockRequestsEdit = (
  router: NextRouter | AppRouterInstance,
  { id }: { id: number }
) => pushRouter(router, ADMIN_STOCK_REQUESTS_EDIT_PATH(id));

export const goAdminProductTagGroups = (
  router: NextRouter | AppRouterInstance
) => pushRouter(router, ADMIN_PRODUCT_TAG_GROUPS_PATH);
export const goAdminProductTagGroupsNew = (
  router: NextRouter | AppRouterInstance
) => pushRouter(router, ADMIN_PRODUCT_TAG_GROUPS_NEW_PATH);
export const goAdminProductTagGroupsEdit = (
  router: NextRouter | AppRouterInstance,
  { id }: { id: number }
) => pushRouter(router, ADMIN_PRODUCT_TAG_GROUPS_EDIT_PATH(id));

export const goHospitals = (router: NextRouter | AppRouterInstance) =>
  pushRouter(router, HOSPITALS_PATH);
export const goHospitalsResult = (router: NextRouter | AppRouterInstance) =>
  pushRouter(router, HOSPITALS_RESULT_PATH);
export const goHospitalDetail = (
  router: NextRouter | AppRouterInstance,
  { id }: { id: bigint }
) => pushRouter(router, HOSPITALS_DETAIL_PATH(id));
