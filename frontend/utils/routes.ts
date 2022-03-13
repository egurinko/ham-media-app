import type { NextRouter } from 'next/router';

export const ADMIN_LOGIN_PATH = '/admin/login';
export const ADMIN_INTERNAL_USERS_PATH = '/admin/internal_users';
export const ADMIN_INTERNAL_USERS_NEW_PATH = '/admin/internal_users/new';
export const ADMIN_INTERNAL_USERS_EDIT_PATH = (id: BigInt) =>
  `/admin/internal_users/${id}/edit`;
export const ADMIN_HOSPIALS_PATH = '/admin/hospitals';
export const ADMIN_HOSPIALS_NEW_PATH = '/admin/hospitals/new';
export const ADMIN_HOSPIALS_EDIT_PATH = (id: BigInt) =>
  `/admin/hospitals/${id}/edit`;
export const ADMIN_MAKERS_PATH = '/admin/makers';
export const ADMIN_MAKERS_NEW_PATH = '/admin/makers/new';
export const ADMIN_MAKERS_EDIT_PATH = (id: number) =>
  `/admin/makers/${id}/edit`;
export const ADMIN_PRODUCTS_PATH = '/admin/products';
export const ADMIN_PRODUCTS_NEW_PATH = '/admin/products/new';
export const ADMIN_PRODUCTS_EDIT_DETAIL = (id: number) =>
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
export const HOSPITALS_DETAIL_PATH = (id: BigInt) => `/hospitals/${id}`;

const pushRouter = (router: NextRouter, path: string) => router.push(path);

export const goAdminLogin = (router: NextRouter) =>
  pushRouter(router, ADMIN_LOGIN_PATH);

export const goAdminInternalUsers = (router: NextRouter) =>
  pushRouter(router, ADMIN_INTERNAL_USERS_PATH);
export const goAdminInternalUserNew = (router: NextRouter) =>
  pushRouter(router, ADMIN_INTERNAL_USERS_NEW_PATH);
export const goAdminInternalUserEdit = (
  router: NextRouter,
  { id }: { id: BigInt }
) => pushRouter(router, ADMIN_INTERNAL_USERS_EDIT_PATH(id));

export const goAdminHospitals = (router: NextRouter) =>
  pushRouter(router, ADMIN_HOSPIALS_PATH);
export const goAdminHospitalsNew = (router: NextRouter) =>
  pushRouter(router, ADMIN_HOSPIALS_NEW_PATH);
export const goAdminHospitalsEdit = (
  router: NextRouter,
  { id }: { id: BigInt }
) => pushRouter(router, ADMIN_HOSPIALS_EDIT_PATH(id));

export const goAdminMakers = (router: NextRouter) =>
  pushRouter(router, ADMIN_MAKERS_PATH);
export const goAdminMakersNew = (router: NextRouter) =>
  pushRouter(router, ADMIN_MAKERS_NEW_PATH);
export const goAdminMakersEdit = (router: NextRouter, { id }: { id: number }) =>
  pushRouter(router, ADMIN_MAKERS_EDIT_PATH(id));

export const goAdminProducts = (router: NextRouter) =>
  pushRouter(router, ADMIN_PRODUCTS_PATH);
export const goAdminProductsNew = (router: NextRouter) =>
  pushRouter(router, ADMIN_PRODUCTS_NEW_PATH);
export const goAdminProductsDetail = (
  router: NextRouter,
  { id }: { id: number }
) => pushRouter(router, ADMIN_PRODUCTS_EDIT_DETAIL(id));
export const goAdminProductsEdit = (
  router: NextRouter,
  { id }: { id: number }
) => pushRouter(router, ADMIN_PRODUCTS_EDIT_PATH(id));

export const goAdminStockRequests = (router: NextRouter) =>
  pushRouter(router, ADMIN_STOCK_REQUESTS_PATH);
export const goAdminStockRequestsNew = (router: NextRouter) =>
  pushRouter(router, ADMIN_STOCK_REQUESTS_NEW_PATH);
export const goAdminStockRequestsEdit = (
  router: NextRouter,
  { id }: { id: number }
) => pushRouter(router, ADMIN_STOCK_REQUESTS_EDIT_PATH(id));

export const goAdminProductTagGroups = (router: NextRouter) =>
  pushRouter(router, ADMIN_PRODUCT_TAG_GROUPS_PATH);
export const goAdminProductTagGroupsNew = (router: NextRouter) =>
  pushRouter(router, ADMIN_PRODUCT_TAG_GROUPS_NEW_PATH);
export const goAdminProductTagGroupsEdit = (
  router: NextRouter,
  { id }: { id: number }
) => pushRouter(router, ADMIN_PRODUCT_TAG_GROUPS_EDIT_PATH(id));

export const goHospitals = (router: NextRouter) =>
  pushRouter(router, HOSPITALS_PATH);

export const goHospitalDetail = (router: NextRouter, { id }: { id: BigInt }) =>
  pushRouter(router, HOSPITALS_DETAIL_PATH(id));
